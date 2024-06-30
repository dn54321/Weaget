import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { OneCallWeatherDetails } from "@features/open-weather-map-one-call/oneCall.type";
import { createWeatherMockData } from "@features/weaget/__mocks__/weather.mock";
import { render, renderHook } from "@testing-library/react";
import { testWrapper } from "@utils/wrappers";
import { testQueryClient } from "@utils/query-client";
import { DateTime } from "luxon";
import { useSettingStore } from "@src/hooks/stores/use-setting-store";
import { TemperatureScale } from "@src/types/weather.types";
import { MeasurementScale } from "@src/types/measurement.types";
import { HourlyWeatherStripWidget } from "@components/widgets/hourly-weather-strip-widget";
import WeatherStatWidget from "@components/widgets/weather-stat-widget/weather-stat-widget";

describe("Component: weather-stat-widget", () => {
    let weatherData: OneCallWeatherDetails;
    beforeAll(() => {
        weatherData = createWeatherMockData();
    });

    afterEach(() => {
        testQueryClient.clear();
    });

    it("should contain a title.", () => {
        const { getByText } = render(
            <HourlyWeatherStripWidget weatherData={weatherData} />,
            { wrapper: testWrapper }
        );
        expect(getByText("Hourly Weather Details")).toBeInTheDocument();
    });

    it("should display current weather stats.", async () => {
        const { result: settingHook } = renderHook(() => useSettingStore());
        settingHook.current.setTemperatureScale(TemperatureScale.CELSIUS);
        settingHook.current.setMeasurementScale(MeasurementScale.METRIC);
        const datetime = DateTime.local(2023, 1, 1, { zone: weatherData.timezone });
        const { getByText } = render(
            <WeatherStatWidget weatherData={{
                ...weatherData,
                current: {
                    ...weatherData.current!,
                    dt: datetime.toJSDate(),
                    humidity: 92,
                    dewPoint: 293.15,
                },
            }}
            />,
            { wrapper: testWrapper }
        );

        expect(getByText("Jan 1, 2023")).toBeInTheDocument();
        expect(getByText("92%")).toBeInTheDocument();
        expect(getByText("20°")).toBeInTheDocument();
    });

    it("should display a skeleton while the data is loading.", async () => {
        const { getByTestId } = render(
            <WeatherStatWidget weatherData={undefined} />,
            { wrapper: testWrapper }
        );

        expect(getByTestId("weather-details-skeleton")).toBeInTheDocument();
    });
});
