import { act, renderHook, waitFor } from "@testing-library/react";
import { HttpResponse } from "msw";
import { afterEach, describe, expect, it, test } from "vitest";
import { server } from "@project/vitest-setup";
import { mockAutoCompleteHandle } from "@features/weaget/__mocks__/auto-complete.handler";
import { createAutoCompleteMockData } from "@features/weaget/__mocks__/auto-complete.mock";
import { weagetAutoCompleteSchema as autoCompleteSchema } from "@features/weaget/auto-complete/auto-complete.schema";
import { useGetLocationAutoComplete } from "@src/hooks/use-get-location-auto-complete";
import { testQueryClient } from "@utils/query-client";
import { testWrapper } from "@utils/wrappers";

describe("Hooks - use-get-location-auto-complete", async () => {
    afterEach(() => {
        server.resetHandlers();
        testQueryClient.clear();
    });

    describe("useGetLocationAutoComplete", async () => {
        it("hook should return the correct data on initial load.", async () => {
            const locationAutoCompleteMockData = createAutoCompleteMockData();
            const parsedMockData = autoCompleteSchema.parse(locationAutoCompleteMockData);
            server.use(mockAutoCompleteHandle(HttpResponse.json(locationAutoCompleteMockData)));
            const { result } = renderHook(
                () => useGetLocationAutoComplete("mockInput"),
                { wrapper: testWrapper }
            );

            await waitFor(() => expect(result.current[0].isSuccess).toBe(true));
            expect(result.current[0].data).toEqual(parsedMockData);
        });

        it("hook should return the correct data on initial load with optional args.", async () => {
            const locationAutoCompleteMockData = createAutoCompleteMockData();
            const parsedMockData = autoCompleteSchema.parse(locationAutoCompleteMockData);
            server.use(mockAutoCompleteHandle(HttpResponse.json(locationAutoCompleteMockData)));
            const { result } = renderHook(
                () => useGetLocationAutoComplete("mockInput", "mockLocation"),
                { wrapper: testWrapper }
            );

            await waitFor(() => expect(result.current[0].isSuccess).toBe(true));
            expect(result.current[0].data).toEqual(parsedMockData);
        });

        test.each([
            [401], [403], [404], [405], [406], [500], [502], [504],
        ])("should throw error when response provides an invalid status code %i.", async (statusCode: number) => {
            const locationAutoCompleteMockData = createAutoCompleteMockData();
            server.use(
                mockAutoCompleteHandle(HttpResponse.json(locationAutoCompleteMockData, { status: statusCode })
                ));
            const { result } = renderHook(
                () => useGetLocationAutoComplete("mockInput"),
                { wrapper: testWrapper }
            );

            await waitFor(() => expect(result.current[0].isError).toBe(true));
        });

        it("hook should return the correct data on subsequent requests", async () => {
            const { result } = renderHook(
                () => useGetLocationAutoComplete("mockInput"),
                { wrapper: testWrapper }
            );

            await waitFor(() => expect(result.current[0].isSuccess).toBe(true));
            const locationAutoCompleteMockData = createAutoCompleteMockData();
            const parsedMockData = autoCompleteSchema.parse(locationAutoCompleteMockData);
            server.use(mockAutoCompleteHandle(HttpResponse.json(parsedMockData)));
            await act(async () => result.current[1]("mockLocation"));
            await waitFor(() => expect(result.current[0].isSuccess).toBe(true));
            expect(result.current[0].data).toEqual(parsedMockData);
        });

        test.each([
            [401], [403], [404], [405], [406], [500], [502], [504],
        ])("should throw error on invalid status code %i on errors within subsequent requests.", async (statusCode: number) => {
            const { result } = renderHook(
                () => useGetLocationAutoComplete("mockInput"),
                { wrapper: testWrapper }
            );

            await waitFor(() => expect(result.current[0].isSuccess).toBe(true));
            const locationAutoCompleteMockData = createAutoCompleteMockData();
            server.use(
                mockAutoCompleteHandle(HttpResponse.json(locationAutoCompleteMockData, { status: statusCode }))
            );

            await act(async () => result.current[1]("mockLocation"));
            await waitFor(() => expect(result.current[0].isFetching).toBe(true));
        });
    });
});
