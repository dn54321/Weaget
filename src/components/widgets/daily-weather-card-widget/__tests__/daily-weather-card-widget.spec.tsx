import { OneCallWeatherDetails } from "@src/apis/open-weather-map/one-call/one-call.type";
import { createWeatherMockData } from "@src/apis/weaget/weather/__mocks__/weather.mock";
import userEvent from "@testing-library/user-event";
import { testQueryClient } from "@utils/query-client";
import { withRender } from "@utils/render";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

import { DailyWeatherCardWidget } from "./..";

describe("Component: daily-weather-card-widget", async () => {
    let weatherData: OneCallWeatherDetails;
    beforeAll(() => {
        weatherData = createWeatherMockData();
    });
    afterEach(() => {
        testQueryClient.clear();
    });

    it("should contain a title.", () => {
        const { getByText } = withRender(
            <DailyWeatherCardWidget weatherData={weatherData} />
        );
        expect(getByText("component.widget.dailyWeatherCard.title")).toBeInTheDocument();
    });

    it("should contain a subtitle.", () => {
        const { getByText } = withRender(
            <DailyWeatherCardWidget weatherData={weatherData} />
        );
        expect(getByText("component.widget.dailyWeatherCard.description")).toBeInTheDocument();
    });

    it("should contains a card for each day.", () => {
        const { getAllByTestId } = withRender(
            <DailyWeatherCardWidget weatherData={weatherData} />
        );
        expect(getAllByTestId("weather-card")).toHaveLength(8);
    });

    it("should set the weather in the widget store as active if a card is hovered.",
        async () => {
            const user = userEvent.setup();
            const widgetProbe = vi.fn();
            const { getAllByTestId } = withRender(
                <DailyWeatherCardWidget weatherData={weatherData} />,
                { probes: { widget: widgetProbe } }
            );

            await user.hover(getAllByTestId("weather-card")[0]);
            expect(widgetProbe.mock.lastCall?.[0]).toMatchObject({ focusedWeather: weatherData.daily?.[0] });
        });

    it("should set the weather in the widget store as active if a card is clicked.", async () => {
        const user = userEvent.setup();
        const widgetProbe = vi.fn();
        const { getAllByRole } = withRender(
            <DailyWeatherCardWidget weatherData={weatherData} />,
            { probes: { widget: widgetProbe } }
        );
        await user.click(getAllByRole("listitem")[0]);
        await user.unhover(getAllByRole("listitem")[0]);
        expect(weatherData.daily?.[0]).toBeDefined();
        expect(widgetProbe.mock.lastCall?.[0]).toMatchObject({ focusedWeather: weatherData.daily?.[0] });
    });

    it("should set the hovered weather card as active regardless of what card is active.",
        async () => {
            const user = userEvent.setup();
            const widgetProbe = vi.fn();
            const { getAllByRole } = withRender(
                <DailyWeatherCardWidget weatherData={weatherData} />,
                { probes: { widget: widgetProbe } }
            );

            await user.click(getAllByRole("listitem")[0]);
            expect(widgetProbe.mock.lastCall?.[0]).toMatchObject({ focusedWeather: weatherData.daily?.[0] });

            await user.hover(getAllByRole("listitem")[1]);
            expect(widgetProbe.mock.lastCall?.[0]).toMatchObject({ focusedWeather: weatherData.daily?.[1] });
        });

    it("should unactivate an active weather card if clicked again.", async () => {
        const user = userEvent.setup();
        const widgetProbe = vi.fn();
        const { getAllByRole, getByText } = withRender(
            <DailyWeatherCardWidget weatherData={weatherData} />,
            { probes: { widget: widgetProbe } }
        );

        await user.click(getAllByRole("listitem")[0]);
        expect(widgetProbe.mock.lastCall?.[0]).toMatchObject({ focusedWeather: weatherData.daily?.[0] });

        await user.click(getAllByRole("listitem")[0]);
        await user.hover(getByText("component.widget.dailyWeatherCard.title"));
        expect(widgetProbe.mock.lastCall?.[0]).not.toMatchObject({ focusedWeather: weatherData.daily?.[0] });
    });

    it("should return a skeleton if no data is provided.", () => {
        const { getAllByTestId } = withRender(
            <DailyWeatherCardWidget weatherData={undefined} />
        );
        expect(getAllByTestId("weather-card-skeleton")).toHaveLength(8);
    });
});
