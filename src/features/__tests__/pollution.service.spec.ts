import { server } from "@project/vitest-setup";
import { mockPollutionResponse } from "@src/apis/apicn/pollution/__mocks__/pollution.handler";
import { createApicnPollutionMockData } from "@src/apis/apicn/pollution/__mocks__/pollution.mock";
import PollutionSchema from "@src/apis/apicn/pollution/pollution.schema";
import { getPollutionByCoord } from "@src/features/pollution.service";
import { HttpResponse } from "msw";
import { afterEach, describe, expect, it, test } from "vitest";

describe("Pollution Service", async () => {
    afterEach(() => {
        server.resetHandlers();
    });

    describe("getPollutionByCoord", async () => {
        it("should expect function with lat and lng to return valid response.", async () => {
            const mockPollutionData = createApicnPollutionMockData();
            const responseData = PollutionSchema.parse(mockPollutionData);
            server.use(mockPollutionResponse(HttpResponse.json(mockPollutionData)));
            await expect(getPollutionByCoord(0, 0))
                .resolves
                .toEqual(responseData);
        });

        it("should expect function to throw on unexpected response.", async () => {
            const mockNearbyLocationData = {
                data: "malformedData",
                status: "ok"
            };
            server.use(mockPollutionResponse(HttpResponse.json(mockNearbyLocationData)));
            await expect(getPollutionByCoord(0, 0))
                .rejects
                .toThrow();
        });

        test.each([
            [401], [403], [404], [405], [406], [500], [502], [504]
        ])("should expect invalid response to throw error on %i status code.", async (statusCode: number) => {
            const mockPollutionData = createApicnPollutionMockData();
            const responseData = PollutionSchema.parse(mockPollutionData);
            server.use(mockPollutionResponse(HttpResponse.json(responseData, { status: statusCode })));
            await expect(getPollutionByCoord(0, 0))
                .rejects
                .toThrow();
        });

        it.each([
            ["error"]
        ])("should expect function to throw on %s request status.", async (requestStatus: string) => {
            const mockData = {
                ...createApicnPollutionMockData(),
                status: requestStatus
            };

            server.use(mockPollutionResponse(HttpResponse.json(mockData)));
            await expect(getPollutionByCoord(0, 0))
                .resolves
                .toMatchObject({ status: requestStatus });
        });
    });
});
