import { renderHook, waitFor } from "@testing-library/react";
import { HttpResponse } from "msw";
import { afterEach, describe, expect, it, test } from "vitest";
import { server } from "../../../test-setup";
import { createCurrentLocationMockData } from "../../features/weaget/__mocks__/current-location.mock";
import { queryCurrentLocation, useGetCurrentLocation } from "../use-get-current-location";
import weagetCurrentLocationSchema from "../../features/weaget/current-location.schema";
import { mockCurrentLocationHandle } from "../../features/weaget/__mocks__/current-location.handler";
import { testQueryClient } from "../../utils/query-client";
import { testWrapper } from "../../utils/wrappers";

describe('Hooks - use-get-current-location', async () => {
    afterEach(() => {
        server.resetHandlers();
        testQueryClient.clear();
    });
    
    
    describe('useGetCurrentLocation', async () => {
        it('hook should return the correct data upon receiving valid request.', async () => {
            const currentLocationMockData = createCurrentLocationMockData();
            const parsedMockData = weagetCurrentLocationSchema.parse(currentLocationMockData);
            server.use(mockCurrentLocationHandle(HttpResponse.json(currentLocationMockData)));
            const { result } = renderHook(
                () => useGetCurrentLocation(), 
                { wrapper: testWrapper }
            );
            
            await waitFor(() => expect(result.current.isSuccess).toBe(true));
            expect(result.current.data).toEqual(parsedMockData);
        });

        test.each([
            [401], [403], [404], [405], [406], [500], [502], [504]
        ])('should throw error on invalid status code %i.', async (statusCode: number) => {
            const currentLocationMockData = createCurrentLocationMockData();
            server.use(mockCurrentLocationHandle(
                HttpResponse.json(currentLocationMockData,  {status: statusCode})
            ));
            const { result } = renderHook(
                () => useGetCurrentLocation(), 
                { wrapper: testWrapper }
            );
            
            await waitFor(() => expect(result.current.isError).toBe(true));
        });
    });

    describe('queryCurrentLocation', () => {
        it('function return the correct data upon receiving valid request.', async () => {
            const currentLocationMockData = createCurrentLocationMockData();
            const parsedMockData = weagetCurrentLocationSchema.parse(currentLocationMockData);
            server.use(mockCurrentLocationHandle(HttpResponse.json(currentLocationMockData)));
            const currentLocation = await queryCurrentLocation();
            expect(currentLocation).toEqual(parsedMockData);
        });

        test.each([
            [401], [403], [404], [405], [406], [500], [502], [504]
        ])('should throw error on invalid status code %i.', async (statusCode: number) => {
            const currentLocationMockData = createCurrentLocationMockData();
            server.use(mockCurrentLocationHandle(
                HttpResponse.json(currentLocationMockData, {status: statusCode})
            ));
            await expect(queryCurrentLocation(testQueryClient)).rejects.toThrow();
        });
    })
})