import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';
import { createOpenWeatherWeatherMockData } from '../../open-weather-map-one-call/__mocks__/oneCall.mock';

export function createWeatherCurrentMockData(
    date = faker.date.anytime(), 
    timezone = faker.location.timeZone()
) {
    const dateTime = DateTime.fromJSDate(date, {zone: timezone});
    const startDay = dateTime.startOf('day');
    const endDay = dateTime.endOf('day');
    const halfDay = startDay.plus({ hours: 12});
    return {
        "dt": date,
        "sunrise": faker.date.between({ from: startDay.toJSDate(), to: halfDay.toJSDate() }),
        "sunset": faker.date.between({ from: halfDay.toJSDate(), to: endDay.toJSDate() }),
        "temp": faker.number.float({min: 186, max: 331, fractionDigits: 2}),
        "feelsLike": faker.number.float({min: 186, max: 331, fractionDigits: 2}),
        "pressure": faker.number.int({min: 980, max: 1030}),
        "humidity": faker.number.int({min: 0, max: 100}),
        "dewPoint": faker.number.float({min: 186, max: 331, fractionDigits: 2}),
        "uvi": faker.number.int({min: 0, max: 11}),
        "clouds": faker.number.int({min: 0, max: 100}),
        "visibility": faker.number.int({min: 0, max: 10000}),
        "windSpeed":faker.number.float({min: 0, max: 35, fractionDigits: 1}),
        "windDeg": faker.number.float({min: 0, max: 360}),
        "windGust": faker.number.float({min: 0, max: 113, fractionDigits: 2}),
        "weather": faker.helpers.multiple(createOpenWeatherWeatherMockData, {count: {min: 1, max: 3}}),
    }
}

export function createWeatherDailyMockData(
    date = faker.date.anytime(), 
    timezone = faker.location.timeZone()
) {
    const dateTime = DateTime.fromJSDate(date, {zone: timezone});
    const startDay = dateTime.startOf('day');
    const endDay = dateTime.endOf('day');
    const halfDay = startDay.plus({ hours: 12});

    return {
        "dt": date,
        "sunrise": faker.date.between({ from: startDay.toJSDate(), to: halfDay.toJSDate() }),
        "sunset": faker.date.between({ from: halfDay.toJSDate(), to: endDay.toJSDate() }),
        "moonrise": faker.date.between({ from: halfDay.toJSDate(), to: endDay.toJSDate() }),
        "moonset": faker.date.between({ from: startDay.toJSDate(), to: halfDay.toJSDate() }),
        "moonPhase": faker.number.float({min: 0, max: 1, fractionDigits: 2}),
        "summary": faker.lorem.sentence(),
        "temp":{
            "day": faker.number.float({min: 186, max: 331, fractionDigits: 2}),
            "min": faker.number.float({min: 186, max: 331, fractionDigits: 2}),
            "max": faker.number.float({min: 186, max: 331, fractionDigits: 2}),
            "night": faker.number.float({min: 186, max: 331, fractionDigits: 2}),
            "eve": faker.number.float({min: 186, max: 331, fractionDigits: 2}),
            "morn": faker.number.float({min: 186, max: 331, fractionDigits: 2})
         },
         "feelsLike":{
            "day": faker.number.float({min: 186, max: 331, fractionDigits: 2}),
            "night": faker.number.float({min: 186, max: 331, fractionDigits: 2}),
            "eve":297.86,
            "morn":292.87
         },
        "pressure": faker.number.int({min: 980, max: 1030}),
        "humidity": faker.number.int({min: 0, max: 100}),
        "dewPoint": faker.number.float({min: 186, max: 331, fractionDigits: 2}),
        "windSpeed":faker.number.float({min: 0, max: 35, fractionDigits: 1}),
        "windDeg": faker.number.float({min: 0, max: 360}),
        "windGust": faker.number.float({min: 0, max: 113, fractionDigits: 2}),
        "weather": faker.helpers.multiple(createOpenWeatherWeatherMockData, {count: {min: 1, max: 3}}),
        "clouds": faker.number.int({min: 0, max: 100}),
        "pop": faker.number.float({min: 0, max: 1, fractionDigits: 2}),
        "rain": faker.number.float({min: 0, max: 600, fractionDigits: 2}),
        "uvi": faker.number.int({min: 0, max: 11}),
    }
}

export function createWeatherHourlyMockData(
    date = faker.date.anytime(), 
) {
    return {
        "dt": date,
        "temp": faker.number.float({min: 186, max: 331, fractionDigits: 2}),
        "feelsLike": faker.number.float({min: 186, max: 331, fractionDigits: 2}),
        "pressure": faker.number.int({min: 980, max: 1030}),
        "humidity": faker.number.int({min: 0, max: 100}),
        "dewPoint": faker.number.float({min: 186, max: 331, fractionDigits: 2}),
        "uvi": faker.number.int({min: 0, max: 11}),
        "clouds": faker.number.int({min: 0, max: 100}),
        "visibility": faker.number.int({min: 0, max: 10000}),
        "windSpeed":faker.number.float({min: 0, max: 35, fractionDigits: 1}),
        "windDeg": faker.number.float({min: 0, max: 360}),
        "windGust": faker.number.float({min: 0, max: 113, fractionDigits: 2}),
        "rain": {
            "1h": faker.number.int({min: 1, max: 100}),
        },
        "weather": faker.helpers.multiple(createOpenWeatherWeatherMockData, {count: {min: 1, max: 3}}),
        "pop": faker.number.float({min: 0, max: 1, fractionDigits: 2}),
    }
}

export function createWeatherAlertMockData() {
    return {
        "senderName": faker.person.fullName(),
        "event": faker.lorem.words(),
        "start": faker.date.anytime(),
        "end": faker.date.anytime(),
        "description": faker.lorem.sentence(),
        "tags": faker.helpers.multiple(faker.word.words)
    }
}

export function createWeatherMinutelyMockData(
    date = faker.date.anytime(), 
) {
    return {
        "dt": date,
        "precipitation": faker.number.float({min: 0, max: 600, fractionDigits: 2})
    }
}

export function createWeatherMockData() {
    const timezone = faker.location.timeZone();
    const datetime = DateTime.fromJSDate(faker.date.anytime(), {zone: timezone});
    const timezoneOffset = datetime.offset*1000;

    const minutelyWeather = [...Array(60)].map((_,idx) => 
        createWeatherMinutelyMockData(datetime.plus({minutes: idx}).toJSDate()));

    const hourlyWeather = [...Array(48)].map((_,idx) => 
        createWeatherHourlyMockData(datetime.plus({hours: idx}).toJSDate()));

    const dailyWeather = [...Array(8)].map((_,idx) => 
        createWeatherDailyMockData(datetime.plus({days: idx}).toJSDate(), timezone));


    return {
        "lat": faker.location.longitude({precision: 4}),
        "lon": faker.location.latitude({precision: 4}),
        "timezone": timezone,
        "timezoneOffset": timezoneOffset,
        "current": createWeatherCurrentMockData(datetime.toJSDate()),
        "minutely": minutelyWeather,
        "hourly": hourlyWeather,
        "daily": dailyWeather,
        "alerts":faker.helpers.multiple(createWeatherAlertMockData, {count: {min: 0, max: 2}}),
    }
}