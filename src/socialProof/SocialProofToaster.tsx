import React, { useEffect, useState } from 'react';
import { useSocialProof } from './useSocialProof';
import { socialProofConfig as config } from './config';
import { SocialProofStorage } from './storage';

// Simple Icons
const Icons: Record<string, React.ReactNode> = {
    check: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>,
    shopping_cart: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>,
    clock: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
    bolt: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>,
    user_check: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>,
    calendar: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
    sun: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
};

export const SocialProofToaster: React.FC = () => {
    const { notification, isVisible, closeNotification } = useSocialProof();
    const ui = config.socialProof.ui;

    // Handle Sound
    useEffect(() => {
        if (isVisible && notification && (ui as any).sound?.enabled) {
            // Synthetic "Pop" Sound to ensure it works without external files
            try {
                const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
                if (AudioContext) {
                    const ctx = new AudioContext();
                    const oscillator = ctx.createOscillator();
                    const gainNode = ctx.createGain();

                    oscillator.connect(gainNode);
                    gainNode.connect(ctx.destination);

                    // "Pop" effect
                    oscillator.type = 'sine';
                    oscillator.frequency.setValueAtTime(600, ctx.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.15);

                    const vol = (ui as any).sound.volume || 0.5;
                    gainNode.gain.setValueAtTime(vol, ctx.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

                    oscillator.start(ctx.currentTime);
                    oscillator.stop(ctx.currentTime + 0.15);
                }
            } catch (e) {
                console.warn("Audio play error", e);
            }
        }
    }, [isVisible, notification, ui]);

    const handleDisableAll = () => {
        // 1. Save preference
        const state = SocialProofStorage.load();
        state.notificationsDisabled = true;
        SocialProofStorage.save(state);

        // 2. Close current
        closeNotification();
    };

    // Render nothing if disabled or not visible
    if (!config.socialProof.enabled) return null;

    // We keep the component mounted but use CSS for visibility to allow animations?
    // Or conditionally render. For fade/slide, usually conditional render with transition classes.
    // Ideally, use a transition library, but we must avoid deps.
    // We can use simple CSS classes and a conditional render wrapper.

    if (!isVisible || !notification) return null;

    const positionClasses = {
        bottom_left: 'fixed bottom-4 left-4',
        bottom_right: 'fixed bottom-4 right-4',
        top_left: 'fixed top-4 left-4',
        top_right: 'fixed top-4 right-4',
    }[ui.position];

    const AnimationStyles = `
    @keyframes slideIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

    return (
        <>
            <style>{AnimationStyles}</style>
            <div
                className={`${positionClasses} flex items-center bg-green-600 text-white shadow-lg overflow-hidden`}
                style={{
                    zIndex: ui.zIndex,
                    borderRadius: ui.borderRadius,
                    boxShadow: ui.shadow ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' : 'none',
                    maxWidth: ui.layout.maxWidthPx,
                    animation: ui.animation.enabled ? `slideIn ${ui.animation.durationMs}ms ease-out` : 'none',
                    backdropFilter: ui.blurBackground ? 'blur(8px)' : 'none',
                    background: ui.blurBackground ? 'rgba(255, 255, 255, 0.8)' : undefined
                }}
            >
                <div className="relative flex w-full p-3">
                    {/* Icon */}
                    {ui.showIcon && (
                        <div className="flex-shrink-0 mr-3 mt-1 text-white">
                            {Icons[notification.content.icon || 'check'] || Icons.check}
                        </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 pr-6">
                        <p className="text-sm font-medium leading-tight">
                            {notification.content.title}
                        </p>
                        <div className="mt-1 flex items-center justify-between">
                            <span className="text-xs text-green-100">
                                Verificado agora mesmo
                            </span>
                            <button
                                onClick={handleDisableAll}
                                className="text-[10px] text-green-200 hover:text-white hover:underline transition-colors"
                                title="Não mostrar mais essas notificações"
                                style={{ marginLeft: '12px' }}
                            >
                                Não exibir mais
                            </button>
                        </div>
                    </div>

                    {/* Close Button */}
                    {ui.showCloseButton && (
                        <button
                            onClick={closeNotification}
                            className="absolute top-2 right-2 text-green-200 hover:text-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    )}

                    {/* Progress Bar */}
                    {ui.showProgressBar && (
                        <div
                            className="absolute bottom-0 left-0 h-1 bg-white/40"
                            style={{
                                width: '100%',
                                animation: `progress ${config.socialProof.timing.durationVisibleMs}ms linear forwards`
                            }}
                        />
                    )}

                    <style>{`
             @keyframes progress {
                from { width: 100%; }
                to { width: 0%; }
             }
          `}</style>
                </div>
            </div>
        </>
    );
};
