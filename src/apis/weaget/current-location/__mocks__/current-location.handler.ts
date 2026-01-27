import { http, HttpResponse, RequestHandlerOptions } from "msw";

import { createCurrentLocationMockData } from "./current-location.mock";

export const currentLocationHandler = [
    http.get("/api/location", () => {
        return HttpResponse.json(createCurrentLocationMockData());
    })
];

export function mockCurrentLocationHandle(response: HttpResponse, options?: RequestHandlerOptions) {
    return http.get(
        "/api/location",
        () => response,
        options
    );
}
