import { HttpResponse, RequestHandlerOptions, http } from "msw";
import { createLocationLookupMock } from "./location-lookup.mock";

export const locationLookupHandler = [
    http.get('/api/location/:id', () => {
        return HttpResponse.json(createLocationLookupMock())
    }),
];

export function mockLocationLookupHandle(response: HttpResponse, options?: RequestHandlerOptions) {
    return http.get(
        '/api/location/:id',
        () => response,
        options
    )
}