import { afterEach, beforeAll, describe, expect, it } from "vitest";
import WeatherDisplayWidget from "@components/widgets/weather-display-widget";
import { OneCallWeatherDetails } from "@features/open-weather-map-one-call/oneCall.type";
import { createWeatherMockData } from "@features/weaget/__mocks__/weather.mock";
import { render, renderHook } from "@testing-library/react";
import { testWrapper } from "@utils/wrappers";
import { testQueryClient } from "@utils/query-client";
import { useSettingStore } from "@src/hooks/stores/use-setting-store";
import { TemperatureScale } from "@src/types/weather.types";
import { useWidgetStore } from "@src/hooks/stores/use-widget-store";
describe("Component: weather-display-widget", async () => {
    let weatherData: OneCallWeatherDetails;
    beforeAll(() => {
        weatherData = createWeatherMockData();
    });

    afterEach(() => {
        testQueryClient.clear();
    });

    it("should contain the location.", () => {
        const { getByText } = render(
            <WeatherDisplayWidget weatherData={weatherData} location="testLocation" />,
            { wrapper: testWrapper }
        );
        expect(getByText("testLocation")).toBeInTheDocument();
    });

    it.each([
        [200], [300], [500], [600], [700], [800], [801], [802], [803], [804], [-1],
    ])("should contain the weather details for %d.", (weatherId: number) => {
        const { result } = renderHook(() => useSettingStore());
        result.current.setTemperatureScale(TemperatureScale.CELSIUS);
        const { getByText } = render(
            <WeatherDisplayWidget
                location="testLocation"
                weatherData={{
                    ...weatherData,
                    current: {
                        ...weatherData.current!,
                        temp: 293.15,
                        feelsLike: 300.15,
                        weather: [
                            {
                                description: "testDescription",
                                icon: "5d",
                                id: weatherId,
                                main: "testMain",
                            },
                        ],
                    },
                }}
            />,
            { wrapper: testWrapper }
        );
        expect(getByText("20°C")).toBeInTheDocument();
        expect(getByText("Feels like 27°")).toBeInTheDocument();
        expect(getByText("testDescription")).toBeInTheDocument();
    });

    it("should contain the active details of the widget store.", () => {
        const { result: settingHook } = renderHook(() => useSettingStore());
        const { result: widgetHook } = renderHook(() => useWidgetStore());
        settingHook.current.setTemperatureScale(TemperatureScale.CELSIUS);
        widgetHook.current.setFocusedWeather({
            ...weatherData.daily![0],
            temp: {
                min: 293.15,
                max: 294.15,
                day: 0,
                night: 0,
                eve: 0,
                morn: 0,
            },
            weather: [{
                description: "testDescription",
                icon: "5d",
                id: 200,
                main: "testMain",
            }],
        });
        const { getByText } = render(
            <WeatherDisplayWidget location="testLocation" weatherData={weatherData} />,
            { wrapper: testWrapper }
        );
        expect(getByText("20°")).toBeInTheDocument();
        expect(getByText("21°")).toBeInTheDocument();
        expect(getByText("testDescription")).toBeInTheDocument();
    });

    it("should display a loading message when data is being fetched.", () => {
        const { getByText } = render(
            <WeatherDisplayWidget weatherData={undefined} location={undefined} />,
            { wrapper: testWrapper }
        );
        expect(getByText("Fetching Location Details...")).toBeInTheDocument();
        expect(getByText("Updated At: Fetching Details...")).toBeInTheDocument();
    });
});
