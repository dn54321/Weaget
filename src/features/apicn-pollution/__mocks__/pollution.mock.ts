import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";

function createApicnPollutionAttributionMockData() {
    return {
        "url": faker.internet.url({ appendSlash: true }),
        "name": faker.company.name(),
        "logo": faker.system.commonFileName('png')
    }
}

function createApicnPollutionRollingAverage() {
    const a = faker.number.int();
    const b = faker.number.int();
    const lb = Math.min(a,b);
    const ub = Math.max(a,b);
    return {
        "avg": faker.number.int({min: lb, max: ub}),
        "day": DateTime.fromJSDate(faker.date.anytime()).toFormat("y-LL-dd"),
        "max": ub,
        "min": lb
    }
}

export function createApicnPollutionResultMockData() {
    const randDate = DateTime.fromJSDate(faker.date.anytime());
    return {
        "aqi": faker.number.int({min: 0, max: 200}),
        "idx": faker.number.int(),
        "attributions": faker.helpers.multiple(createApicnPollutionAttributionMockData, {count: {min: 1, max: 3}}),
        "city": {
            "geo": [
                faker.location.latitude({precision: 6}),
                faker.location.longitude({precision: 6})
            ],
            "name": faker.location.city(),
            "url": faker.internet.url(),
            "location": ""
        },
        "dominentpol": "pm25",
        "iaqi": {
            "co": {
                "v": faker.number.float({min:0, max:200, fractionDigits: 1}),
            },
            "h": {
                "v": faker.number.float({min:0, max:200, fractionDigits: 1}),
            },
            "neph": {
                "v": faker.number.float({min:0, max:200, fractionDigits: 1}),
            },
            "no2": {
                "v": faker.number.float({min:0, max:200, fractionDigits: 1}),
            },
            "o3": {
                "v": faker.number.float({min:0, max:200, fractionDigits: 1}),
            },
            "p": {
                "v": faker.number.float({min:0, max:200, fractionDigits: 1}),
            },
            "pm10": {
                "v": faker.number.float({min:0, max:200, fractionDigits: 1}),
            },
            "pm25": {
                "v": faker.number.float({min:0, max:200, fractionDigits: 1}),
            },
            "so2": {
                "v": faker.number.float({min:0, max:200, fractionDigits: 1}),
            },
            "t": {
                "v": faker.number.float({min:0, max:200, fractionDigits: 1}),
            },
            "w": {
                "v": faker.number.float({min:0, max:200, fractionDigits: 1}),
            },
            "wg": {
                "v": faker.number.float({min:0, max:200, fractionDigits: 1}),
            }
        },
        "time": {
            "s": randDate.toFormat('y-LL-dd TT'),
            "tz": randDate.toFormat('ZZ'),
            "v": randDate.toSeconds(),
            "iso": `${randDate.toISO()}`
        },
        "forecast": {
            "daily": {
                "o3": faker.helpers.multiple(createApicnPollutionRollingAverage, {count: 7}),
                "pm10": faker.helpers.multiple(createApicnPollutionRollingAverage, {count: 7}),
                "pm25": faker.helpers.multiple(createApicnPollutionRollingAverage, {count: 7})
            }
        },
        "debug": {
            "sync": faker.date.past()
        }
    }
}

export function createApicnPollutionMockData() {
    return {
        "status": "ok",
        "data": createApicnPollutionResultMockData()
    }
}