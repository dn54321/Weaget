import { server } from "@project/vitest-setup";
import { mockOpenWeatherOneCallHandle } from "@src/apis/open-weather-map/one-call/__mocks__/one-call.handler";
import { createOpenWeatherOneCallMockData } from "@src/apis/open-weather-map/one-call/__mocks__/one-call.mock";
import { oneCallWeatherDetailsSchema } from "@src/apis/open-weather-map/one-call/one-call.schema";
import { getWeatherByCoords, getWeatherByRegion } from "@src/features/weather.service";
import { HttpResponse } from "msw";
import { afterEach, describe, expect, it, test } from "vitest";

describe("Weather Service", async () => {
    afterEach(() => {
        server.resetHandlers();
    });

    describe("getWeatherByCoords", async () => {
        it("Expect function with lat and lng to return valid response.", async () => {
            const mockWeatherData = createOpenWeatherOneCallMockData();
            const responseData = oneCallWeatherDetailsSchema.parse(mockWeatherData);
            server.use(mockOpenWeatherOneCallHandle(HttpResponse.json(mockWeatherData)));
            await expect(getWeatherByCoords(0, 0))
                .resolves
                .toEqual(responseData);
        });

        it("Expect function to throw on unexpected response.", async () => {
            const mockWeatherData = { data: "malformedData" };
            server.use(mockOpenWeatherOneCallHandle(HttpResponse.json(mockWeatherData)));
            await expect(getWeatherByCoords(0, 0))
                .rejects
                .toThrow();
        });

        test.each([
            [401], [403], [404], [405], [406], [500], [502], [504]
        ])("Expect invalid response to throw error on %i status code.", async (statusCode: number) => {
            const mockWeatherData = createOpenWeatherOneCallMockData();
            const responseData = oneCallWeatherDetailsSchema.parse(mockWeatherData);
            server.use(mockOpenWeatherOneCallHandle(HttpResponse.json(responseData, { status: statusCode })));
            await expect(getWeatherByCoords(0, 0))
                .rejects
                .toThrow();
        });
    });

    describe("getWeatherByRegion", async () => {
        it("Expect function with location to return a valid response", async () => {
            await expect(getWeatherByRegion("mockLocation"))
                .resolves
                .toBeTypeOf("object");
        });

        it("Expect function with location and region to return a valid response", async () => {
            await expect(getWeatherByRegion("mockLocation", "mockRegion"))
                .resolves
                .toBeTypeOf("object");
        });
    });
});
