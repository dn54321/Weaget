import { beforeAll, describe, expect, it } from "vitest"
import { createWeatherMockData } from "../../../features/weaget/__mocks__/weather.mock";
import { render } from "@testing-library/react";
import { testWrapper } from "../../../utils/wrappers";
import { OneCallWeatherDetails } from "../../../features/open-weather-map-one-call/oneCall.type";
import userEvent from "@testing-library/user-event";
import HourlyWeatherStripWidget from "../hourly-weather-strip-widget";

describe('Component: hourly-weather-card-widget', async () => {
    let weatherData: OneCallWeatherDetails;
    beforeAll(() => {
        weatherData = createWeatherMockData();
    });
    
    it('should contain a title.', () => {
        const { getByText } = render(
            <HourlyWeatherStripWidget weatherData={weatherData}/>, 
            {wrapper: testWrapper}
        );
        expect(getByText("Hourly Weather Details")).toBeInTheDocument();
    });

    it('should contains a total of 12 weather strips.', () => {
        const { getAllByTestId } = render(
            <HourlyWeatherStripWidget weatherData={weatherData}/>,
            {wrapper: testWrapper}        
        );
        expect(getAllByTestId('weather-strip')).toHaveLength(12);
    });

    it('should be expandable.', async () => {
        const user = userEvent.setup();
        const { getAllByTestId, getByRole } = render(
            <HourlyWeatherStripWidget weatherData={weatherData}/>,
            {wrapper: testWrapper}        
        );
        
        const accordion = getAllByTestId('ExpandMoreIcon')[0];
        await user.click(accordion);
        expect(getByRole('button', {expanded: true})).toBeInTheDocument();
        await user.click(accordion);
        expect(() => getByRole('button', {expanded: true})).toThrow();
    });

    it('should show another 12 weather strips when going to the next page.', 
    async () => {
        const user = userEvent.setup();
        const { getAllByTestId, getByLabelText } = render(
            <HourlyWeatherStripWidget weatherData={weatherData}/>,
            {wrapper: testWrapper}        
        );
        const weatherStripPage1 = getAllByTestId('weather-strip');
        await user.click(getByLabelText("Go to next page"));
        const weatherStripPage2 = getAllByTestId('weather-strip');
        expect(weatherStripPage1).not.toBe(weatherStripPage2);
        expect(getAllByTestId('weather-strip')).toHaveLength(12);
        expect(weatherStripPage1[0]).not.toEqual(weatherStripPage2[0]);
    });

    
    it('should return a skeleton if no data is provided.', () => {
        const { getAllByTestId } = render(
            <HourlyWeatherStripWidget weatherData={undefined}/>,
            {wrapper: testWrapper}        
        );
        expect(getAllByTestId('weather-stat-skeleton')).toHaveLength(12);
    });
});