import { NextRequest } from "next/server";

export interface MockRequestObject {
    path: String;
    method?: String;
    body?: any;
    headers?: any;
    params?: Record<string, string>;
}

export function createMockRequest(request: MockRequestObject) {
    const headers = new Map(Object.entries(request.headers ?? {}));
    return {
        url: `https://${request.path}?${new URLSearchParams(request.params ?? {})}`,
        method: request.method ?? 'GET',
        headers: headers,
        body: JSON.stringify(request.body)
    } as unknown as NextRequest;
}