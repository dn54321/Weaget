import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';

export function createOpenWeatherWeatherMockData() {
    const openWeatherTypes = [
        {
            "id": 200,
            "name": "Thunderstorm",
            "description": "thunderstorm with light rain",
            "icon": "11d"
        },
        {
            "id": 201,
            "name": "Thunderstorm",
            "description": "thunderstorm with rain",
            "icon": "11d"
        },
        {
            "id": 202,
            "name": "Thunderstorm",
            "description": "thunderstorm with heavy rain",
            "icon": "11d"
        },
        {
            "id": 210,
            "name": "Thunderstorm",
            "description": "light thunderstorm",
            "icon": "11d"
        },
        {
            "id": 211,
            "name": "Thunderstorm",
            "description": "thunderstorm",
            "icon": "11d"
        },
        {
            "id": 212,
            "name": "Thunderstorm",
            "description": "heavy thunderstorm",
            "icon": "11d"
        },
        {
            "id": 221,
            "name": "Thunderstorm",
            "description": "ragged thunderstorm",
            "icon": "11d"
        },
        {
            "id": 230,
            "name": "Thunderstorm",
            "description": "thunderstorm with light drizzle",
            "icon": "11d"
        },
        {
            "id": 231,
            "name": "Thunderstorm",
            "description": "thunderstorm with drizzle",
            "icon": "11d"
        },
        {
            "id": 232,
            "name": "Thunderstorm",
            "description": "thunderstorm with heavy drizzle",
            "icon": "11d"
        },
        {
            "id": 300,
            "name": "Drizzle",
            "description": "light intensity drizzle",
            "icon": "09d"
        },
        {
            "id": 301,
            "name": "Drizzle",
            "description": "drizzle",
            "icon": "09d"
        },
        {
            "id": 302,
            "name": "Drizzle",
            "description": "heavy intensity drizzle",
            "icon": "09d"
        },
        {
            "id": 310,
            "name": "Drizzle",
            "description": "light intensity drizzle rain",
            "icon": "09d"
        },
        {
            "id": 311,
            "name": "Drizzle",
            "description": "drizzle rain",
            "icon": "09d"
        },
        {
            "id": 312,
            "name": "Drizzle",
            "description": "heavy intensity drizzle rain",
            "icon": "09d"
        },
        {
            "id": 313,
            "name": "Drizzle",
            "description": "shower rain and drizzle",
            "icon": "09d"
        },
        {
            "id": 314,
            "name": "Drizzle",
            "description": "heavy shower rain and drizzle",
            "icon": "09d"
        },
        {
            "id": 321,
            "name": "Drizzle",
            "description": "shower drizzle",
            "icon": "09d"
        },
        {
            "id": 500,
            "name": "Rain",
            "description": "light rain",
            "icon": "10d"
        },
        {
            "id": 501,
            "name": "Rain",
            "description": "moderate rain",
            "icon": "10d"
        },
        {
            "id": 502,
            "name": "Rain",
            "description": "heavy intensity rain",
            "icon": "10d"
        },
        {
            "id": 503,
            "name": "Rain",
            "description": "very heavy rain",
            "icon": "10d"
        },
        {
            "id": 504,
            "name": "Rain",
            "description": "extreme rain",
            "icon": "10d"
        },
        {
            "id": 511,
            "name": "Rain",
            "description": "freezing rain",
            "icon": "13d"
        },
        {
            "id": 520,
            "name": "Rain",
            "description": "light intensity shower rain",
            "icon": "09d"
        },
        {
            "id": 521,
            "name": "Rain",
            "description": "shower rain",
            "icon": "09d"
        },
        {
            "id": 522,
            "name": "Rain",
            "description": "heavy intensity shower rain",
            "icon": "09d"
        },
        {
            "id": 531,
            "name": "Rain",
            "description": "ragged shower rain",
            "icon": "09d"
        },
        {
            "id": 600,
            "name": "Snow",
            "description": "light snow",
            "icon": "13d"
        },
        {
            "id": 601,
            "name": "Snow",
            "description": "snow",
            "icon": "13d"
        },
        {
            "id": 602,
            "name": "Snow",
            "description": "heavy snow",
            "icon": "13d"
        },
        {
            "id": 611,
            "name": "Snow",
            "description": "sleet",
            "icon": "13d"
        },
        {
            "id": 612,
            "name": "Snow",
            "description": "light shower sleet",
            "icon": "13d"
        },
        {
            "id": 613,
            "name": "Snow",
            "description": "shower sleet",
            "icon": "13d"
        },
        {
            "id": 615,
            "name": "Snow",
            "description": "light rain and snow",
            "icon": "13d"
        },
        {
            "id": 616,
            "name": "Snow",
            "description": "rain and snow",
            "icon": "13d"
        },
        {
            "id": 620,
            "name": "Snow",
            "description": "light shower snow",
            "icon": "13d"
        },
        {
            "id": 621,
            "name": "Snow",
            "description": "shower snow",
            "icon": "13d"
        },
        {
            "id": 622,
            "name": "Snow",
            "description": "heavy shower snow",
            "icon": "13d"
        },
        {
            "id": 701,
            "name": "Mist",
            "description": "mist",
            "icon": "50d"
        },
        {
            "id": 711,
            "name": "Smoke",
            "description": "smoke",
            "icon": "50d"
        },
        {
            "id": 721,
            "name": "Haze",
            "description": "haze",
            "icon": "50d"
        },
        {
            "id": 731,
            "name": "Dust",
            "description": "sand/dust whirls",
            "icon": "50d"
        },
        {
            "id": 741,
            "name": "Fog",
            "description": "fog",
            "icon": "50d"
        },
        {
            "id": 751,
            "name": "Sand",
            "description": "sand",
            "icon": "50d"
        },
        {
            "id": 761,
            "name": "Dust",
            "description": "dust",
            "icon": "50d"
        },
        {
            "id": 762,
            "name": "Ash",
            "description": "volcanic ash",
            "icon": "50d"
        },
        {
            "id": 771,
            "name": "Squall",
            "description": "squalls",
            "icon": "50d"
        },
        {
            "id": 781,
            "name": "Tornado",
            "description": "tornado",
            "icon": "50d"
        },
        {
            "id": 800,
            "name": "Clear",
            "description": "clear sky",
            "icon": "01d"
        },
        {
            "id": 801,
            "name": "Clouds",
            "description": "few clouds: 11-25%",
            "icon": "02d"
        },
        {
            "id": 802,
            "name": "Clouds",
            "description": "scattered clouds: 25-50%",
            "icon": "03d"
        },
        {
            "id": 803,
            "name": "Clouds",
            "description": "broken clouds: 51-84%",
            "icon": "04d"
        },
        {
            "id": 804,
            "name": "Clouds",
            "description": "overcast clouds: 85-100%",
            "icon": "04d"
        }]
    const weather = faker.helpers.arrayElement(openWeatherTypes)
    return {
        "id": weather.id,
        "main": weather.name,
        "description": weather.description,
        "icon": weather.icon,
    }
}

export function createOpenWeatherCurrentMockData() {
    return {
        "dt": faker.number.int(),
        "sunrise": faker.number.int(),
        "sunset": faker.number.int(),
        "temp": faker.number.float({min: 186, max: 331, fractionDigits: 2}),
        "feels_like": faker.number.float({min: 186, max: 331, fractionDigits: 2}),
        "pressure": faker.number.int({min: 980, max: 1030}),
        "humidity": faker.number.int({min: 0, max: 100}),
        "dew_point": faker.number.float({min: 186, max: 331, fractionDigits: 2}),
        "uvi": faker.number.int({min: 0, max: 11}),
        "clouds": faker.number.int({min: 0, max: 100}),
        "visibility": faker.number.int({min: 0, max: 10000}),
        "wind_speed":faker.number.float({min: 0, max: 35, fractionDigits: 1}),
        "wind_deg": faker.number.float({min: 0, max: 360}),
        "wind_gust": faker.number.float({min: 0, max: 113, fractionDigits: 2}),
        "weather": faker.helpers.multiple(createOpenWeatherWeatherMockData, {count: {min: 1, max: 3}}),
    }
}

export function createOpenWeatherDailyMockData() {
    return {
        "dt": faker.number.int(),
        "sunrise": faker.number.int(),
        "sunset": faker.number.int(),
        "moonrise": faker.number.int(),
        "moonset": faker.number.int(),
        "moon_phase": faker.number.float({min: 0, max: 1, fractionDigits: 2}),
        "summary": faker.lorem.sentence(),
        "temp":{
            "day": faker.number.float({min: 186, max: 331, fractionDigits: 2}),
            "min": faker.number.float({min: 186, max: 331, fractionDigits: 2}),
            "max": faker.number.float({min: 186, max: 331, fractionDigits: 2}),
            "night": faker.number.float({min: 186, max: 331, fractionDigits: 2}),
            "eve": faker.number.float({min: 186, max: 331, fractionDigits: 2}),
            "morn": faker.number.float({min: 186, max: 331, fractionDigits: 2})
         },
         "feels_like":{
            "day": faker.number.float({min: 186, max: 331, fractionDigits: 2}),
            "night": faker.number.float({min: 186, max: 331, fractionDigits: 2}),
            "eve":297.86,
            "morn":292.87
         },
        "pressure": faker.number.int({min: 980, max: 1030}),
        "humidity": faker.number.int({min: 0, max: 100}),
        "dew_point": faker.number.float({min: 186, max: 331, fractionDigits: 2}),
        "wind_speed":faker.number.float({min: 0, max: 35, fractionDigits: 1}),
        "wind_deg": faker.number.float({min: 0, max: 360}),
        "wind_gust": faker.number.float({min: 0, max: 113, fractionDigits: 2}),
        "weather": faker.helpers.multiple(createOpenWeatherWeatherMockData, {count: {min: 1, max: 3}}),
        "clouds": faker.number.int({min: 0, max: 100}),
        "pop": faker.number.float({min: 0, max: 1, fractionDigits: 2}),
        "rain": faker.number.float({min: 0, max: 600, fractionDigits: 2}),
        "uvi": faker.number.int({min: 0, max: 11}),
    }
}

export function createOpenWeatherHourlyMockData() {
    return {
        "dt": faker.number.int(),
        "temp": faker.number.float({min: 186, max: 331, fractionDigits: 2}),
        "feels_like": faker.number.float({min: 186, max: 331, fractionDigits: 2}),
        "pressure": faker.number.int({min: 980, max: 1030}),
        "humidity": faker.number.int({min: 0, max: 100}),
        "dew_point": faker.number.float({min: 186, max: 331, fractionDigits: 2}),
        "uvi": faker.number.int({min: 0, max: 11}),
        "clouds": faker.number.int({min: 0, max: 100}),
        "visibility": faker.number.int({min: 0, max: 10000}),
        "wind_speed":faker.number.float({min: 0, max: 35, fractionDigits: 1}),
        "wind_deg": faker.number.float({min: 0, max: 360}),
        "wind_gust": faker.number.float({min: 0, max: 113, fractionDigits: 2}),
        "weather": faker.helpers.multiple(createOpenWeatherWeatherMockData, {count: {min: 1, max: 3}}),
        "pop": faker.number.float({min: 0, max: 1, fractionDigits: 2}),
    }
}

export function createOpenWeatherAlertMockData() {
    return {
        "sender_name": faker.person.fullName(),
        "event": faker.lorem.words(),
        "start": faker.number.int(),
        "end": faker.number.int(),
        "description": faker.lorem.sentence(),
        "tags": faker.helpers.multiple(faker.word.words)
    }
}

export function createOpenWeatherMinutelyMockData() {
    return {
        "dt": faker.number.int(),
        "precipitation": faker.number.float({min: 0, max: 600, fractionDigits: 2})
    }
}

export function createOpenWeatherOneCallMockData() {
    const timezone = faker.location.timeZone();
    const timezoneOffset = DateTime.local().setZone(timezone).offset;

    return {
        "lat": faker.location.longitude({precision: 4}),
        "lon": faker.location.latitude({precision: 4}),
        "timezone": timezone,
        "timezone_offset": timezoneOffset,
        "current": createOpenWeatherCurrentMockData(),
        "minutely": faker.helpers.multiple(createOpenWeatherMinutelyMockData, {count: 60}),
        "hourly": faker.helpers.multiple(createOpenWeatherHourlyMockData, {count: 48}),
        "daily": faker.helpers.multiple(createOpenWeatherDailyMockData, {count: 14}),
        "alerts":faker.helpers.multiple(createOpenWeatherAlertMockData, {count: {min: 0, max: 2}}),
    }
}