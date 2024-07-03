import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { withRender } from "@utils/wrappers";
import { NearbyLocations } from "@features/weaget/nearby-location/nearby-location.types";
import { LocationListWidget } from "./..";
import userEvent from "@testing-library/user-event";

describe("Component: location-list-widget", async () => {
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
        const { getByText } = withRender(
            <LocationListWidget locationData={nearbyLocations} />,
        );
        expect(getByText("Suggested Locations")).toBeInTheDocument();
    });

    it("should contains a list of locations.", () => {
        const { getByText } = withRender(
            <LocationListWidget locationData={nearbyLocations} />,
        );
        expect(getByText("mockName, mockState")).toBeInTheDocument();
        expect(getByText("mockName2, mockState2")).toBeInTheDocument();
    });

    it("locations should have a href that redirects to the weather page.",
        async () => {
            const user = userEvent.setup();
            mocks.mockRouterPush.mockResolvedValue(true);
            const { getByText } = withRender(
                <LocationListWidget locationData={nearbyLocations} />,
            );

            await user.click(getByText("mockName, mockState"));
            expect(mocks.mockRouterPush).toHaveBeenCalledWith("/weather/mockName%20mockState,%20mockCountry");
        });

    it("should return a skeleton if no data is provided.", () => {
        const { getAllByTestId } = withRender(
            <LocationListWidget locationData={undefined} />,
        );

        expect(getAllByTestId("location-card-skeleton")).not.toHaveLength(0);
    });

    it("should diplay an appropriate message when no nearby location exists.",
        () => {
            const { getByText } = withRender(
                <LocationListWidget locationData={[]} />,
            );

            expect(getByText("No nearby places found...")).toBeInTheDocument();
        });
});
