import { afterEach, describe, expect, it, test } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { HttpResponse } from "msw";
import { createLocationLookupMock } from "@features/weaget/__mocks__/location-lookup.mock";
import locationLookupSchema from "@features/weaget/location-lookup/location-lookup.schema";
import { mockLocationLookupHandle } from "@features/weaget/__mocks__/location-lookup.handler";
import { server } from "@project/vitest-setup";
import { testQueryClient } from "@utils/query-client";
import { testWrapper } from "@utils/wrappers";
import { useGetLocation } from "@src/hooks/use-get-location";

describe("Hooks - use-get-location", async () => {
    afterEach(() => {
        server.resetHandlers();
        testQueryClient.clear();
    });

    describe("useGetLocation", async () => {
        it("hook should return the correct data upon receiving valid request.", async () => {
            const locationLookupMockData = createLocationLookupMock();
            const parsedMockData = locationLookupSchema.parse(locationLookupMockData);
            server.use(mockLocationLookupHandle(HttpResponse.json(locationLookupMockData)));
            const { result } = renderHook(
                () => useGetLocation("mockLocation"),
                { wrapper: testWrapper },
            );

            await waitFor(() => expect(result.current.isSuccess).toBe(true));
            expect(result.current.data).toEqual(parsedMockData);
        });

        it("hook should return the correct data upon receiving valid request with optional params.", async () => {
            const locationLookupMockData = createLocationLookupMock();
            const parsedMockData = locationLookupSchema.parse(locationLookupMockData);
            server.use(mockLocationLookupHandle(HttpResponse.json(locationLookupMockData)));
            const { result } = renderHook(
                () => useGetLocation("mockLocation", "mockRegion"),
                { wrapper: testWrapper },
            );

            await waitFor(() => expect(result.current.isSuccess).toBe(true));
            expect(result.current.data).toEqual(parsedMockData);
        });

        test.each([
            [401], [403], [404], [405], [406], [500], [502], [504],
        ])("hook should return throw error upon receiving request with invalid status code. (%d)",
            async (statusCode: number) => {
                const locationLookupMockData = createLocationLookupMock();
                server.use(mockLocationLookupHandle(
                    HttpResponse.json(locationLookupMockData, { status: statusCode }),
                ));

                const { result } = renderHook(
                    () => useGetLocation("mockLocation"),
                    { wrapper: testWrapper },
                );

                await waitFor(() => expect(result.current.isError).toBe(true));
            });
    });
});
