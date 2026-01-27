import { HttpResponse, http } from "msw";
import type { JsonBodyType, RequestHandlerOptions } from "msw";
import { createNearbyLocationMockData } from "./nearby-location.mock";

export const nearbyLocationHandler = [
    http.get("/api/location/nearby-search", () => {
        return HttpResponse.json(createNearbyLocationMockData());
    }),
];

export function mockNearbyLocationHandle(response: HttpResponse<JsonBodyType>, options?: RequestHandlerOptions) {
    return http.get(
        "/api/location/nearby-search",
        () => response,
        options,
    );
}
