

export function flattenObject(obj: Record<string, unknown>, prefix?: string) {
    return Object.keys(obj).reduce((acc, key) => {
        const prefixedKey = prefix ? `${prefix}.${key}` : key;
        const value = obj[key];

        if (typeof value === "object" && value !== null && !Array.isArray(value)) {
            Object.assign(acc, flattenObject(value as Record<string, unknown>, prefixedKey));
        } else {
            (acc as Record<string, unknown>)[prefixedKey] = value;
        }

        return acc;
    }, {});
}

export function unflattenObject(flatMap: Record<string, unknown>): Record<string, unknown> {
    const result: Record<string, unknown> = {};

    for (const key in flatMap) {
        const keys = key.split(".");
        let current = result;

        for (let i = 0; i < keys.length; i++) {
            const part = keys[i];
            if (i === keys.length - 1) {
                current[part] = flatMap[key];
            } 
            else {
                if (!current[part]) {
                    current[part] = {};
                }
                current = current[part] as Record<string, unknown>;
            }
        }

    }

    return result;
}
