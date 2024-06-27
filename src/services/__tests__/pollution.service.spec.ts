import { HttpResponse } from "msw";
import { afterEach, describe, expect, test } from "vitest";
import { server } from "../../../vitest-setup";
import { mockApicnPollutionHandle } from "../../features/apicn-pollution/__mocks__/pollution.handler";
import { createApicnPollutionMockData } from "../../features/apicn-pollution/__mocks__/pollution.mock";
import apicnPollutionSchema from "../../features/apicn-pollution/pollution.schema";
import { getPollutionByCoord } from "../pollution.service";

describe('Pollution Service', async () => {
    afterEach(() => {
        server.resetHandlers();
    })
    
    describe('getPollutionByCoord', async () => {
        test('Expect function with lat and lng to return valid response.', async () => {
            const mockPollutionData = createApicnPollutionMockData();
            const responseData = apicnPollutionSchema.parse(mockPollutionData);
            server.use(mockApicnPollutionHandle(HttpResponse.json(mockPollutionData)));
            await expect(getPollutionByCoord(0, 0))
                .resolves
                .toEqual(responseData);
        });

        test('Expect function to throw on unexpected response.', async () => {
            const mockNearbyLocationData = {
                status: "ok",
                data: "malformedData"
            };
            server.use(mockApicnPollutionHandle(HttpResponse.json(mockNearbyLocationData)));
            await expect(getPollutionByCoord(0, 0))
                .rejects
                .toThrow();
        });

        test.each([
            [401], [403], [404], [405], [406], [500], [502], [504]
        ])('Expect invalid response to throw error on %i status code.', async (statusCode: number) => {
            const mockPollutionData = createApicnPollutionMockData();
            const responseData = apicnPollutionSchema.parse(mockPollutionData);
            server.use(mockApicnPollutionHandle(HttpResponse.json(responseData, {status: statusCode})));
            await expect(getPollutionByCoord(0, 0))
                .rejects
                .toThrow();
        });

        test.each([
            ["error"], 
        ])('Expect function to throw on %s request status.', async (requestStatus: string) => {
            const mockData = {
                ...createApicnPollutionMockData(),
                status: requestStatus
            }

            server.use(mockApicnPollutionHandle(HttpResponse.json(mockData)));
            await expect(getPollutionByCoord(0, 0))
              .resolves
              .toMatchObject({status: requestStatus});
        });
    })
})