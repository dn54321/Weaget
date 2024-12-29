import { afterEach, describe, expect, it } from "vitest";
import { GET } from "./route";
import { createMockRequest } from "@utils/next-mock-request-builder";
import { mockGoogleLocationAutoCompleteHandle } from "@features/google-geocode/__mocks__/location-auto-complete.handler";
import { server } from "@project/vitest-setup";
import { withHandleError } from "@utils/msw-http-mocker";

describe("Route: api/location/auto-complete", async () => {
    afterEach(() => {
        server.resetHandlers();
    });

    it("should return 200 OK with correct payload and query params.", async () => {
        const request = createMockRequest({
            params: { input: "mockInput", sessiontoken: "mockToken" },
            path: "/api/location/auto-complete",
        });

        const response = await GET(request);
        expect(response?.status).toBe(200);
    });

    it("should return 400 with invalid query params.", async () => {
        const request = createMockRequest({ path: "/api/location/auto-complete" });
        const response = await GET(request);
        expect(response?.status).toBe(400);
    });

    it("should return 500 when unexpected error occurs.", async () => {
        withHandleError(mockGoogleLocationAutoCompleteHandle);
        const request = createMockRequest({
            params: { input: "mockInput", sessiontoken: "mockToken" },
            path: "/api/location/auto-complete",
        });

        const response = await GET(request);
        expect(response?.status).toBe(500);
    });
});
