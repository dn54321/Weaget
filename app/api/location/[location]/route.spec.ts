import { afterEach, describe, expect, it } from "vitest";
import { mockGoogleLocationHandle } from "@features/google-geocode/__mocks__/location-lookup.handler";
import { withHandleError, withResponse } from "@utils/msw-http-mocker";
import { createMockRequest } from "@utils/next-mock-request-builder";
import { server } from "@project/vitest-setup";
import { GET } from "./route";

describe("Route: api/location/[location]", async () => {
    afterEach(() => {
        server.resetHandlers();
    });

    it("should return 200 given valid location", async () => {
        const request = createMockRequest({
            path: `/api/location/mockLocation`,
        });

        const response = await GET(request, { params: { location: "mockLocation" } });
        expect(response?.status).toBe(200);
    });

    it("should return 200 given valid location and region", async () => {
        const request = createMockRequest({
            path: `/api/location/mockLocation`,
            params: { region: "mockRegion" },
        });

        const response = await GET(request, { params: { location: "mockLocation" } });
        expect(response?.status).toBe(200);
    });

    it("should return 404 with empty results.", async () => {
        const request = createMockRequest({ path: "/api/location/mockLocation" });
        withResponse(mockGoogleLocationHandle, {
            results: [],
            status: "ZERO_RESULTS",
        });
        const response = await GET(request, { params: { location: "mockLocation" } });
        expect(response?.status).toBe(404);
    });

    it("should return 500 when unexpected error occurs.", async () => {
        withHandleError(mockGoogleLocationHandle);
        const request = createMockRequest({
            path: `/api/location/mockLocation`,
        });

        const response = await GET(request, { params: { location: "mockLocation" } });
        expect(response?.status).toBe(500);
    });
});
