import { afterEach, beforeEach, describe, expect, it, test, vi } from "vitest";
import { DateTime } from "luxon";
import React from "react";
import { TemperatureScale } from "@src/types/weather.types";
import { WeatherCard } from "./..";
import type { WeatherCardProps } from "./..";
import { createOpenWeatherWeatherMockData } from "@features/open-weather-map-one-call/__mocks__/oneCall.mock";
import { faker } from "@faker-js/faker";
import { testQueryClient } from "@utils/query-client";
import { withRender } from "@utils/render";

describe("Component: Weather Card", () => {
    let cardProps: WeatherCardProps;
    let weatherCard: React.ReactElement;
    beforeEach(() => {
        vi.useFakeTimers();
        const weather = createOpenWeatherWeatherMockData();
        cardProps = {
            date: faker.date.future(),
            maxTemperature: faker.number.float({ fractionDigits: 2, max: 300.15, min: 273.15 }),
            minTemperature: faker.number.float({ fractionDigits: 2, max: 325.15, min: 301.15 }),
            rainfallPercentage: faker.number.float({ fractionDigits: 2, max: 1, min: 0.1 }),
            timezone: faker.location.timeZone(),
            weatherCode: weather.id,
            weatherDescription: weather.description,
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
    ]) (
        "Compact Weather Cards must display %s when offset %d days from 1st of Jan.",
        (dateString: string, offset: number) => {
            const currentMockDate = DateTime.local(2000, 1, 1, { zone: cardProps.timezone });
            const cardDate = DateTime.local(2000, 1, 1 + offset, { zone: cardProps.timezone });
            vi.setSystemTime(currentMockDate.toJSDate());
            const { getByText } = withRender(<WeatherCard {...cardProps} date={cardDate.toJSDate()} />);
            expect(getByText(dateString)).toBeInTheDocument();
        },
    );

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
