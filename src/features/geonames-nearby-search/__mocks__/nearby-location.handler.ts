import { HttpResponse, http } from "msw";
import type { JsonBodyType, RequestHandlerOptions } from "msw";
import { createGeonamesNearbyLocationMockData } from "./nearby-location.mock";

export const geonamesNearbyLocationHandler = [
    http.get("http://api.geonames.org/findNearbyJSON", () => {
        return HttpResponse.json(createGeonamesNearbyLocationMockData());
    }),
];

export function mockGeonamesNearbyLocationHandle(response: HttpResponse<JsonBodyType>, options?: RequestHandlerOptions) {
    return http.get(
        "http://api.geonames.org/findNearbyJSON",
        () => response,
        options,
    );
}
