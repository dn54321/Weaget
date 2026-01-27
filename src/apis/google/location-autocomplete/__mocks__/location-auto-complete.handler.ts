import { http, HttpResponse, RequestHandlerOptions } from "msw";

import { createGoogleLocationAutoCompleteMockData } from "./location-auto-complete.mock";

export const locationAutoCompleteApiHandler = [
    http.get("https://maps.googleapis.com/maps/api/place/autocomplete/json*", () => {
        return HttpResponse.json(createGoogleLocationAutoCompleteMockData());
    })
];

export function mockGoogleLocationAutoCompleteHandle(response: HttpResponse, options?: RequestHandlerOptions) {
    return http.get(
        "https://maps.googleapis.com/maps/api/place/autocomplete/json*",
        () => response,
        options
    );
}
