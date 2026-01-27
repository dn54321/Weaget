import type ApicnPollutionModel from "@features/apicn-pollution/pollution.types";
import { DateTime } from "luxon";
import { faker } from "@faker-js/faker";

function createApicnPollutionAttributionMockData() {
    return {
        logo: faker.system.commonFileName("png"),
        name: faker.company.name(),
        url: faker.internet.url({ appendSlash: true }),
    };
}

function createApicnPollutionRollingAverage() {
    const a = faker.number.int();
    const b = faker.number.int();
    const lb = Math.min(a, b);
    const ub = Math.max(a, b);
    return {
        avg: faker.number.int({ max: ub, min: lb }),
        day: DateTime.fromJSDate(faker.date.anytime()).toFormat("y-LL-dd"),
        max: ub,
        min: lb,
    };
}

export function createApicnPollutionResultMockData() {
    const randDate = DateTime.fromJSDate(faker.date.anytime());
    return {
        aqi: faker.number.int({ max: 200, min: 0 }),
        attributions: faker.helpers.multiple(createApicnPollutionAttributionMockData, { count: { max: 3, min: 1 } }),
        city: {
            geo: [
                faker.location.latitude({ precision: 6 }),
                faker.location.longitude({ precision: 6 }),
            ],
            location: "",
            name: faker.location.city(),
            url: faker.internet.url(),
        },
        debug: {
            sync: faker.date.past(),
        },
        dominentpol: "pm25",
        forecast: {
            daily: {
                o3: faker.helpers.multiple(createApicnPollutionRollingAverage, { count: 7 }),
                pm10: faker.helpers.multiple(createApicnPollutionRollingAverage, { count: 7 }),
                pm25: faker.helpers.multiple(createApicnPollutionRollingAverage, { count: 7 }),
            },
        },
        iaqi: {
            co: {
                v: faker.number.float({ fractionDigits: 1, max: 200, min: 0 }),
            },
            h: {
                v: faker.number.float({ fractionDigits: 1, max: 200, min: 0 }),
            },
            neph: {
                v: faker.number.float({ fractionDigits: 1, max: 200, min: 0 }),
            },
            no2: {
                v: faker.number.float({ fractionDigits: 1, max: 200, min: 0 }),
            },
            o3: {
                v: faker.number.float({ fractionDigits: 1, max: 200, min: 0 }),
            },
            p: {
                v: faker.number.float({ fractionDigits: 1, max: 200, min: 0 }),
            },
            pm10: {
                v: faker.number.float({ fractionDigits: 1, max: 200, min: 0 }),
            },
            pm25: {
                v: faker.number.float({ fractionDigits: 1, max: 200, min: 0 }),
            },
            so2: {
                v: faker.number.float({ fractionDigits: 1, max: 200, min: 0 }),
            },
            t: {
                v: faker.number.float({ fractionDigits: 1, max: 200, min: 0 }),
            },
            w: {
                v: faker.number.float({ fractionDigits: 1, max: 200, min: 0 }),
            },
            wg: {
                v: faker.number.float({ fractionDigits: 1, max: 200, min: 0 }),
            },
        },
        idx: faker.number.int(),
        time: {
            iso: `${randDate.toISO()}`,
            s: randDate.toFormat("y-LL-dd TT"),
            tz: randDate.toFormat("ZZ"),
            v: randDate.toSeconds(),
        },
    };
}

export function createApicnPollutionMockData(): ApicnPollutionModel {
    return {
        data: createApicnPollutionResultMockData(),
        status: "ok",
    };
}
