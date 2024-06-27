import { render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Home from "./page";
import { testOfflineQueryClient, testQueryClient } from "../src/utils/query-client";
import { withTestOfflineWrapper, withTestWrapper } from "../src/utils/wrappers";
import { server } from "../vitest-setup";
import { mockWeatherHandle } from "../src/features/weaget/__mocks__/weather.handler";
import { mockCurrentLocationHandle } from "../src/features/weaget/__mocks__/current-location.handler";
import { mockNearbyLocationHandle } from "../src/features/weaget/__mocks__/nearby-location.handler";
import { withHandleError } from "../src/utils/msw-http-mocker";

describe('Page: not-found', async () => {
    beforeEach(() => {
        vi.mock("next/navigation", () => ({
            useRouter: () => ({push: () => true}),
        }));
    });

    afterEach(() => {
        testOfflineQueryClient.clear();
        testQueryClient.clear();
        server.resetHandlers();
    });

    it('should display loader when widgets have not loaded.', () => {
        const {getByTestId} = render(withTestOfflineWrapper(<Home/>));
        expect(getByTestId('loader')).toBeInTheDocument();
    });

    it.each([
        ['weather', mockWeatherHandle, 'Error fetching weather data. Please try again later.'],
        ['current location', mockCurrentLocationHandle, 'Error fetching location data. Please try again later.'],
        ['nearby location', mockNearbyLocationHandle, 'Error fetching location data. Please try again later.']
    ])('should display errors when %s data fails to load.', async (
        _,
        mockHandle,
        expectedErrorMessage
    ) => {
        withHandleError(mockHandle);
        const {getByText} = render(withTestWrapper(<Home/>));
        await waitFor(() => expect(getByText(expectedErrorMessage)).toBeInTheDocument());
    });

    it.each([
        ['Local Weather'],
        ['Suggested Locations']
    ])('should display %s when widgets have loaded.', async (widgetName) => {
        const {getByText} = render(withTestWrapper(<Home/>));
        await waitFor(() => expect(getByText(widgetName)).toBeInTheDocument());
    })
});