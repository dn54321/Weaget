import { beforeAll, describe, expect, it } from "vitest";
import { createWeatherMockData } from "@features/weaget/__mocks__/weather.mock";
import { withRender } from "@utils/wrappers";
import { OneCallWeatherDetails } from "@features/open-weather-map-one-call/oneCall.type";
import { DailyCompactWeatherWidget } from "./..";

describe("Component: daily-compact-weather-widget", () => {
    let weatherData: OneCallWeatherDetails;
    beforeAll(() => {
        weatherData = createWeatherMockData();
    });

    it("should contain a title.", () => {
        const { getByText } = withRender(
            <DailyCompactWeatherWidget weatherData={weatherData} location="testLocation" />,
        );
        expect(getByText("Compact Weather Widget")).toBeInTheDocument();
    });

    it("should contain a subtitle.", () => {
        const { getByText } = withRender(
            <DailyCompactWeatherWidget weatherData={weatherData} location="testLocation" />,
        );
        expect(getByText("Currently Weekly Weather")).toBeInTheDocument();
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
        expect(getByText("Get More Weather Details")).toHaveAttribute("href", "/weather/testLocation");
    });

    it("should should return null if no data is provided.", () => {
        const { container } = withRender(
            <DailyCompactWeatherWidget weatherData={undefined} location="testLocation" />,
        );
        expect(container.firstChild).toBeNull();
    });
});
