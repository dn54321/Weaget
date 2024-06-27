import { faker } from "@faker-js/faker";


export function createCoordsMockData() {
    return faker.helpers.multiple(() => ({
        lat: faker.location.latitude(),
        lng: faker.location.longitude()
    }));
}
