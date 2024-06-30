import BugReportIcon from "@mui/icons-material/BugReport";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HourlyWeatherDetails } from "@features/open-weather-map-one-call/oneCall.type";
import { createWeatherHourlyMockData, createWeatherDailyMockData, createWeatherCurrentMockData } from "@features/weaget/__mocks__/weather.mock";
import { WeatherStatsCard } from "./..";
import { UVWarning, parseWeatherDetailStats } from "@components/cards/weather-stats-card/weather-stats-card.utils";
import { withTestWrapper } from "@utils/wrappers";

describe("Component: Weather Stats Card", () => {
    it("should render be able to render a stat.", () => {
        const { getByText, getByLabelText } = render(
            withTestWrapper(
                <WeatherStatsCard stats={[
                    {
                        name: "mockStat",
                        value: 20,
                        compactValue: "mock-compact",
                        unit: "mm",
                        statIcon: <BugReportIcon aria-label="test-icon" />,
                    },
                ]}
                />
            )
        );
        expect(getByText("mockStat")).toBeInTheDocument();
        expect(getByText("20mm")).toBeInTheDocument();
        expect(getByLabelText("test-icon")).toBeInTheDocument();
    });

    it("should render be able to render a stat without unit.", () => {
        const { getByText, getByLabelText } = render(
            withTestWrapper(
                <WeatherStatsCard stats={[
                    {
                        name: "mockStat",
                        value: 20,
                        compactValue: "mock-compact",
                        statIcon: <BugReportIcon aria-label="test-icon" />,
                    },
                ]}
                />
            )
        );

        expect(getByText("mockStat")).toBeInTheDocument();
        expect(getByText("20")).toBeInTheDocument();
        expect(getByLabelText("test-icon")).toBeInTheDocument();
    });

    it("should not render a stat without a value.", () => {
        const { getByText, getByLabelText } = render(
            withTestWrapper(
                <WeatherStatsCard stats={[
                    {
                        name: "mockStat",
                        value: undefined,
                        compactValue: undefined,
                        statIcon: <BugReportIcon aria-label="test-icon" />,
                    },
                ]}
                />
            )
        );

        expect(() => getByText("mockStat")).toThrow();
    });

    describe("UVWarning", () => {
        it.each([
            [undefined, undefined],
            [1, "Low (1)"],
            [3, "Moderate (3)"],
            [6, "High (6)"],
            [8, "Very High (8)"],
            [11, "Extreme (11)"],
        ])("UV Index of %d should output warning \"%s\"",
            (uvIndex: number, expectedText: string) => {
                expect(UVWarning(uvIndex)).toBe(expectedText);
            });
    });

    describe("parseWeatherDetailStats", () => {
        it.each([
            ["hourly weather w/ rain", createWeatherHourlyMockData()],
            ["hourly weather w/ snow hour", { ...createWeatherHourlyMockData(), snow: { "1h": 1 } }],
            ["hourly weather w/ snow", { ...createWeatherHourlyMockData(), snow: 1 }],
            ["daily weather", createWeatherDailyMockData()],
            ["current weather", createWeatherCurrentMockData()],
            ["empty object", {}],
        ])("should be able to parse %s.", (
            _: string,
            data: object
        ) => {
            expect(() => parseWeatherDetailStats(data as HourlyWeatherDetails, "Australia/Sydney")).not.toThrow();
        });
    });
});
