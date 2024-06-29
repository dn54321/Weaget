import { renderHook, waitFor } from "@testing-library/react";
import { HttpResponse } from "msw";
import { afterEach, describe, expect, it, test } from "vitest";
import { server } from "../../../vitest-setup";
import { testQueryClient } from "@utils/query-client";
import { mockWeatherHandle } from "@features/weaget/__mocks__/weather.handler";
import weatherSchema from "@features/weaget/weather.schema";
import { useGetWeather } from "@src/hooks/use-get-weather";
import { testWrapper } from "@utils/wrappers";
import { createWeatherMockData } from "@features/weaget/__mocks__/weather.mock";

describe('Hooks - use-get-weather', async () => {
    afterEach(() => {
        server.resetHandlers();
        testQueryClient.clear();
    });
    
    describe('useGetWeather', async () => {
        it('hook should return the correct data upon receiving valid request.', async () => {
            const weatherMockData = createWeatherMockData();
            const parsedMockData = weatherSchema.parse(weatherMockData);
            server.use(mockWeatherHandle(HttpResponse.json(weatherMockData)));
            const { result } = renderHook(
                () => useGetWeather('mockLocation'), 
                { wrapper: testWrapper }
            );
            
            await waitFor(() => expect(result.current.isSuccess).toBe(true));
            expect(result.current.data).toEqual(parsedMockData);
        });

        it('hook should return the correct data upon receiving valid request with optional params.', async () => {
            const weatherMockData = createWeatherMockData();
            const parsedMockData = weatherSchema.parse(weatherMockData);
            server.use(mockWeatherHandle(HttpResponse.json(weatherMockData)));
            const { result } = renderHook(
                () => useGetWeather('mockLocation', 'mockRegion'), 
                { wrapper: testWrapper }
            );
            
            await waitFor(() => expect(result.current.isSuccess).toBe(true));
            expect(result.current.data).toEqual(parsedMockData);
        });

        test.each([
            [401], [403], [404], [405], [406], [500], [502], [504]
        ])('hook should throw error upon receiving request with invalid status code (%d).', 
        async (statusCode: number) => {
            const weatherMockData = createWeatherMockData();
            server.use(mockWeatherHandle(
                HttpResponse.json(weatherMockData, {status: statusCode})
            ));

            const { result } = renderHook(
                () => useGetWeather('mockLocation'), 
                { wrapper: testWrapper }
            );
            
            await waitFor(() => expect(result.current.isError).toBe(true));
        });
    });
});