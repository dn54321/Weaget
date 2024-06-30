import { beforeAll, describe, expect, it } from "vitest";
import { createWeatherMockData } from "@features/weaget/__mocks__/weather.mock";
import { render } from "@testing-library/react";
import { testWrapper } from "@utils/wrappers";
import { OneCallWeatherDetails } from "@features/open-weather-map-one-call/oneCall.type";
import { DailyCompactWeatherWidget } from "@components/widgets/daily-compact-weather-widget";

describe("Component: daily-compact-weather-widget", () => {
    let weatherData: OneCallWeatherDetails;
    beforeAll(() => {
        weatherData = createWeatherMockData();
    });

    it("should contain a title.", () => {
        const { getByText } = render(
            <DailyCompactWeatherWidget weatherData={weatherData} location="testLocation" />,
            { wrapper: testWrapper }
        );
        expect(getByText("Compact Weather Widget")).toBeInTheDocument();
    });

    it("should contain a subtitle.", () => {
        const { getByText } = render(
            <DailyCompactWeatherWidget weatherData={weatherData} location="testLocation" />,
            { wrapper: testWrapper }
        );
        expect(getByText("Currently Weekly Weather")).toBeInTheDocument();
    });

    it("should contains a card for each day.", () => {
        const { getAllByTestId } = render(
            <DailyCompactWeatherWidget weatherData={weatherData} location="testLocation" />,
            { wrapper: testWrapper }
        );
        expect(getAllByTestId("compact-weather-card")).toHaveLength(8);
    });

    it("should contains a clickable button that takes to the weather page.", () => {
        const { getByText } = render(
            <DailyCompactWeatherWidget weatherData={weatherData} location="testLocation" />,
            { wrapper: testWrapper }
        );
        expect(getByText("Get More Weather Details")).toHaveAttribute("href", "/weather/testLocation");
    });

    it("should should return null if no data is provided.", () => {
        const { container } = render(
            <DailyCompactWeatherWidget weatherData={undefined} location="testLocation" />,
            { wrapper: testWrapper }
        );
        expect(container.firstChild).toBeNull();
    });
});
