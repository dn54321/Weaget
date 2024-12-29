import { afterEach, describe, expect, it, test } from "vitest";
import { HttpResponse } from "msw";
import apicnPollutionSchema from "@features/apicn-pollution/pollution.schema";
import { createApicnPollutionMockData } from "@features/apicn-pollution/__mocks__/pollution.mock";
import { getPollutionByCoord } from "@services/pollution.service";
import { mockApicnPollutionHandle } from "@features/apicn-pollution/__mocks__/pollution.handler";
import { server } from "@project/vitest-setup";

describe("Pollution Service", async () => {
    afterEach(() => {
        server.resetHandlers();
    });

    describe("getPollutionByCoord", async () => {
        it("should expect function with lat and lng to return valid response.", async () => {
            const mockPollutionData = createApicnPollutionMockData();
            const responseData = apicnPollutionSchema.parse(mockPollutionData);
            server.use(mockApicnPollutionHandle(HttpResponse.json(mockPollutionData)));
            await expect(getPollutionByCoord(0, 0))
                .resolves
                .toEqual(responseData);
        });

        it("should expect function to throw on unexpected response.", async () => {
            const mockNearbyLocationData = {
                data: "malformedData",
                status: "ok",
            };
            server.use(mockApicnPollutionHandle(HttpResponse.json(mockNearbyLocationData)));
            await expect(getPollutionByCoord(0, 0))
                .rejects
                .toThrow();
        });

        test.each([
            [401], [403], [404], [405], [406], [500], [502], [504],
        ])("should expect invalid response to throw error on %i status code.", async (statusCode: number) => {
            const mockPollutionData = createApicnPollutionMockData();
            const responseData = apicnPollutionSchema.parse(mockPollutionData);
            server.use(mockApicnPollutionHandle(HttpResponse.json(responseData, { status: statusCode })));
            await expect(getPollutionByCoord(0, 0))
                .rejects
                .toThrow();
        });

        it.each([
            ["error"],
        ])("should expect function to throw on %s request status.", async (requestStatus: string) => {
            const mockData = {
                ...createApicnPollutionMockData(),
                status: requestStatus,
            };

            server.use(mockApicnPollutionHandle(HttpResponse.json(mockData)));
            await expect(getPollutionByCoord(0, 0))
                .resolves
                .toMatchObject({ status: requestStatus });
        });
    });
});
