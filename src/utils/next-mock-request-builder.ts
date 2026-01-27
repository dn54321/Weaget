import { NextRequest } from "next/server";

export interface MockRequestObject {
    body?: object
    headers?: object
    method?: string
    params?: Record<string, string>
    path: string
}

export function createMockRequest(request: MockRequestObject) {
    const headers = new Map(Object.entries(request.headers ?? {}));
    return {
        body: JSON.stringify(request.body),
        headers: headers,
        method: request.method ?? "GET",
        url: `https://${request.path}?${new URLSearchParams(request.params ?? {})}`
    } as unknown as NextRequest;
}
