import { beforeAll, describe, expect, it } from "vitest";
import { Pollution } from "@features/apicn-pollution/pollution.types";
import { PollutionWidget } from "./..";
import { createApicnPollutionResultMockData } from "@features/apicn-pollution/__mocks__/pollution.mock";
import userEvent from "@testing-library/user-event";
import { withRender } from "@utils/render";

describe("Component: pollution-widget", async () => {
    let pollutionData: Pollution;
    beforeAll(() => {
        pollutionData = createApicnPollutionResultMockData();
    });

    it("should contain a title.", () => {
        const { getByText } = withRender(
            <PollutionWidget pollutionData={pollutionData} />,
        );
        expect(getByText("component.widget.pollution.title")).toBeInTheDocument();
    });

    it.each(
        [
            ["component.widget.pollution.pollutionLevel.good", 10],
            ["component.widget.pollution.pollutionLevel.moderate", 60],
            ["component.widget.pollution.pollutionLevel.unhealthySensitive", 110],
            ["component.widget.pollution.pollutionLevel.unhealthy", 160],
            ["component.widget.pollution.pollutionLevel.veryUnhealthy", 210],
            ["component.widget.pollution.pollutionLevel.hazardous", 310],
        ],
    )("should display '%s' air quality index when aqi is %d.", (
        quality: string,
        aqi: number,
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
        const openButton = getByText("component.widget.pollution.showAdvancedPollutionDetails");
        await user.click(openButton);
        expect(getAllByRole("row")).not.toHaveLength(0);
        const closeButton = getByText("component.widget.pollution.hideAdvancedPollutionDetails");
        await user.click(closeButton);
        expect(() => getAllByRole("row")).toThrow();
    });

    it("should show skeleton when pollution data is loading.", () => {
        const { getByText } = withRender(
            <PollutionWidget pollutionData={undefined} />,
        );

        expect(getByText("component.widget.pollution.loading")).toBeInTheDocument();
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

        const openButton = getByText("component.widget.pollution.showAdvancedPollutionDetails");
        await user.click(openButton);
        expect(getAllByRole("row")).not.toHaveLength(0);
    });
});
