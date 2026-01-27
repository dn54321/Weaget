import CompactWeatherCard, { CompactWeatherCardProps } from "@components/cards/compact-weather-card/compact-weather-card";
import { faker } from "@faker-js/faker";
import { createOpenWeatherWeatherMockData } from "@src/apis/open-weather-map/one-call/__mocks__/one-call.mock";
import { TemperatureScale } from "@src/types/weather.types";
import { testQueryClient } from "@utils/query-client";
import { withRender } from "@utils/render";
import { DateTime } from "luxon";
import React from "react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

describe("Component: Compact Weather Card", () => {
    let cardProps: CompactWeatherCardProps;
    let weatherCard: React.ReactElement;
    beforeEach(() => {
        cardProps = {
            date: faker.date.future(),
            maxTemperature: faker.number.float({ fractionDigits: 2, max: 300.15, min: 273.15 }),
            minTemperature: faker.number.float({ fractionDigits: 2, max: 325.15, min: 301.15 }),
            rainfallPercentage: faker.number.float({ fractionDigits: 2, max: 1, min: 0.1 }),
            timezone: faker.location.timeZone(),
            weatherCode: createOpenWeatherWeatherMockData().id
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
