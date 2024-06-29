import { describe, expect, it } from "vitest";
import { MockRequestObject, createMockRequest } from "@utils/next-mock-request-builder";

describe("Utils - next-mock-request-builder", () => {
    describe("createMockRequest", () => {
        it.each([
            [{ path: "/test" }, { url: "https:///test?" }],
            [{ method: "GET", path: "/test", params: { a: "b" } }, { url: "https:///test?a=b", method: "GET" }],
            [{ method: "POST", path: "/test", headers: { a: "b" } }, { method: "POST", url: "https:///test?", headers: new Map(Object.entries({ a: "b" })) }],
        ])("request object %o should result in %o.", (
            requestObject: MockRequestObject,
            result: Record<string, object | string | number>,
        ) => {
            const request = createMockRequest(requestObject);
            expect(request).toMatchObject(result);
        });
    });
});
