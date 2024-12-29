import { AddressTypes } from "@features/google-geocode/location-lookup.model";
import { faker } from "@faker-js/faker";

function createLocationLookupAddressComponentMock() {
    return {
        longName: faker.location.city(),
        shortName: faker.location.city(),
        types: faker.helpers.multiple(() => faker.helpers.enumValue(AddressTypes)),
    };
}

export function createLocationLookupMock() {
    return ({
        results: [
            {
                addressComponents: faker.helpers.multiple(createLocationLookupAddressComponentMock),
                entrances: [],
                formattedAddress: `${faker.location.city()} ${faker.location.state}, ${faker.location.country()}`,
                geometry: {
                    bounds: {
                        northeast: {
                            lat: faker.location.latitude({ precision: 6 }),
                            lng: faker.location.longitude({ precision: 6 }),
                        },
                        southwest: {
                            lat: faker.location.latitude({ precision: 6 }),
                            lng: faker.location.longitude({ precision: 6 }),
                        },
                    },
                    location: {
                        lat: faker.location.latitude({ precision: 6 }),
                        lng: faker.location.longitude({ precision: 6 }),
                    },
                    locationType: "APPROXIMATE",
                    viewport: {
                        northeast: {
                            lat: faker.location.latitude({ precision: 6 }),
                            lng: faker.location.longitude({ precision: 6 }),
                        },
                        southwest: {
                            lat: faker.location.latitude({ precision: 6 }),
                            lng: faker.location.longitude({ precision: 6 }),
                        },
                    },
                },
                placeId: faker.string.alphanumeric(27),
                types: faker.helpers.multiple(() => faker.helpers.enumValue(AddressTypes)),
            },
        ],
        status: "OK",
    });
}
