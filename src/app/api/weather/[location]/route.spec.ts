import { server } from "@project/vitest-setup";
import { mockOpenWeatherOneCallHandle } from "@src/apis/open-weather-map/one-call/__mocks__/one-call.handler";
import { withHandleError } from "@utils/msw-http-mocker";
import { createMockRequest } from "@utils/next-mock-request-builder";
import { afterEach, describe, expect, it } from "vitest";

import { GET } from "./route";

describe("Route: api/weather/[location]", async () => {
    afterEach(() => {
        server.resetHandlers();
    });

    it("should return 200 status when location is set.", async () => {
        const request = createMockRequest({
            path: "/api/location/mockLocation"
        });

        const params = Promise.resolve({ location: "mockLocation" });
        const response = await GET(request, { params });
        expect(response?.status).toBe(200);
    });

    it("should return 200 status when location and region is set.", async () => {
        const request = createMockRequest({
            params: { region: "mockRegion" },
            path: "/api/location/mockLocation"
        });

        const params = Promise.resolve({ location: "mockLocation" });
        const response = await GET(request, { params });
        expect(response?.status).toBe(200);
    });

    it("should return 500 when unexpected error occurs.", async () => {
        withHandleError(mockOpenWeatherOneCallHandle);
        const request = createMockRequest({
            path: "/api/location/mockLocation"
        });

        const params = Promise.resolve({ location: "mockLocation" });
        const response = await GET(request, { params });
        expect(response?.status).toBe(500);
    });
});
