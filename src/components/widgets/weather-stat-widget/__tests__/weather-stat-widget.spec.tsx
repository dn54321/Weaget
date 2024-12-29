import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { DateTime } from "luxon";
import { HourlyWeatherStripWidget } from "@components/widgets/hourly-weather-strip-widget";
import { MeasurementScale } from "@src/types/measurement.types";
import { OneCallWeatherDetails } from "@features/open-weather-map-one-call/oneCall.type";
import { TemperatureScale } from "@src/types/weather.types";
import WeatherStatWidget from "@components/widgets/weather-stat-widget/weather-stat-widget";
import { createWeatherMockData } from "@features/weaget/__mocks__/weather.mock";
import { testQueryClient } from "@utils/query-client";
import { withRender } from "@utils/render";

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
        expect(getByText("component.widget.hourlyWeatherStrip.title")).toBeInTheDocument();
    });

    it("should display current weather stats.", async () => {
        const datetime = DateTime.local(2023, 1, 1, { zone: weatherData.timezone });
        const settings = {
            measurementScale: MeasurementScale.METRIC,
            temperatureScale: TemperatureScale.CELSIUS,
        };
        const { getByText } = withRender(
            <WeatherStatWidget weatherData={{
                ...weatherData,
                current: {
                    ...weatherData.current!,
                    dewPoint: 293.15,
                    dt: datetime.toJSDate(),
                    humidity: 92,
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
