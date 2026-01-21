export type SocialProofConfig = {
    socialProof: {
        enabled: boolean;
        version: string;
        moduleName: string;
        environment: "production" | "development" | "test";

        ui: {
            position: "bottom_left" | "bottom_right" | "top_left" | "top_right";
            stackDirection: "up" | "down";
            maxVisible: number;
            zIndex: number;
            theme: "auto" | "light" | "dark";
            borderRadius: number;
            shadow: boolean;
            blurBackground: boolean;
            showIcon: boolean;
            showCloseButton: boolean;
            showProgressBar: boolean;
            animation: {
                enabled: boolean;
                type: "fade_slide" | "fade" | "slide";
                durationMs: number;
            };
            sound: {
                enabled: boolean;
                volume: number;
                src: string;
            };
            layout: {
                maxWidthPx: number;
                paddingPx: number;
                gapPx: number;
                mobileMaxWidthPercent: number;
            };
        };

        timing: {
            initialDelay: { minMs: number; maxMs: number };
            betweenNotifications: { minMs: number; maxMs: number };
            durationVisibleMs: number;
            refreshPenalty: { enabled: boolean; incrementMs: number; maxMs: number };
            cooldown: { enabled: boolean; ruleCooldownMinutes: number; globalCooldownSeconds: number };
        };

        storage: {
            enabled: boolean;
            storageKey: string;
            ttlHours: number;
            persistShownRules: boolean;
            persistLastShownAt: boolean;
            persistCooldownUntil: boolean;
            useSessionId: boolean;
            sessionKey: string;
        };

        privacy: {
            enabled: boolean;
            maskBuyerName: boolean;
            maskStrategy: "firstNameOnly" | "fullMask";
            allowCity: boolean;
            maskEmail: boolean;
            maskPhone: boolean;
        };

        pages: {
            enabled: boolean;
            onlyShowOn: string[];
            exclude: string[];
        };

        selection: {
            mode: "weighted_priority" | "random" | "sequential";
            topCandidates: number;
            avoidRepeats: boolean;
            resetShownRulesWhenAllUsed: boolean;
            maxSameTypeInARow: number;
        };

        data: {
            mode: "api" | "simulation" | "static";
            endpoints: { counts: string; lastPurchase: string };
            cache: { enabled: boolean; countsCacheSeconds: number; lastPurchaseCacheSeconds: number };
            timeoutMs: number;
            retry: { enabled: boolean; maxRetries: number; retryDelayMs: number };
        };

        fallback: {
            enabled: boolean;
            allowFakeCounts: boolean;
            allowFakeLastPurchase: boolean;
            fallbackCounts: Record<string, { min: number; max: number }>;
            fallbackBuyerNames: string[];
            fallbackCities: string[];
        };

        products: Array<{
            productId: string;
            productName: string;
            enabled: boolean;
            ctaUrl: string;
            tags: string[];
        }>;

        rules: SocialProofRule[];

        tracking: {
            enabled: boolean;
            provider: "custom" | "ga" | "gtm";
            events: {
                impression: string;
                click: string;
                close: string;
                error: string;
            };
        };
    };
};

export type SocialProofRule = {
    id: string;
    enabled: boolean;
    type: "peopleBuyingNow" | "purchasesLast30Minutes" | "purchasesLastHour" | "lastPurchase" | "purchasesThisWeek" | "purchasesToday";
    priority: number;
    minValue: number;
    productId: string;
    titleTemplate: string;
    icon: string;
    variables?: Record<string, string>;
    constraints: {
        maxTimesPerSession: number;
        maxTimesPerDay: number;
        minSecondsBetweenSameRule: number;
    };
};

export type NotificationData = {
    id: string; // Unique ID for this instance
    ruleId: string;
    type: SocialProofRule['type'];
    content: {
        title: string;
        productName: string;
        buyerName?: string;
        city?: string;
        timeAgo?: string;
        count?: number;
        imageUrl?: string;
        icon?: string;
    };
    ctaUrl: string;
    timestamp: number;
};

export type StorageState = {
    sessionId: string;
    notificationsDisabled: boolean; // Persisted preference
    lastShownAt: number;
    cooldownUntil: number;
    refreshPenaltyLevel: number; // How many times user refreshed recently
    shownRules: Record<string, { // ruleId -> history
        countSession: number;
        countDay: number;
        lastShown: number;
    }>;
};
