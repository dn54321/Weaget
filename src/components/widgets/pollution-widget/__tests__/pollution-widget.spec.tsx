import { beforeAll, describe, expect, it } from "vitest";
import { Pollution } from "@features/apicn-pollution/pollution.types";
import { createApicnPollutionResultMockData } from "@features/apicn-pollution/__mocks__/pollution.mock";
import userEvent from "@testing-library/user-event";
import { PollutionWidget } from "./..";
import { withRender } from "@utils/wrappers";

describe("Component: pollution-widget", async () => {
    let pollutionData: Pollution;
    beforeAll(() => {
        pollutionData = createApicnPollutionResultMockData();
    });

    it("should contain a title.", () => {
        const { getByText } = withRender(
            <PollutionWidget pollutionData={pollutionData} />,
        );
        expect(getByText("Pollution Level")).toBeInTheDocument();
    });

    it.each(
        [
            ["Good", 10],
            ["Moderate", 60],
            ["Unhealthy for sensitive groups", 110],
            ["Unhealthy", 160],
            ["Very Unhealthy", 210],
            ["Hazardous", 310],
        ]
    )("should display '%s' air quality index when aqi is %d.", (
        quality: string,
        aqi: number
    ) => {
        const { getByText } = withRender(
            <PollutionWidget pollutionData={{
                ...pollutionData,
                aqi,
            }}
            />,
        );

        expect(getByText(quality)).toBeInTheDocument();
        expect(getByText(aqi)).toBeInTheDocument();
    });

    it("should have a button that shows more pollution stats.", async () => {
        const user = userEvent.setup();
        const { getByText, getAllByRole } = withRender(
            <PollutionWidget pollutionData={pollutionData} />,
        );
        const openButton = getByText("Show Advanced Pollution Details");
        await user.click(openButton);
        expect(getAllByRole("row")).not.toHaveLength(0);
        const closeButton = getByText("Hide Advanced Pollution Details");
        await user.click(closeButton);
        expect(() => getAllByRole("row")).toThrow();
    });

    it("should show skeleton when pollution data is loading.", () => {
        const user = userEvent.setup();
        const { getByText } = withRender(
            <PollutionWidget pollutionData={undefined} />,
        );

        expect(getByText("Loading Pollution Details...")).toBeInTheDocument();
    });

    it("should work even if there is missing pollution data.", async () => {
        const user = userEvent.setup();
        const { getAllByRole, getByText } = withRender(
            <PollutionWidget pollutionData={{
                ...pollutionData,
                iaqi: {},
            }}
            />,
        );

        const openButton = getByText("Show Advanced Pollution Details");
        await user.click(openButton);
        expect(getAllByRole("row")).not.toHaveLength(0);
    });
});
