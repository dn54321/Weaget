export function withSearchParams(
    predicate: (params: URLSearchParams) => boolean,
    resolver: (params: { request: Request }) => Promise<Response> | Response
) {
    return (args: { request: Request }) => {
        const { request } = args;
        const url = new URL(request.url);

        if (!predicate(url.searchParams)) {
            return;
        }

        return resolver(args);
    };
}
