import type { NextRequest } from "next/server";

export interface MockRequestObject {
    path: string;
    method?: string;
    body?: object;
    headers?: object;
    params?: Record<string, string>;
}

export function createMockRequest(request: MockRequestObject) {
    const headers = new Map(Object.entries(request.headers ?? {}));
    return {
        body: JSON.stringify(request.body),
        headers: headers,
        method: request.method ?? "GET",
        url: `https://${request.path}?${new URLSearchParams(request.params ?? {})}`,
    } as unknown as NextRequest;
}
