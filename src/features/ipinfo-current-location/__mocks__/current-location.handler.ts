import { HttpResponse, http } from "msw";
import type { JsonBodyType, RequestHandlerOptions } from "msw";
import { createIpInfoCurrentLocationMock } from "./current-location.mock";

export const ipinfoCurrentLocationHandler = [
    http.get("https://ipinfo.io/*", () => {
        return HttpResponse.json(createIpInfoCurrentLocationMock());
    }),
];

export function mockIpinfoCurrentLocationHandle(response: HttpResponse<JsonBodyType>, options?: RequestHandlerOptions) {
    return http.get(
        "https://ipinfo.io/*",
        () => response,
        options,
    );
}
