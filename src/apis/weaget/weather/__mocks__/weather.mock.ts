import { faker } from "@faker-js/faker";
import { createOpenWeatherWeatherMockData } from "@src/apis/open-weather-map/one-call/__mocks__/one-call.mock";
import { DateTime } from "luxon";

export function createWeatherAlertMockData() {
    return {
        description: faker.lorem.sentence(),
        end: faker.date.anytime(),
        event: faker.lorem.words(),
        senderName: faker.person.fullName(),
        start: faker.date.anytime(),
        tags: faker.helpers.multiple(() => faker.word.words())
    };
}

export function createWeatherCurrentMockData(
    date = faker.date.anytime(),
    timezone = faker.location.timeZone()
) {
    const dateTime = DateTime.fromJSDate(date, { zone: timezone });
    const startDay = dateTime.startOf("day");
    const endDay = dateTime.endOf("day");
    const halfDay = startDay.plus({ hours: 12 });
    return {
        clouds: faker.number.int({ max: 100, min: 0 }),
        dewPoint: faker.number.float({ fractionDigits: 2, max: 331, min: 186 }),
        dt: date,
        feelsLike: faker.number.float({ fractionDigits: 2, max: 331, min: 186 }),
        humidity: faker.number.int({ max: 100, min: 0 }),
        pressure: faker.number.int({ max: 1030, min: 980 }),
        sunrise: faker.date.between({ from: startDay.toJSDate(), to: halfDay.toJSDate() }),
        sunset: faker.date.between({ from: halfDay.toJSDate(), to: endDay.toJSDate() }),
        temp: faker.number.float({ fractionDigits: 2, max: 331, min: 186 }),
        uvi: faker.number.int({ max: 11, min: 0 }),
        visibility: faker.number.int({ max: 10000, min: 0 }),
        weather: faker.helpers.multiple(createOpenWeatherWeatherMockData, { count: { max: 3, min: 1 } }),
        windDeg: faker.number.int({ max: 360, min: 0 }),
        windGust: faker.number.float({ fractionDigits: 2, max: 113, min: 0 }),
        windSpeed: faker.number.float({ fractionDigits: 1, max: 35, min: 0 })
    };
}

export function createWeatherDailyMockData(
    date = faker.date.anytime(),
    timezone = faker.location.timeZone()
) {
    const dateTime = DateTime.fromJSDate(date, { zone: timezone });
    const startDay = dateTime.startOf("day");
    const endDay = dateTime.endOf("day");
    const halfDay = startDay.plus({ hours: 12 });

    return {
        clouds: faker.number.int({ max: 100, min: 0 }),
        dewPoint: faker.number.float({ fractionDigits: 2, max: 331, min: 186 }),
        dt: date,
        feelsLike: {
            day: faker.number.float({ fractionDigits: 2, max: 331, min: 186 }),
            eve: 297.86,
            morn: 292.87,
            night: faker.number.float({ fractionDigits: 2, max: 331, min: 186 })
        },
        humidity: faker.number.int({ max: 100, min: 0 }),
        moonPhase: faker.number.float({ fractionDigits: 2, max: 1, min: 0 }),
        moonrise: faker.date.between({ from: halfDay.toJSDate(), to: endDay.toJSDate() }),
        moonset: faker.date.between({ from: startDay.toJSDate(), to: halfDay.toJSDate() }),
        pop: faker.number.float({ fractionDigits: 2, max: 1, min: 0 }),
        pressure: faker.number.int({ max: 1030, min: 980 }),
        rain: faker.number.float({ fractionDigits: 2, max: 600, min: 0 }),
        summary: faker.lorem.sentence(),
        sunrise: faker.date.between({ from: startDay.toJSDate(), to: halfDay.toJSDate() }),
        sunset: faker.date.between({ from: halfDay.toJSDate(), to: endDay.toJSDate() }),
        temp: {
            day: faker.number.float({ fractionDigits: 2, max: 331, min: 186 }),
            eve: faker.number.float({ fractionDigits: 2, max: 331, min: 186 }),
            max: faker.number.float({ fractionDigits: 2, max: 331, min: 186 }),
            min: faker.number.float({ fractionDigits: 2, max: 331, min: 186 }),
            morn: faker.number.float({ fractionDigits: 2, max: 331, min: 186 }),
            night: faker.number.float({ fractionDigits: 2, max: 331, min: 186 })
        },
        uvi: faker.number.int({ max: 11, min: 0 }),
        weather: faker.helpers.multiple(createOpenWeatherWeatherMockData, { count: { max: 3, min: 1 } }),
        windDeg: faker.number.int({ max: 360, min: 0 }),
        windGust: faker.number.float({ fractionDigits: 2, max: 113, min: 0 }),
        windSpeed: faker.number.float({ fractionDigits: 1, max: 35, min: 0 })
    };
}

export function createWeatherHourlyMockData(
    date = faker.date.anytime()
) {
    return {
        clouds: faker.number.int({ max: 100, min: 0 }),
        dewPoint: faker.number.float({ fractionDigits: 2, max: 331, min: 186 }),
        dt: date,
        feelsLike: faker.number.float({ fractionDigits: 2, max: 331, min: 186 }),
        humidity: faker.number.int({ max: 100, min: 0 }),
        pop: faker.number.float({ fractionDigits: 2, max: 1, min: 0 }),
        pressure: faker.number.int({ max: 1030, min: 980 }),
        rain: {
            "1h": faker.number.int({ max: 100, min: 1 })
        },
        temp: faker.number.float({ fractionDigits: 2, max: 331, min: 186 }),
        uvi: faker.number.int({ max: 11, min: 0 }),
        visibility: faker.number.int({ max: 10000, min: 0 }),
        weather: faker.helpers.multiple(createOpenWeatherWeatherMockData, { count: { max: 3, min: 1 } }),
        windDeg: faker.number.int({ max: 360, min: 0 }),
        windGust: faker.number.float({ fractionDigits: 2, max: 113, min: 0 }),
        windSpeed: faker.number.float({ fractionDigits: 1, max: 35, min: 0 })
    };
}

export function createWeatherMinutelyMockData(
    date = faker.date.anytime()
) {
    return {
        dt: date,
        precipitation: faker.number.float({ fractionDigits: 2, max: 600, min: 0 })
    };
}

export function createWeatherMockData() {
    const timezone = faker.location.timeZone();
    const datetime = DateTime.fromJSDate(faker.date.anytime(), { zone: timezone });
    const timezoneOffset = datetime.offset * 1000;

    const minutelyWeather = [...Array(60)].map((_, idx) =>
        createWeatherMinutelyMockData(datetime.plus({ minutes: idx }).toJSDate()));

    const hourlyWeather = [...Array(48)].map((_, idx) =>
        createWeatherHourlyMockData(datetime.plus({ hours: idx }).toJSDate()));

    const dailyWeather = [...Array(8)].map((_, idx) =>
        createWeatherDailyMockData(datetime.plus({ days: idx }).toJSDate(), timezone));

    return {
        alerts: faker.helpers.multiple(createWeatherAlertMockData, { count: { max: 2, min: 0 } }),
        current: createWeatherCurrentMockData(datetime.toJSDate()),
        daily: dailyWeather,
        hourly: hourlyWeather,
        lat: faker.location.longitude({ precision: 4 }),
        lon: faker.location.latitude({ precision: 4 }),
        minutely: minutelyWeather,
        timezone: timezone,
        timezoneOffset: timezoneOffset
    };
}
