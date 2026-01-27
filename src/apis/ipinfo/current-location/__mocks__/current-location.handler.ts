import { http, HttpResponse, RequestHandlerOptions } from "msw";

import { createIpInfoCurrentLocationMock } from "./current-location.mock";

export const currentLocationApiHandler = [
    http.get("https://ipinfo.io*", () => {
        return HttpResponse.json(createIpInfoCurrentLocationMock());
    })
];

export function mockIpinfoCurrentLocationHandle(response: HttpResponse, options?: RequestHandlerOptions) {
    return http.get(
        "https://ipinfo.io/*",
        () => response,
        options
    );
}
