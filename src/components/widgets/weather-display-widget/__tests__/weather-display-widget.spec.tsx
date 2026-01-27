import { OneCallWeatherDetails } from "@src/apis/open-weather-map/one-call/one-call.type";
import { createWeatherMockData } from "@src/apis/weaget/weather/__mocks__/weather.mock";
import { TemperatureScale } from "@src/types/weather.types";
import { testQueryClient } from "@utils/query-client";
import { withRender } from "@utils/render";
import { afterEach, beforeAll, describe, expect, it } from "vitest";

import { WeatherDisplayWidget } from "./..";
describe("Component: weather-display-widget", async () => {
    let weatherData: OneCallWeatherDetails;
    beforeAll(() => {
        weatherData = createWeatherMockData();
    });

    afterEach(() => {
        testQueryClient.clear();
    });

    it("should contain the location.", () => {
        const { getByText } = withRender(
            <WeatherDisplayWidget location="testLocation" weatherData={weatherData} />
        );
        expect(getByText("testLocation")).toBeInTheDocument();
    });

    it.each([
        [200], [300], [500], [600], [700], [800], [801], [802], [803], [804], [-1]
    ])("should contain the weather details for %d.", (weatherId: number) => {
        const settings = { temperatureScale: TemperatureScale.CELSIUS };
        const { getByText } = withRender(
            <WeatherDisplayWidget
                location="testLocation"
                weatherData={{
                    ...weatherData,
                    current: {
                        ...weatherData.current!,
                        feelsLike: 300.15,
                        temp: 293.15,
                        weather: [
                            {
                                description: "testDescription",
                                icon: "5d",
                                id: weatherId,
                                main: "testMain"
                            }
                        ]
                    }
                }}
            />,
            { settings }
        );
        expect(getByText("20°")).toBeInTheDocument();
        expect(getByText("component.widget.weatherDisplay.feelsLike 27°")).toBeInTheDocument();
        expect(getByText("testDescription")).toBeInTheDocument();
    });

    it("should contain the active details of the widget store.", () => {
        const widgetState = { focusedWeather: {
            ...weatherData.daily![0],
            temp: {
                day: 0,
                eve: 0,
                max: 294.15,
                min: 293.15,
                morn: 0,
                night: 0
            },
            weather: [{
                description: "testDescription",
                icon: "5d",
                id: 200,
                main: "testMain"
            }]
        } };
        const settings = { temperatureScale: TemperatureScale.CELSIUS };
        const { getByText } = withRender(
            <WeatherDisplayWidget location="testLocation" weatherData={weatherData} />,
            { settings, widgetState }
        );
        expect(getByText("20°")).toBeInTheDocument();
        expect(getByText("21°")).toBeInTheDocument();
        expect(getByText("testDescription")).toBeInTheDocument();
    });

    it("should display a loading message when data is being fetched.", () => {
        const { getByText } = withRender(
            <WeatherDisplayWidget location={undefined} weatherData={undefined} />
        );
        expect(getByText("component.widget.weatherDisplay.fetchingLocationDetails")).toBeInTheDocument();
        expect(getByText("component.widget.weatherDisplay.updatedAt: component.widget.weatherDisplay.fetchingDetails")).toBeInTheDocument();
    });
});
