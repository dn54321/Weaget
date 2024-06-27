import { faker } from "@faker-js/faker";

export function createGeonameMockData() {
    return {
        "adminCode1": "04",
        "lng": faker.location.longitude({precision: 6}),
        "distance": String(faker.number.int()),
        "geonameId": faker.number.int(),
        "toponymName": faker.location.city(),
        "countryId": String(faker.number.int()),
        "fcl": "P",
        "population": faker.number.int(),
        "countryCode": faker.location.countryCode('alpha-2'),
        "name": faker.location.country(),
        "fclName": "city, village,...",
        "countryName": faker.location.country(),
        "fcodeName": "seat of a second-order administrative division",
        "adminName1": faker.location.country(),
        "lat": faker.location.latitude({precision: 6}),
        "fcode": "PPLA2"
    }
}

export function createGeonamesNearbyLocationMockData() {
    return {
        geonames: faker.helpers.multiple(createGeonameMockData, {count:{min:2,max:5}})
    }
}