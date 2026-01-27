import { locationAutoCompleteApiHandler } from "@src/apis/google/location-autocomplete/__mocks__/location-auto-complete.handler";
import { googleLocationLookupHandler } from "@src/apis/google/location-lookup/__mocks__/location-lookup.handler";

export const mockGoogleApiHandler = [
    ...locationAutoCompleteApiHandler,
    ...googleLocationLookupHandler
];
