import { StorageState } from './types';
import { socialProofConfig as config } from './config';

const { storage: storageConfig } = config.socialProof;

const DEFAULT_STATE: StorageState = {
    sessionId: '',
    notificationsDisabled: false,
    lastShownAt: 0,
    cooldownUntil: 0,
    refreshPenaltyLevel: 0,
    shownRules: {}
};

// Generate a random session ID
const generateSessionId = () => {
    return 'sess_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const SocialProofStorage = {
    load: (): StorageState => {
        if (!storageConfig.enabled) return { ...DEFAULT_STATE, sessionId: generateSessionId() };

        try {
            // 1. Load Session ID (SessionStorage)
            let sessionId = sessionStorage.getItem(storageConfig.sessionKey);
            if (!sessionId && storageConfig.useSessionId) {
                sessionId = generateSessionId();
                sessionStorage.setItem(storageConfig.sessionKey, sessionId);
            }

            // 2. Load Persistent State (LocalStorage)
            const raw = localStorage.getItem(storageConfig.storageKey);
            if (!raw) {
                return { ...DEFAULT_STATE, sessionId: sessionId || generateSessionId() };
            }

            const data = JSON.parse(raw);
            const state = { ...DEFAULT_STATE, ...data, sessionId: sessionId || data.sessionId || generateSessionId() };

            // 3. check TTL
            const now = Date.now();
            const ttlMs = storageConfig.ttlHours * 60 * 60 * 1000;
            // We use the timestamp of the last *save* (implicit or explicit) or just lastShownAt.
            // If lastShownAt is too old, we might want to reset the *history* but keep the session?
            // For simplicity, if the state is older than TTL (based on lastShownAt), we reset history.
            if (state.lastShownAt > 0 && (now - state.lastShownAt) > ttlMs) {
                // Reset history but keep session info maybe? Or full reset.
                // Requirement says "reset history".
                return { ...DEFAULT_STATE, sessionId: state.sessionId };
            }

            return state;
        } catch (e) {
            console.error('SocialProofStorage load error:', e);
            return { ...DEFAULT_STATE, sessionId: generateSessionId() };
        }
    },

    save: (state: StorageState) => {
        if (!storageConfig.enabled) return;
        try {
            const toSave = { ...state };
            // Don't save sessionId in local storage if we strictly use sessionStorage for it, 
            // but it doesn't hurt to keep it consistent.

            // Filter out what shouldn't be persisted if configured
            if (!storageConfig.persistCooldownUntil) toSave.cooldownUntil = 0;
            if (!storageConfig.persistLastShownAt) toSave.lastShownAt = 0;
            if (!storageConfig.persistShownRules) toSave.shownRules = {};

            localStorage.setItem(storageConfig.storageKey, JSON.stringify(toSave));
        } catch (e) {
            console.error('SocialProofStorage save error:', e);
        }
    },

    reset: () => {
        localStorage.removeItem(storageConfig.storageKey);
        sessionStorage.removeItem(storageConfig.sessionKey);
    }
};
