import { HttpResponse, http } from "msw";
import type { JsonBodyType, RequestHandlerOptions } from "msw";
import { createCurrentLocationMockData } from "./current-location.mock";

export const currentLocationHandler = [
    http.get("/api/location", () => {
        return HttpResponse.json(createCurrentLocationMockData());
    }),
];

export function mockCurrentLocationHandle(response: HttpResponse<JsonBodyType>, options?: RequestHandlerOptions) {
    return http.get(
        "/api/location",
        () => response,
        options,
    );
}
