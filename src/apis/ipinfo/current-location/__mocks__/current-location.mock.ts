import { faker } from "@faker-js/faker";

export function createIpInfoCurrentLocationMock() {
    return {
        city: faker.location.city(),
        country: faker.location.countryCode(),
        hostname: faker.internet.domainName(),
        ip: faker.internet.ipv4(),
        loc: `${faker.location.latitude()},${faker.location.longitude()}`,
        org: faker.company.name(),
        postal: faker.location.zipCode(),
        region: faker.location.state(),
        timezone: faker.location.timeZone()
    };
}
