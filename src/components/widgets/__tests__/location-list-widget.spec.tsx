import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { testWrapper } from "@utils/wrappers";
import { NearbyLocations } from "@features/weaget/nearby-location.types";
import LocationListWidget from "@components/widgets/location-list-widget";

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
        const { getByText } = render(
            <LocationListWidget locations={nearbyLocations} />,
            { wrapper: testWrapper }
        );
        expect(getByText("Suggested Locations")).toBeInTheDocument();
    });

    it("should contains a list of locations.", () => {
        const { getByText } = render(
            <LocationListWidget locations={nearbyLocations} />,
            { wrapper: testWrapper }
        );
        expect(getByText("mockName, mockState")).toBeInTheDocument();
        expect(getByText("mockName2, mockState2")).toBeInTheDocument();
    });

    it("locations should have a href that redirects to the weather page.",
        () => {
            mocks.mockRouterPush.mockResolvedValue(true);
            const { getAllByRole } = render(
                <LocationListWidget locations={nearbyLocations} />,
                { wrapper: testWrapper }
            );

            expect(getAllByRole("link")[0]).toHaveAttribute("href", "/weather/mockName%20mockState,%20mockCountry");
        });

    it("should return a skeleton if no data is provided.", () => {
        const { getAllByTestId } = render(
            <LocationListWidget locations={undefined} />,
            { wrapper: testWrapper }
        );

        expect(getAllByTestId("location-card-skeleton")).not.toHaveLength(0);
    });

    it("should diplay an appropriate message when no nearby location exists.",
        () => {
            const { getByText } = render(
                <LocationListWidget locations={[]} />,
                { wrapper: testWrapper }
            );

            expect(getByText("No nearby places found...")).toBeInTheDocument();
        });
});
