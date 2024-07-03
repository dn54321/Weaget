import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";
import { openWeatherTypes } from "@features/open-weather-map-one-call/oneCall.utils";

export function createOpenWeatherCurrentMockData() {
    return {
        dt: faker.number.int(),
        sunrise: faker.number.int(),
        sunset: faker.number.int(),
        temp: faker.number.float({ min: 186, max: 331, fractionDigits: 2 }),
        feels_like: faker.number.float({ min: 186, max: 331, fractionDigits: 2 }),
        pressure: faker.number.int({ min: 980, max: 1030 }),
        humidity: faker.number.int({ min: 0, max: 100 }),
        dew_point: faker.number.float({ min: 186, max: 331, fractionDigits: 2 }),
        uvi: faker.number.int({ min: 0, max: 11 }),
        clouds: faker.number.int({ min: 0, max: 100 }),
        visibility: faker.number.int({ min: 0, max: 10000 }),
        wind_speed: faker.number.float({ min: 0, max: 35, fractionDigits: 1 }),
        wind_deg: faker.number.float({ min: 0, max: 360 }),
        wind_gust: faker.number.float({ min: 0, max: 113, fractionDigits: 2 }),
        weather: faker.helpers.multiple(createOpenWeatherWeatherMockData, { count: { min: 1, max: 3 } }),
    };
}

export function createOpenWeatherDailyMockData() {
    return {
        dt: faker.number.int(),
        sunrise: faker.number.int(),
        sunset: faker.number.int(),
        moonrise: faker.number.int(),
        moonset: faker.number.int(),
        moon_phase: faker.number.float({ min: 0, max: 1, fractionDigits: 2 }),
        summary: faker.lorem.sentence(),
        temp: {
            day: faker.number.float({ min: 186, max: 331, fractionDigits: 2 }),
            min: faker.number.float({ min: 186, max: 331, fractionDigits: 2 }),
            max: faker.number.float({ min: 186, max: 331, fractionDigits: 2 }),
            night: faker.number.float({ min: 186, max: 331, fractionDigits: 2 }),
            eve: faker.number.float({ min: 186, max: 331, fractionDigits: 2 }),
            morn: faker.number.float({ min: 186, max: 331, fractionDigits: 2 }),
        },
        feels_like: {
            day: faker.number.float({ min: 186, max: 331, fractionDigits: 2 }),
            night: faker.number.float({ min: 186, max: 331, fractionDigits: 2 }),
            eve: 297.86,
            morn: 292.87,
        },
        pressure: faker.number.int({ min: 980, max: 1030 }),
        humidity: faker.number.int({ min: 0, max: 100 }),
        dew_point: faker.number.float({ min: 186, max: 331, fractionDigits: 2 }),
        wind_speed: faker.number.float({ min: 0, max: 35, fractionDigits: 1 }),
        wind_deg: faker.number.float({ min: 0, max: 360 }),
        wind_gust: faker.number.float({ min: 0, max: 113, fractionDigits: 2 }),
        weather: faker.helpers.multiple(createOpenWeatherWeatherMockData, { count: { min: 1, max: 3 } }),
        clouds: faker.number.int({ min: 0, max: 100 }),
        pop: faker.number.float({ min: 0, max: 1, fractionDigits: 2 }),
        rain: faker.number.float({ min: 0, max: 600, fractionDigits: 2 }),
        uvi: faker.number.int({ min: 0, max: 11 }),
    };
}

export function createOpenWeatherHourlyMockData() {
    return {
        dt: faker.number.int(),
        temp: faker.number.float({ min: 186, max: 331, fractionDigits: 2 }),
        feels_like: faker.number.float({ min: 186, max: 331, fractionDigits: 2 }),
        pressure: faker.number.int({ min: 980, max: 1030 }),
        humidity: faker.number.int({ min: 0, max: 100 }),
        dew_point: faker.number.float({ min: 186, max: 331, fractionDigits: 2 }),
        uvi: faker.number.int({ min: 0, max: 11 }),
        clouds: faker.number.int({ min: 0, max: 100 }),
        visibility: faker.number.int({ min: 0, max: 10000 }),
        wind_speed: faker.number.float({ min: 0, max: 35, fractionDigits: 1 }),
        wind_deg: faker.number.float({ min: 0, max: 360 }),
        wind_gust: faker.number.float({ min: 0, max: 113, fractionDigits: 2 }),
        weather: faker.helpers.multiple(createOpenWeatherWeatherMockData, { count: { min: 1, max: 3 } }),
        pop: faker.number.float({ min: 0, max: 1, fractionDigits: 2 }),
    };
}

export function createOpenWeatherAlertMockData() {
    return {
        sender_name: faker.person.fullName(),
        event: faker.lorem.words(),
        start: faker.number.int(),
        end: faker.number.int(),
        description: faker.lorem.sentence(),
        tags: faker.helpers.multiple(faker.word.words),
    };
}

export function createOpenWeatherMinutelyMockData() {
    return {
        dt: faker.number.int(),
        precipitation: faker.number.float({ min: 0, max: 600, fractionDigits: 2 }),
    };
}

export function createOpenWeatherOneCallMockData() {
    const timezone = faker.location.timeZone();
    const timezoneOffset = DateTime.local().setZone(timezone).offset;

    return {
        lat: faker.location.longitude({ precision: 4 }),
        lon: faker.location.latitude({ precision: 4 }),
        timezone: timezone,
        timezone_offset: timezoneOffset,
        current: createOpenWeatherCurrentMockData(),
        minutely: faker.helpers.multiple(createOpenWeatherMinutelyMockData, { count: 60 }),
        hourly: faker.helpers.multiple(createOpenWeatherHourlyMockData, { count: 48 }),
        daily: faker.helpers.multiple(createOpenWeatherDailyMockData, { count: 14 }),
        alerts: faker.helpers.multiple(createOpenWeatherAlertMockData, { count: { min: 0, max: 2 } }),
    };
}

export function createOpenWeatherWeatherMockData() {
    const weather = faker.helpers.arrayElement(openWeatherTypes);
    return {
        id: weather.id,
        main: weather.main,
        description: weather.description,
        icon: weather.icon,
    };
}
