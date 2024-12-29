import { afterEach, describe, expect, it } from "vitest";
import { withHandleError, withResponse } from "@utils/msw-http-mocker";
import { GET } from "./route";
import { createGeonameMockData } from "@features/geonames-nearby-search/__mocks__/nearby-location.mock";
import { createMockRequest } from "@utils/next-mock-request-builder";
import { mockGeonamesNearbyLocationHandle } from "@features/geonames-nearby-search/__mocks__/nearby-location.handler";
import { server } from "@project/vitest-setup";
;

describe("Route: api/location/nearby-search", async () => {
    afterEach(() => {
        server.resetHandlers();
    });

    it("should return 200 OK with correct payload and query params.", async () => {
        const request = createMockRequest({
            params: { lat: "1", lng: "2" },
            path: "/api/location/nearby-search",
        });

        const response = await GET(request);
        expect(response?.status).toBe(200);
    });

    it("should return 400 with invalid query params.", async () => {
        const request = createMockRequest({ path: "/api/location/nearby-search" });

        const response = await GET(request);
        expect(response?.status).toBe(400);
    });

    it("should return 200 when state is missing from payload.", async () => {
        withResponse(mockGeonamesNearbyLocationHandle, {
            geonames: [
                { ...createGeonameMockData(), adminCodes1: undefined },
                { ...createGeonameMockData(), adminCodes1: { ISO3166_2: undefined } },
            ],
        });
        const request = createMockRequest({
            params: { lat: "1", lng: "2" },
            path: "/api/location/nearby-search",
        });

        const response = await GET(request);
        expect(response?.status).toBe(200);
    });

    it("should return 500 when unexpected error occurs.", async () => {
        withHandleError(mockGeonamesNearbyLocationHandle);
        const request = createMockRequest({
            params: { lat: "1", lng: "2" },
            path: "/api/location/nearby-search",
        });

        const response = await GET(request);
        expect(response?.status).toBe(500);
    });
});
