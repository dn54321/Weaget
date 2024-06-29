import { faker } from "@faker-js/faker";

export function createAutoCompleteMockData() {
    return faker.helpers.multiple(() => ({
        main: faker.location.city(),
        secondary: `${faker.location.state()}, ${faker.location.country()}`,
    }));
}
