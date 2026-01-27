import { mockLocationLookupHandle } from "@src/apis/weaget/location-lookup/__mocks__/location-lookup.handler";
import { mockNearbyLocationHandle } from "@src/apis/weaget/nearby-location/__mocks__/nearby-location.handler";
import { mockPollutionHandle } from "@src/apis/weaget/pollution/__mocks__/pollution.handler";
import { mockWeatherHandle } from "@src/apis/weaget/weather/__mocks__/weather.handler";
import { waitFor } from "@testing-library/react";
import { withHandleError } from "@utils/msw-http-mocker";
import { testQueryClient } from "@utils/query-client";
import { withRender } from "@utils/render";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import Page from "./page";

describe("Page: app/weather/[location]", () => {
    const mocks = vi.hoisted(() => {
        return {
            mockRouterPush: vi.fn()
        };
    });

    beforeEach(() => {
        vi.mock("next/navigation", () => ({
            useRouter: () => ({ push: mocks.mockRouterPush })
        }));
    });

    afterEach(() => {
        testQueryClient.clear();
        vi.resetAllMocks();
    });

    it("should resolve without displaying any skeletons", async () => {
        const params = Promise.resolve({ location: "testLocation" });
        const { getByText } = withRender(<Page params={params} />);
        await waitFor(() => expect(testQueryClient.isFetching()).toEqual(0));
        expect(() => getByText("")).toThrow();
    });

    it.each([
        ["weather", mockWeatherHandle],
        ["location", mockLocationLookupHandle],
        ["nearby location", mockNearbyLocationHandle],
        ["pollution", mockPollutionHandle]
    ])("should display errors when %s data fails to load.", async (
        _,
        mockHandle
    ) => {
        withHandleError(mockHandle);
        const params = Promise.resolve({ location: "testLocation" });
        const { getByText } = withRender(<Page params={params} />);
        await waitFor(() => expect(getByText("weather.error.fetchFailed")).toBeInTheDocument());
    });
});
