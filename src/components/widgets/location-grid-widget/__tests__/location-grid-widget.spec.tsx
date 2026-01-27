import { NearbyLocations } from "@src/apis/weaget/nearby-location/nearby-location.types";
import userEvent from "@testing-library/user-event";
import { withRender } from "@utils/render";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

import { LocationGridWidget } from "..";

describe("Component: location-grid-widget", async () => {
    let nearbyLocations: NearbyLocations;

    const mocks = vi.hoisted(() => {
        return {
            mockRouterPush: vi.fn()
        };
    });

    beforeAll(() => {
        nearbyLocations = [{
            country: "mockCountry",
            name: "mockName",
            state: "mockState"
        },
        {
            country: "mockCountry2",
            name: "mockName2",
            state: "mockState2"
        }];
    });

    beforeEach(() => {
        vi.mock("next/navigation", () => ({
            useRouter: () => ({ push: mocks.mockRouterPush })
        }));
    });

    it("should contain a title.", () => {
        const { getByText } = withRender(
            <LocationGridWidget locationData={nearbyLocations} />
        );
        expect(getByText("component.widget.locationGrid.title")).toBeInTheDocument();
    });

    it("should contain a subtitle.", () => {
        const { getByText } = withRender(
            <LocationGridWidget locationData={nearbyLocations} />
        );
        expect(getByText("component.widget.locationGrid.description")).toBeInTheDocument();
    });

    it("should contains a list of locations.", () => {
        const { getByText } = withRender(
            <LocationGridWidget locationData={nearbyLocations} />
        );
        expect(getByText("mockName")).toBeInTheDocument();
        expect(getByText("mockName2")).toBeInTheDocument();
    });

    it("clicking a location should redirect to weather page.",
        async () => {
            mocks.mockRouterPush.mockResolvedValue(true);
            const user = userEvent.setup();
            const { getByText } = withRender(
                <LocationGridWidget locationData={nearbyLocations} />
            );

            await user.click(getByText("mockName"));
            expect(mocks.mockRouterPush)
                .toHaveBeenCalledWith("/weather/mockName mockState, mockCountry");
        });

    it("should return null if no data is provided.", () => {
        const { container } = withRender(
            <LocationGridWidget locationData={undefined} />
        );

        expect(container.firstChild).toBeNull();
    });
});
