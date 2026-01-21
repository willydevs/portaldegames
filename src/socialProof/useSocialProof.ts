import { useEffect, useState, useRef, useCallback } from 'react';
import { socialProofConfig as config } from './config';
import { SocialProofEngine } from './engine';
import { NotificationData } from './types';

export const useSocialProof = () => {
    const [notification, setNotification] = useState<NotificationData | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Refs to manage timers without re-renders
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const isMounted = useRef(true);

    const scheduleNext = useCallback((delay: number) => {
        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(async () => {
            if (!isMounted.current) return;

            // Try to get a notification
            const notif = await SocialProofEngine.getNextNotification();

            if (notif) {
                setNotification(notif);
                setIsVisible(true);
                SocialProofEngine.markAsShown(notif);

                // Schedule auto-hide
                setTimeout(() => {
                    if (isMounted.current) closeNotification();
                }, config.socialProof.timing.durationVisibleMs);

            } else {
                // No notification found (or allowed), retry later
                // Use "betweenNotifications" delay for retry loop
                const min = config.socialProof.timing.betweenNotifications.minMs;
                const max = config.socialProof.timing.betweenNotifications.maxMs;
                const nextTry = Math.floor(Math.random() * (max - min + 1)) + min;
                scheduleNext(nextTry);
            }
        }, delay);
    }, []);

    const closeNotification = useCallback(() => {
        setIsVisible(false);

        // Tracking
        if (config.socialProof.tracking.enabled) {
            // console.log("Close event");
        }

        // Schedule next one
        const min = config.socialProof.timing.betweenNotifications.minMs;
        const max = config.socialProof.timing.betweenNotifications.maxMs;
        const nextDelay = Math.floor(Math.random() * (max - min + 1)) + min;
        scheduleNext(nextDelay);
    }, [scheduleNext]);

    useEffect(() => {
        isMounted.current = true;

        // Initial Delay
        const min = config.socialProof.timing.initialDelay.minMs;
        const max = config.socialProof.timing.initialDelay.maxMs;
        const initialDelay = Math.floor(Math.random() * (max - min + 1)) + min;

        scheduleNext(initialDelay);

        return () => {
            isMounted.current = false;
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [scheduleNext]);

    return {
        notification,
        isVisible,
        closeNotification
    };
};
