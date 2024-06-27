import { faker } from "@faker-js/faker";

export function createNearbyLocationMockData() {
    return faker.helpers.multiple(() => ({
        name: faker.location.city(),
        state: faker.location.state(),
        country: faker.location.country()
    }));
}