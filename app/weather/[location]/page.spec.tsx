import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Page from "./page";
import { withTestWrapper } from "@utils/wrappers";
import { render, waitFor } from "@testing-library/react";
import { mockPollutionHandle } from "@features/weaget/__mocks__/pollution.handler";
import { mockLocationLookupHandle } from "@features/weaget/__mocks__/location-lookup.handler";
import { mockWeatherHandle } from "@features/weaget/__mocks__/weather.handler";
import { withHandleError } from "@utils/msw-http-mocker";
import { mockNearbyLocationHandle } from "@features/weaget/__mocks__/nearby-location.handler";
import { testQueryClient } from "@utils/query-client";

describe('Page: app/weather/[location]', () => {
    const mocks = vi.hoisted(() => {
        return {
            mockRouterPush: vi.fn(),
        }
    });

    beforeEach(() => {
        vi.mock("next/navigation", () => ({
            useRouter: () => ({push: mocks.mockRouterPush}),
        }));
    });

    afterEach(() => {
        testQueryClient.clear();
        vi.resetAllMocks();
    })

    it.each([
        ['weather', mockWeatherHandle],
        ['location', mockLocationLookupHandle],
        ['nearby location', mockNearbyLocationHandle],
        ['pollution', mockPollutionHandle]
    ])('should display errors when %s data fails to load.', async (
        _,
        mockHandle,
    ) => {
        withHandleError(mockHandle);
        const { getByText } = render(
            withTestWrapper(<Page params={{location: "testLocation"}}/>)
        );
        await waitFor(() => expect(getByText("Error fetching weather data. Some elements may be unresponsive.")).toBeInTheDocument());
    });
});