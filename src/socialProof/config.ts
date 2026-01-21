import { SocialProofConfig } from './types';

export const socialProofConfig: SocialProofConfig = {
    socialProof: {
        enabled: true,
        version: "2.0.0",
        moduleName: "Social Proof Notifications",
        environment: "production",

        ui: {
            position: "bottom_right", // Changed to bottom_right
            stackDirection: "up",
            maxVisible: 1,
            zIndex: 9999,

            theme: "auto",
            borderRadius: 14,
            shadow: true,
            blurBackground: false,

            showIcon: true,
            showCloseButton: true,
            showProgressBar: true,

            animation: {
                enabled: true,
                type: "fade_slide",
                durationMs: 250
            },

            sound: {
                enabled: true,
                volume: 0.5,
                // Using synthetic sound (AudioContext) by default if src is empty
                src: ""
            },

            layout: {
                maxWidthPx: 360,
                paddingPx: 12,
                gapPx: 8,
                mobileMaxWidthPercent: 92
            }
        },

        // ... (timing unchanged)
        timing: {
            initialDelay: {
                minMs: 4000,
                maxMs: 7000
            },

            betweenNotifications: {
                minMs: 10000,
                maxMs: 18000
            },

            durationVisibleMs: 6500,

            refreshPenalty: {
                enabled: true,
                incrementMs: 10000,
                maxMs: 30000
            },

            cooldown: {
                enabled: true,
                ruleCooldownMinutes: 15,
                globalCooldownSeconds: 8
            }
        },

        storage: {
            enabled: true,
            storageKey: "socialProofState:v2",
            ttlHours: 6,

            persistShownRules: true,
            persistLastShownAt: true,
            persistCooldownUntil: true,

            useSessionId: true,
            sessionKey: "socialProofSessionId:v2"
        },

        privacy: {
            enabled: true,
            maskBuyerName: true,
            maskStrategy: "firstNameOnly",
            allowCity: true,
            maskEmail: true,
            maskPhone: true
        },

        pages: {
            enabled: true,
            onlyShowOn: [
                "/",
                "/produto",
                "/checkout",
                "/oferta",
                "/planos"
            ],
            exclude: [
                "/obrigado",
                "/login",
                "/minha-conta",
                "/admin"
            ]
        },

        selection: {
            mode: "weighted_priority",
            topCandidates: 3,
            avoidRepeats: true,
            resetShownRulesWhenAllUsed: true,
            maxSameTypeInARow: 2
        },

        data: {
            mode: "simulation",
            endpoints: {
                counts: "/api/social-proof/counts",
                lastPurchase: "/api/social-proof/last-purchase"
            },

            cache: {
                enabled: true,
                countsCacheSeconds: 20,
                lastPurchaseCacheSeconds: 30
            },

            timeoutMs: 2500,
            retry: {
                enabled: true,
                maxRetries: 1,
                retryDelayMs: 500
            }
        },

        fallback: {
            enabled: true,
            allowFakeCounts: true,
            allowFakeLastPurchase: true,

            fallbackCounts: {
                purchasesToday: { min: 2, max: 9 },
                purchasesLastHour: { min: 1, max: 4 },
                purchasesLast30Minutes: { min: 1, max: 3 },
                purchasesThisWeek: { min: 5, max: 22 },
                peopleBuyingNow: { min: 1, max: 6 }
            },

            fallbackBuyerNames: [
                "Lucas",
                "Mariana",
                "João",
                "Camila",
                "Rafael",
                "Bruna",
                "Pedro",
                "Ana"
            ],

            fallbackCities: [
                "São Paulo",
                "Rio de Janeiro",
                "Belo Horizonte",
                "Salvador",
                "Fortaleza",
                "Recife",
                "Curitiba",
                "Brasília"
            ]
        },

        products: [
            {
                productId: "pack_standard",
                productName: "Pack Standard",
                enabled: true,
                ctaUrl: "/jogos",
                tags: ["best_seller", "games"]
            },
            {
                productId: "pack_complete",
                productName: "Pack Completo",
                enabled: true,
                ctaUrl: "/jogos",
                tags: ["premium", "games"]
            },
            {
                productId: "updates_future",
                productName: "ATUALIZAÇÕES FUTURAS",
                enabled: false,
                ctaUrl: "/checkout",
                tags: ["upsell", "lifetime", "digital"]
            }
        ],

        rules: [
            // --- PACK STANDARD ---
            {
                id: "rule_people_buying_now_std",
                enabled: false,
                type: "peopleBuyingNow",
                priority: 70,
                minValue: 7,

                productId: "pack_standard",
                titleTemplate: "{{count}} pessoas estão vendo o {{productName}} agora.",
                icon: "shopping_cart",

                constraints: {
                    maxTimesPerSession: 1,
                    maxTimesPerDay: 2,
                    minSecondsBetweenSameRule: 900
                }
            },

            {
                id: "rule_purchases_last_30m_std",
                enabled: true,
                type: "purchasesLast30Minutes",
                priority: 80,
                minValue: 3,

                productId: "pack_standard",
                titleTemplate: "{{count}} pessoas compraram o {{productName}} recentemente.",
                icon: "clock",

                constraints: {
                    maxTimesPerSession: 2,
                    maxTimesPerDay: 4,
                    minSecondsBetweenSameRule: 900
                }
            },

            {
                id: "rule_purchases_last_1h_std",
                enabled: true,
                type: "purchasesLastHour",
                priority: 75,
                minValue: 2,

                productId: "pack_standard",
                titleTemplate: "{{count}} pessoas garantiram o {{productName}} na última hora.",
                icon: "bolt",

                constraints: {
                    maxTimesPerSession: 2,
                    maxTimesPerDay: 4,
                    minSecondsBetweenSameRule: 900
                }
            },

            {
                id: "rule_last_purchase_std",
                enabled: true,
                type: "lastPurchase",
                priority: 100,
                minValue: 1,

                productId: "pack_standard",
                titleTemplate: "{{buyerName}} {{citySuffix}} acabou de comprar o {{productName}}.",
                icon: "user_check",

                variables: {
                    citySuffixFormat: "({{city}})"
                },

                constraints: {
                    maxTimesPerSession: 3,
                    maxTimesPerDay: 8,
                    minSecondsBetweenSameRule: 300
                }
            },

            // --- PACK COMPLETO ---
            {
                id: "rule_purchases_today_cmp",
                enabled: true,
                type: "purchasesToday",
                priority: 85,
                minValue: 2,

                productId: "pack_complete",
                titleTemplate: "{{count}} pessoas turbinaram seus jogos com o {{productName}} hoje.",
                icon: "sun",

                constraints: {
                    maxTimesPerSession: 2,
                    maxTimesPerDay: 4,
                    minSecondsBetweenSameRule: 900
                }
            },

            {
                id: "rule_last_purchase_cmp",
                enabled: true,
                type: "lastPurchase",
                priority: 95,
                minValue: 1,

                productId: "pack_complete",
                titleTemplate: "{{buyerName}} {{citySuffix}} acabou de adquirir o incrível {{productName}}.",
                icon: "user_check",

                variables: {
                    citySuffixFormat: "({{city}})"
                },

                constraints: {
                    maxTimesPerSession: 3,
                    maxTimesPerDay: 8,
                    minSecondsBetweenSameRule: 300
                }
            },

            {
                id: "rule_purchases_this_week_cmp",
                enabled: true,
                type: "purchasesThisWeek",
                priority: 60,
                minValue: 5,

                productId: "pack_complete",
                titleTemplate: "Mais de {{count}} gamers escolheram o {{productName}} essa semana.",
                icon: "calendar",

                constraints: {
                    maxTimesPerSession: 1,
                    maxTimesPerDay: 2,
                    minSecondsBetweenSameRule: 1800
                }
            },

            // Other fallback or mixed rules
            {
                id: "rule_purchases_today_std",
                enabled: true,
                type: "purchasesToday",
                priority: 60,
                minValue: 5,

                productId: "pack_standard",
                titleTemplate: "{{count}} pessoas compraram {{productName}} hoje.",
                icon: "sun",

                constraints: {
                    maxTimesPerSession: 2,
                    maxTimesPerDay: 4,
                    minSecondsBetweenSameRule: 900
                }
            }
        ],

        tracking: {
            enabled: true,
            provider: "custom",
            events: {
                impression: "social_proof_impression",
                click: "social_proof_click",
                close: "social_proof_close",
                error: "social_proof_error"
            }
        }
    }
};
