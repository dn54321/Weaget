import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { testWrapper } from "@utils/wrappers";
import { NearbyLocations } from "@features/weaget/nearby-location.types";
import userEvent from "@testing-library/user-event";
import { LocationGridWidget } from "..";

describe("Component: location-grid-widget", async () => {
    let nearbyLocations: NearbyLocations;

    const mocks = vi.hoisted(() => {
        return {
            mockRouterPush: vi.fn(),
        };
    });

    beforeAll(() => {
        nearbyLocations = [{
            name: "mockName",
            state: "mockState",
            country: "mockCountry",
        },
        {
            name: "mockName2",
            state: "mockState2",
            country: "mockCountry2",
        }];
    });

    beforeEach(() => {
        vi.mock("next/navigation", () => ({
            useRouter: () => ({ push: mocks.mockRouterPush }),
        }));
    });

    it("should contain a title.", () => {
        const { getByText } = render(
            <LocationGridWidget locationData={nearbyLocations} />,
            { wrapper: testWrapper }
        );
        expect(getByText("Suggested Locations")).toBeInTheDocument();
    });

    it("should contain a subtitle.", () => {
        const { getByText } = render(
            <LocationGridWidget locationData={nearbyLocations} />,
            { wrapper: testWrapper }
        );
        expect(getByText("Click on any card for more weather details!")).toBeInTheDocument();
    });

    it("should contains a list of locations.", () => {
        const { getByText } = render(
            <LocationGridWidget locationData={nearbyLocations} />,
            { wrapper: testWrapper }
        );
        expect(getByText("mockName")).toBeInTheDocument();
        expect(getByText("mockName2")).toBeInTheDocument();
    });

    it("clicking a location should redirect to weather page.",
        async () => {
            mocks.mockRouterPush.mockResolvedValue(true);
            const user = userEvent.setup();
            const { getByText } = render(
                <LocationGridWidget locationData={nearbyLocations} />,
                { wrapper: testWrapper }
            );

            await user.click(getByText("mockName"));
            expect(mocks.mockRouterPush)
                .toHaveBeenCalledWith("/weather/mockName mockState, mockCountry");
        });

    it("should return null if no data is provided.", () => {
        const { container } = render(
            <LocationGridWidget locationData={undefined} />,
            { wrapper: testWrapper }
        );

        expect(container.firstChild).toBeNull();
    });
});
