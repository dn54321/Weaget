import { faker } from "@faker-js/faker";

export function createIpInfoCurrentLocationMock() {
    return {
        ip: faker.internet.ipv4(),
        hostname: faker.internet.domainName(),
        city: faker.location.city(),
        region: faker.location.state(),
        country: faker.location.countryCode(),
        loc: `${faker.location.latitude()},${faker.location.longitude()}`,
        org: faker.company.name(),
        postal: faker.location.zipCode(),
        timezone: faker.location.timeZone(),
    };
}
