import { HttpResponse, http } from "msw";
import type { JsonBodyType, RequestHandlerOptions } from "msw";
import { createGoogleLocationLookupMock } from "./location-lookup.mock";

export const googleLocationLookupHandler = [
    http.get("https://maps.googleapis.com/maps/api/geocode/json", () => {
        return HttpResponse.json(createGoogleLocationLookupMock());
    }),
];

export function mockGoogleLocationHandle(response: HttpResponse<JsonBodyType>, options?: RequestHandlerOptions) {
    return http.get(
        "https://maps.googleapis.com/maps/api/geocode/json",
        () => response,
        options,
    );
}
