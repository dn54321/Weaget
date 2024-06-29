import { HttpResponse, RequestHandlerOptions, http } from "msw";
import { createNearbyLocationMockData } from "./nearby-location.mock";

export const nearbyLocationHandler = [
    http.get("/api/location/nearby-search", () => {
        return HttpResponse.json(createNearbyLocationMockData());
    }),
];

export function mockNearbyLocationHandle(response: HttpResponse, options?: RequestHandlerOptions) {
    return http.get(
        "/api/location/nearby-search",
        () => response,
        options
    );
}
