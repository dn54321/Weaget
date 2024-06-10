

export function extractQueryParams(url: string) {
    const { searchParams } = new URL(url);
    return Object.fromEntries(searchParams);
}