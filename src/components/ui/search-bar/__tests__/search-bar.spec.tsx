import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, test, vi } from "vitest";
import { mockAutoCompleteHandle } from "@features/weaget/__mocks__/auto-complete.handler";
import { mockCurrentLocationHandle } from "@features/weaget/__mocks__/current-location.handler";
import { createCurrentLocationMockData } from "@features/weaget/__mocks__/current-location.mock";
import { mockLocationLookupHandle } from "@features/weaget/__mocks__/location-lookup.handler";
import { withHandleError, withResponse } from "@utils/msw-http-mocker";
import { testQueryClient } from "@utils/query-client";
import { withRender } from "@utils/wrappers";
import { SearchBar } from "./..";
import { server } from "@project/vitest-setup";
import { SearchErrorMessage } from "@components/ui/search-bar/search-bar.component";

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
        await user.click(view.getByLabelText("Search"));
        expect(mocks.mockRouterPush).toHaveBeenCalledWith("/weather/mockLocation");
    });

    test.each([
        [404, SearchErrorMessage.INVALID_LOCATION],
        [500, SearchErrorMessage.INTERNAL_SERVER_ERROR],
    ])("should display an error if the location endpoint returns status code %d.",
        async (statusCode, errorMessage) => {
            withHandleError(mockLocationLookupHandle, statusCode);
            withResponse(mockAutoCompleteHandle, []);
            const user = userEvent.setup();
            const view = withRender(<SearchBar />);

            await user.type(view.getByRole("combobox"), "invalidSuburb");
            await user.click(view.getByLabelText("Search"));
            await waitFor(() => expect(view.getByText(errorMessage)).toBeInTheDocument());
        });

    it("Upon searching, should display a list of clickable auto-complete options.", async () => {
        mocks.mockRouterPush.mockResolvedValue(true);
        withResponse(mockAutoCompleteHandle, [{ main: "mockLocation", secondary: "mockState" }]);
        const user = userEvent.setup();
        const { getByPlaceholderText, getByText } = withRender(<SearchBar />);

        const comboBox = getByPlaceholderText("Search Weather Location");
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
        const { getByLabelText } = withRender(<SearchBar />);

        const currentLocationButton = getByLabelText("Use current location");
        await user.click(currentLocationButton);
        expect(mocks.mockRouterPush).toHaveBeenCalledWith(`/weather/${currentLocationMock.city}`);
    });

    it("Upon clicking current location button, and the endpoint fails, an appropriate error message should be displayed.", async () => {
        mocks.mockRouterPush.mockResolvedValue(true);
        withHandleError(mockCurrentLocationHandle, 500);
        withResponse(mockAutoCompleteHandle, [{ main: "mockLocation", secondary: "mockState" }]);
        const user = userEvent.setup();
        const { getByLabelText, getByText } = withRender(<SearchBar />);

        const currentLocationButton = getByLabelText("Use current location");
        await user.click(currentLocationButton);
        expect(getByText("Could not retrieve current location. Please enter it manually!")).toBeInTheDocument();
    });
});
