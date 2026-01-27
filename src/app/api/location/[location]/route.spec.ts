import { server } from "@project/vitest-setup";
import { mockGoogleLocationHandle } from "@src/apis/google/location-lookup/__mocks__/location-lookup.handler";
import { withHandleError, withResponse } from "@utils/msw-http-mocker";
import { createMockRequest } from "@utils/next-mock-request-builder";
import { afterEach, describe, expect, it } from "vitest";

import { GET } from "./route";

describe("Route: api/location/[location]", async () => {
    afterEach(() => {
        server.resetHandlers();
    });

    it("should return 200 given valid location", async () => {
        const request = createMockRequest({
            path: "/api/location/mockLocation"
        });

        const params = Promise.resolve({ location: "mockLocation" });
        const response = await GET(request, { params });
        expect(response?.status).toBe(200);
    });

    it("should return 200 given valid location and region", async () => {
        const request = createMockRequest({
            params: { region: "mockRegion" },
            path: "/api/location/mockLocation"
        });

        const params = Promise.resolve({ location: "mockLocation" });
        const response = await GET(request, { params });
        expect(response?.status).toBe(200);
    });

    it("should return 404 with empty results.", async () => {
        const request = createMockRequest({ path: "/api/location/mockLocation" });
        withResponse(mockGoogleLocationHandle, {
            results: [],
            status: "ZERO_RESULTS"
        });
        const params = Promise.resolve({ location: "mockLocation" });
        const response = await GET(request, { params });
        expect(response?.status).toBe(404);
    });

    it("should return 500 when unexpected error occurs.", async () => {
        withHandleError(mockGoogleLocationHandle);
        const request = createMockRequest({
            path: "/api/location/mockLocation"
        });

        const params = Promise.resolve({ location: "mockLocation" });
        const response = await GET(request, { params });
        expect(response?.status).toBe(500);
    });
});
