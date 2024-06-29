export function withSearchParams(
    predicate: (params: URLSearchParams) => boolean,
    resolver: (params: URLSearchParams) => Response | Promise<Response>
) {
    return (args) => {
        const { request } = args;
        const url = new URL(request.url);

        if (!predicate(url.searchParams)) {
            return;
        }

        return resolver(args);
    };
}
