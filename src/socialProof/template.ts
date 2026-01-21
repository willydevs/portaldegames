/**
 * Simple template engine to replace {{variable}} placeholders.
 */
export const compileTemplate = (template: string, variables: Record<string, string | number | undefined>): string => {
    return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
        const value = variables[key];
        return value !== undefined ? String(value) : '';
    });
};

/**
 * Common formatting helpers
 */
export const formatters = {
    maskName: (name: string, strategy: 'firstNameOnly' | 'fullMask'): string => {
        if (!name) return 'Cliente';
        if (strategy === 'firstNameOnly') {
            return name.split(' ')[0];
        }
        // fullMask example: "J*** S***"
        return name.replace(/./g, '*');
    },

    // Example helper to format city
    formatCity: (city: string): string => {
        return city || '';
    }
};
