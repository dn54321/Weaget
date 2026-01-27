import { HttpResponse, http } from "msw";
import type { JsonBodyType, RequestHandlerOptions } from "msw";
import { createLocationLookupMock } from "./location-lookup.mock";

export const locationLookupHandler = [
    http.get("/api/location/:id", () => {
        return HttpResponse.json(createLocationLookupMock());
    }),
];

export function mockLocationLookupHandle(response: HttpResponse<JsonBodyType>, options?: RequestHandlerOptions) {
    return http.get(
        "/api/location/:id",
        () => response,
        options,
    );
}
