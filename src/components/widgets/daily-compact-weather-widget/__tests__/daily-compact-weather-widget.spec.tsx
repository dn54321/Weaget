import { beforeAll, describe, expect, it } from "vitest";
import { DailyCompactWeatherWidget } from "./..";
import type { OneCallWeatherDetails } from "@features/open-weather-map-one-call/oneCall.type";
import { createWeatherMockData } from "@features/weaget/__mocks__/weather.mock";
import { withRender } from "@utils/render";

describe("Component: daily-compact-weather-widget", () => {
    let weatherData: OneCallWeatherDetails;
    beforeAll(() => {
        weatherData = createWeatherMockData();
    });

    it("should contain a title.", () => {
        const { getByText } = withRender(
            <DailyCompactWeatherWidget weatherData={weatherData} location="testLocation" />,
        );
        expect(getByText("component.widget.dailyCompactWeather.title")).toBeInTheDocument();
    });

    it("should contain a subtitle.", () => {
        const { getByText } = withRender(
            <DailyCompactWeatherWidget weatherData={weatherData} location="testLocation" />,
        );
        expect(getByText("component.widget.dailyCompactWeather.description")).toBeInTheDocument();
    });

    it("should contains a card for each day.", () => {
        const { getAllByTestId } = withRender(
            <DailyCompactWeatherWidget weatherData={weatherData} location="testLocation" />,
        );
        expect(getAllByTestId("compact-weather-card")).toHaveLength(8);
    });

    it("should contains a clickable button that takes to the weather page.", () => {
        const { getByText } = withRender(
            <DailyCompactWeatherWidget weatherData={weatherData} location="testLocation" />,
        );
        expect(getByText("component.widget.dailyCompactWeather.button")).toHaveAttribute("href", "/weather/testLocation");
    });

    it("should should return null if no data is provided.", () => {
        const { container } = withRender(
            <DailyCompactWeatherWidget weatherData={undefined} location="testLocation" />,
        );
        expect(container.firstChild).toBeNull();
    });
});
