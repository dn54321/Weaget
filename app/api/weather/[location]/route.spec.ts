import { afterEach, describe, expect, it } from "vitest";

import { GET } from "./route";
import { createMockRequest } from "../../../../src/utils/next-mock-request-builder";
import { mockOpenWeatherOneCallHandle } from "../../../../src/features/open-weather-map-one-call/__mocks__/onecall.handler";
import { withHandleError } from "../../../../src/utils/msw-http-mocker";
import { server } from "../../../../vitest-setup";


describe('Route: api/weather/[location]', async () => {
    afterEach(() => {
        server.resetHandlers();
    });
    
    it('should return 200 status when location is set.', async () => {
        const request = createMockRequest({ 
            path: "/api/location/mockLocation",
        });

        const response = await GET(request, {params : {location: 'mockLocation'}});
        expect(response.status).toBe(200);
    });

    it('should return 200 status when location and region is set.', async () => {
        const request = createMockRequest({ 
            path: "/api/location/mockLocation",
            params: {region: 'mockRegion'}
        });

        const response = await GET(request, {params : {location: 'mockLocation'}});
        expect(response.status).toBe(200);
    });

    it('should return 500 when unexpected error occurs.', async () => {
        withHandleError(mockOpenWeatherOneCallHandle);
        const request = createMockRequest({ 
            path: "/api/location/mockLocation",
        });

        const response = await GET(request, {params : {location: 'mockLocation'}});
        expect(response.status).toBe(500);
    });
})