import { afterEach, beforeAll, describe, expect, it } from "vitest"
import { createWeatherMockData } from "../../../features/weaget/__mocks__/weather.mock";
import { render, renderHook } from "@testing-library/react";
import { testWrapper } from "../../../utils/wrappers";
import { OneCallWeatherDetails } from "../../../features/open-weather-map-one-call/oneCall.type";
import userEvent from "@testing-library/user-event";
import { useWidgetStore } from "../../../hooks/stores/use-widget-store";
import DailyWeatherCardWidget from "../daily-weather-card-widget";
import { testQueryClient } from "../../../utils/query-client";

describe('Component: daily-weather-card-widget', async () => {
    let weatherData: OneCallWeatherDetails;
    beforeAll(() => {
        weatherData = createWeatherMockData();
    });
    afterEach(() => {
        testQueryClient.clear();
    })

    it('should contain a title.', () => {
        const { getByText } = render(
            <DailyWeatherCardWidget weatherData={weatherData}/>, 
            {wrapper: testWrapper}
        );
        expect(getByText("Daily Cards")).toBeInTheDocument();
    });

    it('should contain a subtitle.', () => {
        const { getByText } = render(
            <DailyWeatherCardWidget weatherData={weatherData}/>,
            {wrapper: testWrapper}        
        );
        expect(getByText("Click any card below to see more detailed description of the weather card.")).toBeInTheDocument();
    });

    it('should contains a card for each day.', () => {
        const { getAllByTestId } = render(
            <DailyWeatherCardWidget weatherData={weatherData}/>,
            {wrapper: testWrapper}        
        );
        expect(getAllByTestId('weather-card')).toHaveLength(8);
    });

    it('should set the weather in the widget store as active if a card is hovered.', 
    async () => {
        const user = userEvent.setup();
        const { result } = renderHook(() => useWidgetStore());
        const { getAllByTestId } = render(
            <DailyWeatherCardWidget weatherData={weatherData}/>,
            {wrapper: testWrapper}        
        );
        const cards = getAllByTestId('weather-card');
        await user.hover(cards[0]);
        expect(weatherData.daily?.[0]).toBeDefined();
        expect(result.current.focusedWeather).toEqual(weatherData.daily?.[0]);
    });

    it('should set the weather in the widget store as active if a card is clicked.', async () => {
        const user = userEvent.setup();
        const { result } = renderHook(() => useWidgetStore());
        const { getAllByTestId } = render(
            <DailyWeatherCardWidget weatherData={weatherData}/>,
            {wrapper: testWrapper}        
        );
        const cards = getAllByTestId('weather-card');
        await user.click(cards[0]);
        await user.unhover(cards[0]);
        expect(weatherData.daily?.[0]).toBeDefined();
        expect(result.current.focusedWeather).toEqual(weatherData.daily?.[0]);
    });

    it('should set the hovered weather card as active regardless of what card is active.', 
    async () => {
        const user = userEvent.setup();
        const { result } = renderHook(() => useWidgetStore());
        const { getAllByTestId } = render(
            <DailyWeatherCardWidget weatherData={weatherData}/>,
            {wrapper: testWrapper}        
        );
        const cards = getAllByTestId('weather-card');
        await user.click(cards[1]);
        await user.hover(cards[0]);
        expect(weatherData.daily?.[0]).toBeDefined();
        expect(result.current.focusedWeather).toEqual(weatherData.daily?.[0]);
    });

    it('should unactivate an active weather card if clicked again.', async () => {
        const user = userEvent.setup();
        const { result } = renderHook(() => useWidgetStore(), {wrapper: testWrapper});
        const { getAllByTestId } = render(
            <DailyWeatherCardWidget weatherData={weatherData}/>,
            {wrapper: testWrapper}        
        );
        const cards = getAllByTestId('weather-card');
        await user.click(cards[0]);
        await user.click(cards[0]);
        await user.unhover(cards[0]);
        expect(result.current.focusedWeather).toEqual(undefined);
    });
    
    it('should return a skeleton if no data is provided.', () => {
        const { getAllByTestId } = render(
            <DailyWeatherCardWidget weatherData={undefined}/>,
            {wrapper: testWrapper}        
        );
        expect(getAllByTestId('weather-card-skeleton')).toHaveLength(8);
    });
});