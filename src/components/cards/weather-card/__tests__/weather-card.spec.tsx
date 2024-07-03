import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, test, vi } from "vitest";
import { createOpenWeatherWeatherMockData } from "@features/open-weather-map-one-call/__mocks__/oneCall.mock";
import { TemperatureScale } from "@src/types/weather.types";
import { withRender } from "@utils/wrappers";
import { testQueryClient } from "@utils/query-client";
import { WeatherCard, WeatherCardProps } from "./..";

describe("Component: Weather Card", () => {
    let cardProps: WeatherCardProps;
    let weatherCard: React.ReactElement;
    beforeEach(() => {
        vi.useFakeTimers();
        const weather = createOpenWeatherWeatherMockData();
        cardProps = {
            timezone: faker.location.timeZone(),
            date: faker.date.future(),
            weatherCode: weather.id,
            weatherDescription: weather.description,
            rainfallPercentage: faker.number.float({ min: 0.1, max: 1, fractionDigits: 2 }),
            maxTemperature: faker.number.float({ min: 273.15, max: 300.15, fractionDigits: 2 }),
            minTemperature: faker.number.float({ min: 301.15, max: 325.15, fractionDigits: 2 }),
        };

        weatherCard = (<WeatherCard {...cardProps} />);
    });

    afterEach(() => {
        vi.useRealTimers();
        testQueryClient.clear();
    });

    it("Compact Weather Cards must contain the weekday.", () => {
        const { getByText } = withRender(weatherCard);
        const weekday = DateTime.fromJSDate(cardProps.date, { zone: cardProps.timezone }).weekdayLong;
        expect(weekday).toBeDefined();
        expect(getByText(weekday!)).toBeInTheDocument();
    });

    test.each([
        ["today", 0],
        ["tomorrow", 1],
        ["Jan 03", 2],
    ])
    ("Compact Weather Cards must display %s when offset %d days from 1st of Jan.", (
        dateString: string, offset: number
    ) => {
        const currentMockDate = DateTime.local(2000, 1, 1, { zone: cardProps.timezone });
        const cardDate = DateTime.local(2000, 1, 1 + offset, { zone: cardProps.timezone });
        vi.setSystemTime(currentMockDate.toJSDate());
        const { getByText } = withRender(<WeatherCard {...cardProps} date={cardDate.toJSDate()} />);
        expect(getByText(dateString)).toBeInTheDocument();
    });

    it("Compact Weather Cards must contain the rain percentage if defined.", () => {
        const { getByText } = withRender(weatherCard);
        const rainfallPercentage = Math.round(cardProps.rainfallPercentage * 100);
        expect(getByText(`${rainfallPercentage}%`)).toBeInTheDocument();
    });

    it("Compact Weather Cards must contain the min temperature (celcius).", () => {
        const settings = { temperatureScale: TemperatureScale.CELSIUS };
        const { getByText } = withRender(weatherCard, { settings });
        const temp = Math.round(cardProps.minTemperature - 273.15);
        expect(getByText(`${temp}°`)).toBeInTheDocument();
    });

    it("Compact Weather Cards must contain the min temperature (fahrenheit).", () => {
        const settings = { temperatureScale: TemperatureScale.FAHRENHEIT };
        const { getByText } = withRender(weatherCard, { settings });
        const temp = Math.round((cardProps.minTemperature - 273.15) * 1.8 + 32);
        expect(getByText(`${temp}°`)).toBeInTheDocument();
    });

    it("Compact Weather Cards must contain the max temperature (celcius).", () => {
        const settings = { temperatureScale: TemperatureScale.CELSIUS };
        const { getByText } = withRender(weatherCard, { settings });
        const temp = Math.round(cardProps.maxTemperature - 273.15);
        expect(getByText(`${temp}°`)).toBeInTheDocument();
    });

    it("Compact Weather Cards must contain the max temperature (fahrenheit).", () => {
        const settings = { temperatureScale: TemperatureScale.FAHRENHEIT };
        const { getByText } = withRender(weatherCard, { settings });
        const temp = Math.round((cardProps.maxTemperature - 273.15) * 1.8 + 32);
        expect(getByText(`${temp}°`)).toBeInTheDocument();
    });
});
