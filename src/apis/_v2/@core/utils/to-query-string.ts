
// Converts an object to query string format
export function toQueryString(obj: object): string {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(obj)) {
        if (value === undefined || value === null) {
            continue;
        }
        else if (Array.isArray(value)) {
            value.forEach(item => {
                if (item !== undefined && item !== null) {
                    params.append(key, String(item));
                }
            });
        }
        if (value !== undefined && value !== null) {
            params.append(key, String(value));
        }
    }

    return params.toString();
}