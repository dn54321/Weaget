import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { OneCallWeatherDetails } from "@features/open-weather-map-one-call/oneCall.type";
import { createWeatherMockData } from "@features/weaget/__mocks__/weather.mock";
import { withRender } from "@utils/render";
import { testQueryClient } from "@utils/query-client";
import { DateTime } from "luxon";
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
        const { getByText } = withRender(
            <HourlyWeatherStripWidget weatherData={weatherData} />,
        );
        expect(getByText("Hourly Weather Details")).toBeInTheDocument();
    });

    it("should display current weather stats.", async () => {
        const datetime = DateTime.local(2023, 1, 1, { zone: weatherData.timezone });
        const settings = {
            temperatureScale: TemperatureScale.CELSIUS,
            measurementScale: MeasurementScale.METRIC,
        };
        const { getByText } = withRender(
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
            { settings },
        );

        expect(getByText("Jan 1, 2023")).toBeInTheDocument();
        expect(getByText("92%")).toBeInTheDocument();
        expect(getByText("20°")).toBeInTheDocument();
    });

    it("should display a skeleton while the data is loading.", async () => {
        const { getByTestId } = withRender(
            <WeatherStatWidget weatherData={undefined} />,
        );

        expect(getByTestId("weather-stats-skeleton")).toBeInTheDocument();
    });
});
