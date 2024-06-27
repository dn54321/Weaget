import { render, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, test, vi } from "vitest";
import { server } from "../../../../test-setup";
import { mockAutoCompleteHandle } from "../../../features/weaget/__mocks__/auto-complete.handler";
import { mockCurrentLocationHandle } from "../../../features/weaget/__mocks__/current-location.handler";
import { createCurrentLocationMockData } from "../../../features/weaget/__mocks__/current-location.mock";
import { mockLocationLookupHandle } from "../../../features/weaget/__mocks__/location-lookup.handler";
import { withHandleError, withResponse } from "../../../utils/msw-http-mocker";
import { testQueryClient } from "../../../utils/query-client";
import { withTestWrapper } from "../../../utils/wrappers";
import SearchBar from "../search-bar";


describe('Component: search-bar', async () => {
    const mocks = vi.hoisted(() => {
        return {
            mockRouterPush: vi.fn(),
        }
    })

    beforeEach(() => {
        vi.mock("next/navigation", () => ({
            useRouter: () => ({push: mocks.mockRouterPush}),
        }));
    });

    afterEach(() => {
        vi.resetAllMocks();
        server.resetHandlers();
        testQueryClient.clear();
    });

    it('should be able to search a location.', async () => {
        mocks.mockRouterPush.mockResolvedValue(true);
        const user = userEvent.setup();
        const {getByPlaceholderText, getByLabelText} = render(
            withTestWrapper(<SearchBar/>)
        );

        const comboBox = getByPlaceholderText('Search Weather Location');
        await user.click(comboBox);
        await user.keyboard('mockLocation');
        await user.click(getByLabelText('Search'));
        expect(mocks.mockRouterPush).toHaveBeenCalledWith('/weather/mockLocation');
    });

    test.each([
    [404, "Invalid Suburb Location"],
    [500, "Internal Server Error. Please try again later!"]   
    ])('should display an error if the location endpoint returns status code %d.', 
    async (statusCode, errorMessage) => {
        withHandleError(mockLocationLookupHandle, statusCode);
        withResponse(mockAutoCompleteHandle, []);
        const user = userEvent.setup();
        const {getByPlaceholderText, getByLabelText, getByText} = render(
            withTestWrapper(<SearchBar/>)
        );

        const comboBox = getByPlaceholderText('Search Weather Location');
        await user.click(comboBox);
        await user.keyboard('invalidSuburb');
        await user.click(getByLabelText('Search'));
        expect(getByText(errorMessage)).toBeInTheDocument();
    });

    it('Upon searching, should display a list of clickable auto-complete options.', async () => {
        mocks.mockRouterPush.mockResolvedValue(true);
        withResponse(mockAutoCompleteHandle, [{main: "mockLocation", secondary: "mockState"}]);
        const user = userEvent.setup();
        const {getByPlaceholderText, getByText} = render(
            withTestWrapper(<SearchBar/>)
        );

        const comboBox = getByPlaceholderText('Search Weather Location');
        await user.click(comboBox);
        await user.keyboard('m');
        await waitFor(() => expect(getByText("mockLocation")).toBeInTheDocument());
        await user.click(getByText('mockLocation'));
        expect(mocks.mockRouterPush).toHaveBeenCalledWith('/weather/mockLocation mockState');
    });

    it('should take me to my current location upon clicking the current location button.', async () => {
        mocks.mockRouterPush.mockResolvedValue(true);
        const currentLocationMock = createCurrentLocationMockData();
        withResponse(mockCurrentLocationHandle, currentLocationMock);
        const user = userEvent.setup();
        const {getByLabelText} = render(
            withTestWrapper(<SearchBar/>)
        );

        const currentLocationButton = getByLabelText('Use current location');
        await user.click(currentLocationButton);
        expect(mocks.mockRouterPush).toHaveBeenCalledWith(`/weather/${currentLocationMock.city}`);
    });
    
    it('Upon clicking current location button, and the endpoint fails, an appropriate error message should be displayed.', async () => {
        mocks.mockRouterPush.mockResolvedValue(true);
        withHandleError(mockCurrentLocationHandle, 500);
        withResponse(mockAutoCompleteHandle, [{main: "mockLocation", secondary: "mockState"}]);
        const user = userEvent.setup();
        const {getByLabelText, getByText} = render(
            withTestWrapper(<SearchBar/>)
        );

        const currentLocationButton = getByLabelText('Use current location');
        await user.click(currentLocationButton);
        expect(getByText("Could not retrieve current location. Please enter it manually!")).toBeInTheDocument();
    });
})
