import { DateTime } from "luxon";
import { faker } from "@faker-js/faker";
import { openWeatherTypes } from "@features/open-weather-map-one-call/oneCall.utils";

export function createOpenWeatherCurrentMockData() {
    return {
        clouds: faker.number.int({ max: 100, min: 0 }),
        dew_point: faker.number.float({ fractionDigits: 2, max: 331, min: 186 }),
        dt: faker.number.int(),
        feels_like: faker.number.float({ fractionDigits: 2, max: 331, min: 186 }),
        humidity: faker.number.int({ max: 100, min: 0 }),
        pressure: faker.number.int({ max: 1030, min: 980 }),
        sunrise: faker.number.int(),
        sunset: faker.number.int(),
        temp: faker.number.float({ fractionDigits: 2, max: 331, min: 186 }),
        uvi: faker.number.int({ max: 11, min: 0 }),
        visibility: faker.number.int({ max: 10000, min: 0 }),
        weather: faker.helpers.multiple(createOpenWeatherWeatherMockData, { count: { max: 3, min: 1 } }),
        wind_deg: faker.number.float({ max: 360, min: 0 }),
        wind_gust: faker.number.float({ fractionDigits: 2, max: 113, min: 0 }),
        wind_speed: faker.number.float({ fractionDigits: 1, max: 35, min: 0 }),
    };
}

export function createOpenWeatherDailyMockData() {
    return {
        clouds: faker.number.int({ max: 100, min: 0 }),
        dew_point: faker.number.float({ fractionDigits: 2, max: 331, min: 186 }),
        dt: faker.number.int(),
        feels_like: {
            day: faker.number.float({ fractionDigits: 2, max: 331, min: 186 }),
            eve: 297.86,
            morn: 292.87,
            night: faker.number.float({ fractionDigits: 2, max: 331, min: 186 }),
        },
        humidity: faker.number.int({ max: 100, min: 0 }),
        moon_phase: faker.number.float({ fractionDigits: 2, max: 1, min: 0 }),
        moonrise: faker.number.int(),
        moonset: faker.number.int(),
        pop: faker.number.float({ fractionDigits: 2, max: 1, min: 0 }),
        pressure: faker.number.int({ max: 1030, min: 980 }),
        rain: faker.number.float({ fractionDigits: 2, max: 600, min: 0 }),
        summary: faker.lorem.sentence(),
        sunrise: faker.number.int(),
        sunset: faker.number.int(),
        temp: {
            day: faker.number.float({ fractionDigits: 2, max: 331, min: 186 }),
            eve: faker.number.float({ fractionDigits: 2, max: 331, min: 186 }),
            max: faker.number.float({ fractionDigits: 2, max: 331, min: 186 }),
            min: faker.number.float({ fractionDigits: 2, max: 331, min: 186 }),
            morn: faker.number.float({ fractionDigits: 2, max: 331, min: 186 }),
            night: faker.number.float({ fractionDigits: 2, max: 331, min: 186 }),
        },
        uvi: faker.number.int({ max: 11, min: 0 }),
        weather: faker.helpers.multiple(createOpenWeatherWeatherMockData, { count: { max: 3, min: 1 } }),
        wind_deg: faker.number.float({ max: 360, min: 0 }),
        wind_gust: faker.number.float({ fractionDigits: 2, max: 113, min: 0 }),
        wind_speed: faker.number.float({ fractionDigits: 1, max: 35, min: 0 }),
    };
}

export function createOpenWeatherHourlyMockData() {
    return {
        clouds: faker.number.int({ max: 100, min: 0 }),
        dew_point: faker.number.float({ fractionDigits: 2, max: 331, min: 186 }),
        dt: faker.number.int(),
        feels_like: faker.number.float({ fractionDigits: 2, max: 331, min: 186 }),
        humidity: faker.number.int({ max: 100, min: 0 }),
        pop: faker.number.float({ fractionDigits: 2, max: 1, min: 0 }),
        pressure: faker.number.int({ max: 1030, min: 980 }),
        temp: faker.number.float({ fractionDigits: 2, max: 331, min: 186 }),
        uvi: faker.number.int({ max: 11, min: 0 }),
        visibility: faker.number.int({ max: 10000, min: 0 }),
        weather: faker.helpers.multiple(createOpenWeatherWeatherMockData, { count: { max: 3, min: 1 } }),
        wind_deg: faker.number.float({ max: 360, min: 0 }),
        wind_gust: faker.number.float({ fractionDigits: 2, max: 113, min: 0 }),
        wind_speed: faker.number.float({ fractionDigits: 1, max: 35, min: 0 }),
    };
}

export function createOpenWeatherAlertMockData() {
    return {
        description: faker.lorem.sentence(),
        end: faker.number.int(),
        event: faker.lorem.words(),
        sender_name: faker.person.fullName(),
        start: faker.number.int(),
        tags: faker.helpers.multiple(faker.word.words),
    };
}

export function createOpenWeatherMinutelyMockData() {
    return {
        dt: faker.number.int(),
        precipitation: faker.number.float({ fractionDigits: 2, max: 600, min: 0 }),
    };
}

export function createOpenWeatherOneCallMockData() {
    const timezone = faker.location.timeZone();
    const timezoneOffset = DateTime.local().setZone(timezone).offset;

    return {
        alerts: faker.helpers.multiple(createOpenWeatherAlertMockData, { count: { max: 2, min: 0 } }),
        current: createOpenWeatherCurrentMockData(),
        daily: faker.helpers.multiple(createOpenWeatherDailyMockData, { count: 14 }),
        hourly: faker.helpers.multiple(createOpenWeatherHourlyMockData, { count: 48 }),
        lat: faker.location.longitude({ precision: 4 }),
        lon: faker.location.latitude({ precision: 4 }),
        minutely: faker.helpers.multiple(createOpenWeatherMinutelyMockData, { count: 60 }),
        timezone: timezone,
        timezone_offset: timezoneOffset,
    };
}

export function createOpenWeatherWeatherMockData() {
    const weather = faker.helpers.arrayElement(openWeatherTypes);
    return {
        description: weather.description,
        icon: weather.icon,
        id: weather.id,
        main: weather.main,
    };
}
