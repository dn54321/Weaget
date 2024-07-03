import { renderHook, waitFor } from "@testing-library/react";
import { HttpResponse } from "msw";
import { afterEach, describe, expect, it, test } from "vitest";
import { server } from "@project/vitest-setup";
import { testQueryClient } from "@utils/query-client";
import { mockNearbyLocationHandle } from "@features/weaget/__mocks__/nearby-location.handler";
import { createNearbyLocationMockData } from "@features/weaget/__mocks__/nearby-location.mock";
import { nearbyLocationSchema } from "@features/weaget/nearby-location/nearby-location.schema";
import { useGetNearbyLocation } from "@src/hooks/use-get-nearby-location";
import { testWrapper } from "@utils/wrappers";

describe("Hooks - use-get-nearby-location", async () => {
    afterEach(() => {
        server.resetHandlers();
        testQueryClient.clear();
    });

    describe("useGetNearbyLocation", async () => {
        it("hook should return the correct data upon receiving valid request.", async () => {
            const nearbyLocationMockData = createNearbyLocationMockData();
            const parsedMockData = nearbyLocationSchema.parse(nearbyLocationMockData);
            server.use(mockNearbyLocationHandle(HttpResponse.json(nearbyLocationMockData)));
            const { result } = renderHook(
                () => useGetNearbyLocation(0, 0),
                { wrapper: testWrapper }
            );

            await waitFor(() => expect(result.current.isSuccess).toBe(true));
            expect(result.current.data).toEqual(parsedMockData);
        });

        test.each([
            [401], [403], [404], [405], [406], [500], [502], [504],
        ])("hook should return throw error upon receiving request with invalid status code. (%d)",
            async (statusCode: number) => {
                const nearbyLocationMockData = createNearbyLocationMockData();
                server.use(mockNearbyLocationHandle(
                    HttpResponse.json(nearbyLocationMockData, { status: statusCode })
                ));

                const { result } = renderHook(
                    () => useGetNearbyLocation(0, 0),
                    { wrapper: testWrapper }
                );

                await waitFor(() => expect(result.current.isError).toBe(true));
            });
    });
});
