import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";
import React from "react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { createOpenWeatherWeatherMockData } from "@features/open-weather-map-one-call/__mocks__/oneCall.mock";
import { TemperatureScale } from "@src/types/weather.types";
import { withRender } from "@utils/render";
import { testQueryClient } from "@utils/query-client";
import CompactWeatherCard, { CompactWeatherCardProps } from "@components/cards/compact-weather-card/compact-weather-card";

describe("Component: Compact Weather Card", () => {
    let cardProps: CompactWeatherCardProps;
    let weatherCard: React.ReactElement;
    beforeEach(() => {
        cardProps = {
            timezone: faker.location.timeZone(),
            date: faker.date.future(),
            weatherCode: createOpenWeatherWeatherMockData().id,
            rainfallPercentage: faker.number.float({ min: 0.1, max: 1, fractionDigits: 2 }),
            maxTemperature: faker.number.float({ min: 273.15, max: 300.15, fractionDigits: 2 }),
            minTemperature: faker.number.float({ min: 301.15, max: 325.15, fractionDigits: 2 }),
        };

        weatherCard = (<CompactWeatherCard {...cardProps} />);
    });

    afterEach(() => {
        testQueryClient.clear();
    });

    it("Compact Weather Cards must contain the weekday.", () => {
        const { getByText } = withRender(weatherCard);
        const weekday = DateTime.fromJSDate(cardProps.date, { zone: cardProps.timezone }).weekdayShort;
        expect(weekday).toBeDefined();
        expect(getByText(weekday!)).toBeInTheDocument();
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
