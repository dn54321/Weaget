import { HttpHandler, HttpResponse, RequestHandlerOptions } from "msw";
import { server } from "@project/vitest-setup";

export function withHandleError(
    handle: (response: HttpResponse, options?: RequestHandlerOptions) => HttpHandler,
    status: number = 500,
): void {
    const httpResponse = handle(HttpResponse.json({}, { status }));
    server.use(httpResponse);
}

export function withResponse(
    handle: (response: HttpResponse, options?: RequestHandlerOptions) => HttpHandler,
    payload: object = {},
    options?: { payload?: string; status?: number }
) {
    const httpResponse = handle(HttpResponse.json(payload, options));
    server.use(httpResponse);
}
