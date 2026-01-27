import { createMockRequest, MockRequestObject } from "@utils/next-mock-request-builder";
import { describe, expect, it } from "vitest";

describe("Utils - next-mock-request-builder", () => {
    describe("createMockRequest", () => {
        it.each([
            [{ path: "/test" }, { url: "https:///test?" }],
            [{ method: "GET", params: { a: "b" }, path: "/test" }, { method: "GET", url: "https:///test?a=b" }],
            [{ headers: { a: "b" }, method: "POST", path: "/test" }, { headers: new Map(Object.entries({ a: "b" })), method: "POST", url: "https:///test?" }]
        ])("request object %o should result in %o.", (
            requestObject: MockRequestObject,
            result: Record<string, number | object | string>
        ) => {
            const request = createMockRequest(requestObject);
            expect(request).toMatchObject(result);
        });
    });
});
