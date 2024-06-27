import { faker } from "@faker-js/faker"
import { AddressTypes } from "../location-lookup.model";

function createGoogleLocationLookupAddressComponentMock() {
    return {
        "long_name": faker.location.city(),
        "short_name": faker.location.city(),
        "types": faker.helpers.multiple(() => faker.helpers.enumValue(AddressTypes))
    };
}

export function createGoogleLocationLookupMock() {
    return ({
        "results": [
            {
                "address_components": faker.helpers.multiple(createGoogleLocationLookupAddressComponentMock),
                "entrances": [],
                "formatted_address": `${faker.location.city()} ${faker.location.state}, ${faker.location.country()}`,
                "geometry": {
                    "bounds": {
                        "northeast": {
                            "lat": faker.location.latitude({ precision: 6}),
                            "lng": faker.location.longitude({ precision: 6}),
                        },
                        "southwest": {
                            "lat": faker.location.latitude({ precision: 6}),
                            "lng": faker.location.longitude({ precision: 6})
                        }
                    },
                    "location": {
                        "lat": faker.location.latitude({ precision: 6}),
                        "lng": faker.location.longitude({ precision: 6})
                    },
                    "location_type": "APPROXIMATE",
                    "viewport": {
                        "northeast": {
                            "lat": faker.location.latitude({ precision: 6}),
                            "lng": faker.location.longitude({ precision: 6})
                        },
                        "southwest": {
                            "lat": faker.location.latitude({ precision: 6}),
                            "lng": faker.location.longitude({ precision: 6})
                        }
                    }
                },
                "place_id": faker.string.alphanumeric(27),
                "plus_code": {
                    "compound_code": faker.string.alphanumeric(16),
                    "global_code": faker.string.alphanumeric(8)
                },
                "types": faker.helpers.multiple(() => faker.helpers.enumValue(AddressTypes))
            }
        ],
        "status": "OK"
    })
}