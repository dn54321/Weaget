import { renderHook, waitFor } from "@testing-library/react";
import { HttpResponse } from "msw";
import { afterEach, describe, expect, it, test } from "vitest";
import { server } from "@project/vitest-setup";
import { testQueryClient } from "@utils/query-client";
import { mockPollutionHandle } from "@features/weaget/__mocks__/pollution.handler";
import { createPollutionMockData } from "@features/weaget/__mocks__/pollution.mock";
import { pollutionSchema } from "@features/weaget/pollution.schema";
import { useGetPollution } from "@src/hooks/use-get-pollution";
import { testWrapper } from "@utils/wrappers";
import { withResponse } from "@utils/msw-http-mocker";

describe("Hooks - use-get-pollution", async () => {
    afterEach(() => {
        server.resetHandlers();
        testQueryClient.clear();
    });

    describe("useGetPollution", async () => {
        it("hook should return the correct data upon receiving valid request.", async () => {
            const pollutionMockData = createPollutionMockData();
            const parsedMockData = pollutionSchema.parse(pollutionMockData.data);
            server.use(mockPollutionHandle(HttpResponse.json(pollutionMockData)));
            const { result } = renderHook(
                () => useGetPollution(0, 0),
                { wrapper: testWrapper }
            );

            await waitFor(() => expect(result.current.isSuccess).toBe(true));
            expect(result.current.data).toEqual(parsedMockData);
        });

        it("hook should throw an error if api sends an error response.", async () => {
            const pollutionMockData = {
                ...createPollutionMockData(),
                status: "error",
            };

            withResponse(mockPollutionHandle, pollutionMockData);
            const { result } = renderHook(
                () => useGetPollution(0, 0),
                { wrapper: testWrapper }
            );

            await waitFor(() => expect(result.current.isError).toBe(true));
        });

        test.each([
            [401], [403], [404], [405], [406], [500], [502], [504],
        ])("hook should return throw error upon receiving request with invalid status code. (%d)",
            async (statusCode: number) => {
                const pollutionMockData = createPollutionMockData();
                server.use(mockPollutionHandle(
                    HttpResponse.json(pollutionMockData, { status: statusCode })
                ));

                const { result } = renderHook(
                    () => useGetPollution(0, 0),
                    { wrapper: testWrapper }
                );

                await waitFor(() => expect(result.current.isError).toBe(true));
            });
    });
});
