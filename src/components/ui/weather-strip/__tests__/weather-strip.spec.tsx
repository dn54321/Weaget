import { beforeAll, describe, expect, it, vi } from "vitest";
import { DateTime } from "luxon";
import BugReportIcon from "@mui/icons-material/BugReport";
import userEvent from "@testing-library/user-event";
import { WeatherStrip, WeatherStripProps } from "./..";
import { withRender } from "@utils/render";
describe("Component: weather-strip", async () => {
    let weatherStripProps: WeatherStripProps;
    beforeAll(() => {
        const date = DateTime.local(2023, 1, 2, 3, { zone: "Australia/Sydney" });
        weatherStripProps = {
            date: date.toJSDate(),
            timezone: "Australia/Sydney",
            weatherCode: 200,
            weatherDescription: "mockWeatherDescription",
            temperature: 293.15,
            rainPercentage: 0.16,
            stats: [
                {
                    name: "mockName",
                    value: "mockValue",
                    statIcon: <BugReportIcon />,
                    compactValue: "mockCompactValue",
                    unit: "mm",
                },
                {
                    name: "nonCompact",
                    value: "nonCompactValue",
                    statIcon: <BugReportIcon />,
                    unit: "gg",
                },
                {
                    name: "mockInvisible",
                    value: "",
                    statIcon: <BugReportIcon />,
                    compactValue: "",
                    unit: "ff",
                },
            ],
        };
    });

    it.each([
        ["time", "3am"],
        ["day", "Monday"],
        ["temperature", "20°"],
        ["rain percentage", "16%"],
        ["weather description", "mockWeatherDescription"],
        ["stat value", "mockCompactValuemm"],
        ["non-compact value", "nonCompactValuegg"],
    ])("should display the %s on the accordion summary.", (
        _: string,
        value: string,
    ) => {
        const { getByText } = withRender(<WeatherStrip {...weatherStripProps} />);
        expect(getByText(value)).toBeInTheDocument();
    });

    it("should be openable/closable, displaying additional stats.", async () => {
        const user = userEvent.setup();
        const { getByText, getByRole } = withRender(<WeatherStrip {...weatherStripProps} />);
        const button = getByRole("button");
        await user.click(button);
        expect(getByText("Hourly Weather Stats")).toBeInTheDocument();
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
        ["closed", false],
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
