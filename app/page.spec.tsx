import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { testOfflineQueryClient, testQueryClient } from "@utils/query-client";
import Home from "./page";
import { mockCurrentLocationHandle } from "@features/weaget/__mocks__/current-location.handler";
import { mockNearbyLocationHandle } from "@features/weaget/__mocks__/nearby-location.handler";
import { mockWeatherHandle } from "@features/weaget/__mocks__/weather.handler";
import { server } from "@project/vitest-setup";
import { waitFor } from "@testing-library/react";
import { withHandleError } from "@utils/msw-http-mocker";
import { withRender } from "@utils/render";

describe("Page: not-found", async () => {
    beforeEach(() => {
        vi.mock("next/navigation", () => ({
            useRouter: () => ({ push: () => true }),
        }));
    });

    afterEach(() => {
        testOfflineQueryClient.clear();
        testQueryClient.clear();
        server.resetHandlers();
    });

    it("should display loader when widgets have not loaded.", () => {
        const { getByTestId } = withRender(<Home />, { offline: true });
        expect(getByTestId("loader")).toBeInTheDocument();
    });

    it.each([
        ["weather", mockWeatherHandle, "Error fetching weather data. Please try again later."],
        ["current location", mockCurrentLocationHandle, "Error fetching location data. Please try again later."],
        ["nearby location", mockNearbyLocationHandle, "Error fetching location data. Please try again later."],
    ])("should display errors when %s data fails to load.", async (
        _,
        mockHandle,
        expectedErrorMessage,
    ) => {
        withHandleError(mockHandle);
        const { getByText } = withRender(<Home />);
        await waitFor(() => expect(getByText(expectedErrorMessage)).toBeInTheDocument());
    });

    it.each([
        ["Local Weather", "weather.localWeather"],
        ["Suggested Locations", "component.widget.locationGrid.title"],
    ])("should display %s when widgets have loaded.", async (_, widgetTitle) => {
        const { getByText } = withRender(<Home />);
        await waitFor(() => expect(getByText(widgetTitle)).toBeInTheDocument());
    });
});
