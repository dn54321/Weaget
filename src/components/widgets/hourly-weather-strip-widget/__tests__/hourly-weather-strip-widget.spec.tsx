import { beforeAll, describe, expect, it } from "vitest";
import { HourlyWeatherStripWidget } from "./..";
import type { OneCallWeatherDetails } from "@features/open-weather-map-one-call/oneCall.type";
import { createWeatherMockData } from "@features/weaget/__mocks__/weather.mock";
import userEvent from "@testing-library/user-event";
import { withRender } from "@utils/render";

describe("Component: hourly-weather-card-widget", async () => {
    let weatherData: OneCallWeatherDetails;
    beforeAll(() => {
        weatherData = createWeatherMockData();
    });

    it("should contain a title.", () => {
        const { getByText } = withRender(
            <HourlyWeatherStripWidget weatherData={weatherData} />,
        );
        expect(getByText("component.widget.hourlyWeatherStrip.title")).toBeInTheDocument();
    });

    it("should contains a total of 12 weather strips.", () => {
        const { getAllByTestId } = withRender(
            <HourlyWeatherStripWidget weatherData={weatherData} />,
        );
        expect(getAllByTestId("weather-strip")).toHaveLength(12);
    });

    it("should be expandable.", async () => {
        const user = userEvent.setup();
        const { getAllByTestId, getByRole } = withRender(
            <HourlyWeatherStripWidget weatherData={weatherData} />,
        );

        const accordion = getAllByTestId("ExpandMoreIcon")[0];
        await user.click(accordion);
        expect(getByRole("button", { expanded: true })).toBeInTheDocument();
        await user.click(accordion);
        expect(() => getByRole("button", { expanded: true })).toThrow();
    });

    it("should show another 12 weather strips when going to the next page.",
        async () => {
            const user = userEvent.setup();
            const { getAllByTestId, getByLabelText } = withRender(
                <HourlyWeatherStripWidget weatherData={weatherData} />,
            );
            const weatherStripPage1 = getAllByTestId("weather-strip");
            await user.click(getByLabelText("Go to next page"));
            const weatherStripPage2 = getAllByTestId("weather-strip");
            expect(weatherStripPage1).not.toBe(weatherStripPage2);
            expect(getAllByTestId("weather-strip")).toHaveLength(12);
            expect(weatherStripPage1[0]).not.toEqual(weatherStripPage2[0]);
        });

    it("should return a skeleton if no data is provided.", () => {
        const { getAllByTestId } = withRender(
            <HourlyWeatherStripWidget weatherData={undefined} />,
        );
        expect(getAllByTestId("weather-stat-skeleton")).toHaveLength(12);
    });
});
