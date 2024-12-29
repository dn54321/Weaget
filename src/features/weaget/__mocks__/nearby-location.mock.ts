import { faker } from "@faker-js/faker";

export interface createNearbyLocationMockDataArgs {
    count?: number;
}

export function createNearbyLocationMockData(args?: createNearbyLocationMockDataArgs) {
    return faker.helpers.multiple(() => ({
        country: faker.location.country(),
        name: faker.location.city(),
        state: faker.location.state(),
    }), args);
}
