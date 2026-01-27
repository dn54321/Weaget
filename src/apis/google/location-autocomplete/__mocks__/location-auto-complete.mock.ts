import { faker } from "@faker-js/faker";
import { AddressTypes } from "@src/apis/google/location-lookup/location-lookup.model";

export function createGoogleLocationAutoCompleteMockData() {
    return (
        {
            predictions: faker.helpers.multiple(createGoogleLocationAutoCompletePredictionMock),
            status: "OK"
        }
    );
}

function createGoogleLocationAutoCompleteMatchedSubstringMock() {
    return ({
        length: faker.number.int(),
        offset: faker.number.int()
    });
}

function createGoogleLocationAutoCompletePredictionMock() {
    return (
        {
            description: faker.location.streetAddress(),
            matched_substrings: faker.helpers.multiple(createGoogleLocationAutoCompleteMatchedSubstringMock),
            place_id: faker.string.alphanumeric(27),
            reference: faker.string.alphanumeric(27),
            structured_formatting: {
                main_text: faker.location.city(),
                main_text_matched_substrings: faker.helpers.multiple(createGoogleLocationAutoCompleteMatchedSubstringMock),
                secondary_text: `${faker.location.state()}, ${faker.location.country()}`
            },
            terms: faker.helpers.multiple(createGoogleLocationAutoCompleteTermMock),
            types: faker.helpers.multiple(() => faker.helpers.enumValue(AddressTypes))
        }
    );
}

function createGoogleLocationAutoCompleteTermMock() {
    return ({
        offset: faker.number.int(),
        value: faker.location.country()
    });
}
