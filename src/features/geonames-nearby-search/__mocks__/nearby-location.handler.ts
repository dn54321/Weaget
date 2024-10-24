import { http, HttpResponse, RequestHandlerOptions } from "msw";
import { createGeonamesNearbyLocationMockData } from "./nearby-location.mock";

export const geonamesNearbyLocationHandler = [
    http.get("http://api.geonames.org/findNearbyJSON", () => {
        return HttpResponse.json(createGeonamesNearbyLocationMockData());
    }),
];

export function mockGeonamesNearbyLocationHandle(response: HttpResponse, options?: RequestHandlerOptions) {
    return http.get(
        "http://api.geonames.org/findNearbyJSON",
        () => response,
        options,
    );
}
