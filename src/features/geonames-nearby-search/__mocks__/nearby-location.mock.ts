import { faker } from "@faker-js/faker";

export function createGeonameMockData() {
    return {
        adminCode1: "04",
        adminName1: faker.location.country(),
        countryCode: faker.location.countryCode("alpha-2"),
        countryId: String(faker.number.int()),
        countryName: faker.location.country(),
        distance: String(faker.number.int()),
        fcl: "P",
        fclName: "city, village,...",
        fcode: "PPLA2",
        fcodeName: "seat of a second-order administrative division",
        geonameId: faker.number.int(),
        lat: faker.location.latitude({ precision: 6 }),
        lng: faker.location.longitude({ precision: 6 }),
        name: faker.location.country(),
        population: faker.number.int(),
        toponymName: faker.location.city(),
    };
}

export function createGeonamesNearbyLocationMockData() {
    return {
        geonames: faker.helpers.multiple(createGeonameMockData, { count: { max: 5, min: 2 } }),
    };
}
