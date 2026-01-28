import { HttpResponse, http } from "msw";
import { afterEach, describe, expect, it } from "vitest";
import { server } from "@project/vitest-setup";
import { withSearchParams } from "@utils/msw-resolver";

describe("Utils - msw-resolver", async () => {
    afterEach(() => {
        server.resetHandlers();
    });
    it("should follow if query params predicate is satisified.", async () => {
        server.use(
            http.get("/test", withSearchParams(
                params => params.has("mockQuery"),
                () => HttpResponse.json({ test: "mockMessage" }),
            )),
        );

        const data = await fetch("/test?mockQuery=true").then(res => res.json());
        expect(data).toMatchObject({ test: "mockMessage" });
    });

    it("should ignore url that uses withSearchParams if no params are provided.", async () => {
        server.use(
            http.get("/api/test", withSearchParams(
                params => params.has("anotherMockQuery"),
                () => HttpResponse.json({ test: "anotherMockMessage" }),
            )),
            http.all("/api/*", () => HttpResponse.json({ test: "fallback message" })),
        );

        const response = await fetch("/api/test");
        const data = await response.json();
        expect(data).toMatchObject({ test: "fallback message" });

        const response2 = await fetch("/api/test?anotherMockQuery=true");
        const data2 = await response2.json();
        expect(data2).toMatchObject({ test: "anotherMockMessage" });
    });

    it("should fail if query params predicate is not satisified.", async () => {
        server.use(
            http.get("https://test.com", withSearchParams(
                params => params.has("mockQuery"),
                () => HttpResponse.json({ test: "mockMessage" }),
            )),
            http.get("https://test.com", () => HttpResponse.json({ test: "fallback message" })),
        );
        const response = await fetch("https://test.com?norun=true").then(res => res.json());
        expect(response).toMatchObject({ test: "fallback message" });
    });
});
