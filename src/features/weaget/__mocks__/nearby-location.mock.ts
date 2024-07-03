import { faker } from "@faker-js/faker";

export interface createNearbyLocationMockDataArgs {
    count?: number;
}

export function createNearbyLocationMockData(args?: createNearbyLocationMockDataArgs) {
    return faker.helpers.multiple(() => ({
        name: faker.location.city(),
        state: faker.location.state(),
        country: faker.location.country(),
    }), args);
}
