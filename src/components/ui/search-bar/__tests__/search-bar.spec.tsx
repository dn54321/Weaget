import { afterEach, beforeEach, describe, expect, it, test, vi } from "vitest";
import { withHandleError, withResponse } from "@utils/msw-http-mocker";
import { SearchBar } from "./..";
import { SearchErrorI18NKey } from "@components/ui/search-bar/search-bar.component";
import { createCurrentLocationMockData } from "@features/weaget/__mocks__/current-location.mock";
import { mockAutoCompleteHandle } from "@features/weaget/__mocks__/auto-complete.handler";
import { mockCurrentLocationHandle } from "@features/weaget/__mocks__/current-location.handler";
import { mockLocationLookupHandle } from "@features/weaget/__mocks__/location-lookup.handler";
import { server } from "@project/vitest-setup";
import { testQueryClient } from "@utils/query-client";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/react";
import { withRender } from "@utils/render";

describe("Component: search-bar", async () => {
    const mocks = vi.hoisted(() => {
        return {
            mockRouterPush: vi.fn(),
        };
    });

    beforeEach(() => {
        vi.mock("next/navigation", () => ({
            useRouter: () => ({ push: mocks.mockRouterPush }),
        }));
    });

    afterEach(() => {
        vi.resetAllMocks();
        server.resetHandlers();
        testQueryClient.clear();
    });

    it("should be able to search a location.", async () => {
        mocks.mockRouterPush.mockResolvedValue(true);
        const user = userEvent.setup();
        const view = withRender(<SearchBar />);
        await user.type(view.getByRole("combobox"), "mockLocation");
        await user.click(view.getByLabelText("component.searchBar.search"));
        expect(mocks.mockRouterPush).toHaveBeenCalledWith("/weather/mockLocation");
    });

    test.each([
        [404, SearchErrorI18NKey.INVALID_LOCATION],
        [500, SearchErrorI18NKey.INTERNAL_SERVER_ERROR],
    ])("should display an error if the location endpoint returns status code %d.",
        async (statusCode, errorMessage) => {
            withHandleError(mockLocationLookupHandle, statusCode);
            withResponse(mockAutoCompleteHandle, []);
            const user = userEvent.setup();
            const view = withRender(<SearchBar />);

            await user.type(view.getByRole("combobox"), "invalidSuburb");
            await user.click(view.getByLabelText("component.searchBar.search"));
            await waitFor(() => expect(view.getByText(errorMessage)).toBeInTheDocument());
        });

    it("Upon searching, should display a list of clickable auto-complete options.", async () => {
        mocks.mockRouterPush.mockResolvedValue(true);
        withResponse(mockAutoCompleteHandle, [{ main: "mockLocation", secondary: "mockState" }]);
        const user = userEvent.setup();
        const { getByPlaceholderText, getByText } = withRender(<SearchBar />);

        const comboBox = getByPlaceholderText("component.searchBar.placeholder");
        await user.click(comboBox);
        await user.keyboard("m");
        await waitFor(() => expect(getByText("mockLocation")).toBeInTheDocument());
        await user.click(getByText("mockLocation"));
        expect(mocks.mockRouterPush).toHaveBeenCalledWith("/weather/mockLocation mockState");
    });

    it("should take me to my current location upon clicking the current location button.", async () => {
        mocks.mockRouterPush.mockResolvedValue(true);
        const currentLocationMock = createCurrentLocationMockData();
        withResponse(mockCurrentLocationHandle, currentLocationMock);
        const user = userEvent.setup();
        const { getByTestId } = withRender(<SearchBar />);

        const currentLocationButton = getByTestId("MyLocationIcon");
        await waitFor(() => expect(currentLocationButton).not.toBeDisabled());
        await user.click(currentLocationButton);
        expect(mocks.mockRouterPush).toHaveBeenCalledWith(`/weather/${currentLocationMock.city}`);
    });

    it("Upon clicking current location button, and the endpoint fails, an appropriate error message should be displayed.", async () => {
        mocks.mockRouterPush.mockResolvedValue(true);
        withHandleError(mockCurrentLocationHandle, 500);
        withResponse(mockAutoCompleteHandle, [{ main: "mockLocation", secondary: "mockState" }]);
        const user = userEvent.setup();
        const { getByTestId, getByText } = withRender(<SearchBar />);

        const currentLocationButton = getByTestId("MyLocationIcon");
        await waitFor(() => expect(currentLocationButton).not.toBeDisabled());
        await user.click(currentLocationButton);
        expect(getByText("component.searchBar.error.invalidCurrentLocation")).toBeInTheDocument();
    });
});
