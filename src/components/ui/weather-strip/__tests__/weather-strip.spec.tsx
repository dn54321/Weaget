import BugReportIcon from "@mui/icons-material/BugReport";
import userEvent from "@testing-library/user-event";
import { withRender } from "@utils/render";
import { DateTime } from "luxon";
import { beforeAll, describe, expect, it, vi } from "vitest";

import { WeatherStrip, WeatherStripProps } from "./..";
describe("Component: weather-strip", async () => {
    let weatherStripProps: WeatherStripProps;
    beforeAll(() => {
        const date = DateTime.local(2023, 1, 2, 3, { zone: "Australia/Sydney" });
        weatherStripProps = {
            date: date.toJSDate(),
            rainPercentage: 0.16,
            stats: [
                {
                    compactValue: "mockCompactValue",
                    name: "mockName",
                    statIcon: <BugReportIcon />,
                    unit: "mm",
                    value: "mockValue"
                },
                {
                    name: "nonCompact",
                    statIcon: <BugReportIcon />,
                    unit: "gg",
                    value: "nonCompactValue"
                },
                {
                    compactValue: "",
                    name: "mockInvisible",
                    statIcon: <BugReportIcon />,
                    unit: "ff",
                    value: ""
                }
            ],
            temperature: 293.15,
            timezone: "Australia/Sydney",
            weatherCode: 200,
            weatherDescription: "mockWeatherDescription"
        };
    });

    it.each([
        ["time", "3 am"],
        ["day", "Monday"],
        ["temperature", "20°"],
        ["rain percentage", "16%"],
        ["weather description", "mockWeatherDescription"],
        ["stat value", "mockCompactValuemm"],
        ["non-compact value", "nonCompactValuegg"]
    ])("should display the %s on the accordion summary.", (
        _: string,
        value: string
    ) => {
        const { getByText } = withRender(<WeatherStrip {...weatherStripProps} />);
        expect(getByText(value)).toBeInTheDocument();
    });

    it("should be openable/closable, displaying additional stats.", async () => {
        const user = userEvent.setup();
        const { getByRole, getByText } = withRender(<WeatherStrip {...weatherStripProps} />);
        const button = getByRole("button");
        await user.click(button);
        expect(getByText("component.weatherStrip.hourlyWeatherStats")).toBeInTheDocument();
        expect(getByText("mockName")).toBeInTheDocument();
        expect(getByText("mockValuemm")).toBeInTheDocument();
        await user.click(button);
        expect(() => getByText("Hourly Weather Stats")).toThrow();
        expect(() => getByText("mockName")).toThrow();
        expect(() => getByText("mockValuemm")).toThrow();
    });

    it("should not display any stats that don't have values.", () => {
        const { getByText } = withRender(<WeatherStrip {...weatherStripProps} />);
        expect(() => getByText("ff")).toThrow();
    });

    it.each([
        ["open", true],
        ["closed", false]
    ])("should initially be %s if expanded prop is %o ", (_, isExpanded: boolean) => {
        const view = withRender(<WeatherStrip {...weatherStripProps} expanded={isExpanded} />);
        expect(view.getByRole("button", { expanded: isExpanded })).toBeInTheDocument();
    });

    it("should call the setExpanded function if setExpanded prop is supplied", async () => {
        const user = userEvent.setup();
        const mockSetExpanded = vi.fn();
        const view = withRender(<WeatherStrip {...weatherStripProps} setExpanded={mockSetExpanded} />);
        const button = view.getByRole("button");
        await user.click(button);
        expect(mockSetExpanded).toHaveBeenCalled();
    });
});
