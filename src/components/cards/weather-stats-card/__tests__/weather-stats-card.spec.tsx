import { createWeatherCurrentMockData, createWeatherDailyMockData, createWeatherHourlyMockData } from "@features/weaget/__mocks__/weather.mock";
import { describe, expect, it } from "vitest";
import { getUvLevelTranslationKey, parseWeatherDetailStats } from "@components/cards/weather-stats-card/weather-stats-card.utils";
import BugReportIcon from "@mui/icons-material/BugReport";
import { HourlyWeatherDetails } from "@features/open-weather-map-one-call/oneCall.type";
import { WeatherStatsCard } from "./..";
import { renderHook } from "@testing-library/react";
import { testWrapper } from "@project/src/utils/wrappers";
import { useSystemTranslation } from "@project/src/hooks/use-system-translation";
import { withRender } from "@utils/render";

describe("Component: Weather Stats Card", () => {
    it("should render be able to render a stat.", () => {
        const { getByText, getByLabelText } = withRender(
            <WeatherStatsCard stats={[
                {
                    compactValue: "mock-compact",
                    name: "mockStat",
                    statIcon: <BugReportIcon aria-label="test-icon" />,
                    unit: "mm",
                    value: 20,
                },
            ]}
            />,
        );
        expect(getByText("mockStat")).toBeInTheDocument();
        expect(getByText("20mm")).toBeInTheDocument();
        expect(getByLabelText("test-icon")).toBeInTheDocument();
    });

    it("should render be able to render a stat without unit.", () => {
        const { getByText, getByLabelText } = withRender(
            <WeatherStatsCard stats={[
                {
                    compactValue: "mock-compact",
                    name: "mockStat",
                    statIcon: <BugReportIcon aria-label="test-icon" />,
                    value: 20,
                },
            ]}
            />,
        );

        expect(getByText("mockStat")).toBeInTheDocument();
        expect(getByText("20")).toBeInTheDocument();
        expect(getByLabelText("test-icon")).toBeInTheDocument();
    });

    it("should not render a stat without a value.", () => {
        const { getByText } = withRender(
            <WeatherStatsCard stats={[
                {
                    compactValue: undefined,
                    name: "mockStat",
                    statIcon: <BugReportIcon aria-label="test-icon" />,
                    value: undefined,
                },
            ]}
            />,
        );

        expect(() => getByText("mockStat")).toThrow();
    });

    describe("UVWarning", () => {
        it.each([
            [undefined, ""],
            [1, "weather.uvIndex.low"],
            [3, "weather.uvIndex.moderate"],
            [6, "weather.uvIndex.high"],
            [8, "weather.uvIndex.veryHigh"],
            [11, "weather.uvIndex.extreme"],
        ])("UV Index of %d should output warning \"%s\"",
            (uvIndex: number | undefined, expectedText: string | undefined) => {
                expect(getUvLevelTranslationKey(uvIndex)).toBe(expectedText);
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
            data: object,
        ) => {
            const { result } = renderHook(() => useSystemTranslation(), { wrapper: testWrapper });
            expect(() => parseWeatherDetailStats(
                data as HourlyWeatherDetails,
                "Australia/Sydney",
                result.current.t,
                result.current.locale,
            )).not.toThrow();
        });
    });
});
