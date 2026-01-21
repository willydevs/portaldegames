import { socialProofConfig as config } from './config';
import { SocialProofStorage } from './storage';
import { compileTemplate, formatters } from './template';
import { NotificationData, SocialProofRule, StorageState } from './types';

// Helper to check if we are on an allowed page
const isPageAllowed = (): boolean => {
    const path = window.location.pathname;
    const { pages } = config.socialProof;

    if (!pages.enabled) return true;

    // Check exclusions first
    if (pages.exclude.some(p => path.startsWith(p))) return false;

    // Check inclusions
    if (pages.onlyShowOn.length > 0) {
        return pages.onlyShowOn.some(p => path === p || (p !== '/' && path.startsWith(p)));
    }

    return true;
};

// Mock data generator for fallback
const getFallbackData = (type: SocialProofRule['type']) => {
    const { fallback } = config.socialProof;
    if (!fallback.enabled) return null;

    if (type === 'lastPurchase') {
        const name = fallback.fallbackBuyerNames[Math.floor(Math.random() * fallback.fallbackBuyerNames.length)];
        const city = fallback.fallbackCities[Math.floor(Math.random() * fallback.fallbackCities.length)];
        return { buyerName: name, city };
    } else {
        // Counts
        const range = fallback.fallbackCounts[type];
        if (!range) return { count: 12 };
        return { count: Math.floor(Math.random() * (range.max - range.min + 1)) + range.min };
    }
};

const fetchData = async (endpoint: string): Promise<any> => {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), config.socialProof.data.timeoutMs);

        const response = await fetch(endpoint, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.warn(`Social Proof API error for ${endpoint}:`, error);
        return null;
    }
};

export const SocialProofEngine = {
    // Main function to get the next notification
    getNextNotification: async (): Promise<NotificationData | null> => {
        if (!config.socialProof.enabled) return null;
        if (!isPageAllowed()) return null;

        const state = SocialProofStorage.load();
        const now = Date.now();

        // 0. Check User Preference
        if (state.notificationsDisabled) return null;

        // 1. Global Cooldown Check
        // If we are within global cooldown, do nothing.
        // Note: This logic might be handled by the scheduler's "betweenNotifications" delay too,
        // but explicit cooldown storage is safer across reloads.
        if (state.cooldownUntil > now) return null;

        // 2. Filter Candidate Rules
        const candidates = config.socialProof.rules.filter(rule => {
            if (!rule.enabled) return false;

            const history = state.shownRules[rule.id] || { countSession: 0, countDay: 0, lastShown: 0 };
            const { constraints } = rule;

            if (history.countSession >= constraints.maxTimesPerSession) return false;
            if (history.countDay >= constraints.maxTimesPerDay) return false;
            if (now - history.lastShown < constraints.minSecondsBetweenSameRule * 1000) return false;

            return true;
        });

        if (candidates.length === 0) return null;

        // 3. Select One Rule
        // Strategy: Weighted Priority
        // Sort by priority desc, take top N, pick random weighted
        candidates.sort((a, b) => b.priority - a.priority);
        const topCandidates = candidates.slice(0, config.socialProof.selection.topCandidates);

        // Simple random selection from top candidates for now to feel "natural"
        const selectedRule = topCandidates[Math.floor(Math.random() * topCandidates.length)];

        // 4. Fetch Data for Rule
        let data: any = null;

        // Try API if enabled
        if (config.socialProof.data.mode === 'api') {
            if (selectedRule.type === 'lastPurchase') {
                data = await fetchData(config.socialProof.data.endpoints.lastPurchase);
            } else {
                // It's a count type
                const allCounts = await fetchData(config.socialProof.data.endpoints.counts);
                if (allCounts && allCounts[selectedRule.type]) {
                    data = { count: allCounts[selectedRule.type] };
                }
            }
        }

        // Fallback if no data
        if (!data && config.socialProof.fallback.enabled) {
            if (config.socialProof.fallback.allowFakeCounts || config.socialProof.fallback.allowFakeLastPurchase) {
                // In a real scenario we'd check specific flags per type, but let's assume if fallback enabled we use it
                data = getFallbackData(selectedRule.type);
            } else {
                // If we rely on API but it failed and fakes are disabled, skip this rule
                // Ideally we'd try another candidate, but for simplicity return null
                return null;
            }
        }

        if (!data) return null; // No data found at all

        // 5. Prepare Notification
        const product = config.socialProof.products.find(p => p.productId === selectedRule.productId);
        const productName = product ? product.productName : "Produto";

        // Apply privacy masking
        let buyerName = data.buyerName;
        if (buyerName && config.socialProof.privacy.maskBuyerName) {
            buyerName = formatters.maskName(buyerName, config.socialProof.privacy.maskStrategy);
        }

        const count = data.count || 0;
        if (selectedRule.minValue && count < selectedRule.minValue) return null; // Count too low

        // Variables for template
        const variables = {
            count,
            productName,
            buyerName,
            city: data.city,
            citySuffix: data.city ? `(${data.city})` : '',
            ...selectedRule.variables
        };

        const title = compileTemplate(selectedRule.titleTemplate, variables);

        const notification: NotificationData = {
            id: Math.random().toString(36).substr(2, 9),
            ruleId: selectedRule.id,
            type: selectedRule.type,
            content: {
                title,
                productName,
                buyerName,
                city: data.city,
                count,
                icon: selectedRule.icon
            },
            ctaUrl: product ? product.ctaUrl : '#',
            timestamp: now
        };

        return notification;
    },

    // Called when a notification is actually SHOWN to user
    markAsShown: (notification: NotificationData) => {
        const state = SocialProofStorage.load();
        const now = Date.now();
        const ruleId = notification.ruleId;

        const history = state.shownRules[ruleId] || { countSession: 0, countDay: 0, lastShown: 0 };

        state.shownRules[ruleId] = {
            countSession: history.countSession + 1,
            countDay: history.countDay + 1,
            lastShown: now
        };

        state.lastShownAt = now;

        // Calculate next global cooldown
        // We set a minimum "global cooldown" so we don't show another one 
        // immediately even if scheduler tries to.
        state.cooldownUntil = now + (config.socialProof.timing.cooldown.globalCooldownSeconds * 1000);

        SocialProofStorage.save(state);

        // Track event
        if (config.socialProof.tracking.enabled && config.socialProof.tracking.provider === 'custom') {
            console.log(`[Tracking] ${config.socialProof.tracking.events.impression}`, notification);
        }
    }
};
