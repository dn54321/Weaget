import { http, HttpResponse, RequestHandlerOptions } from "msw";

import { createOpenWeatherOneCallMockData } from "./one-call.mock";

export const oneCallApiHandler = [
    http.get("https://api.openweathermap.org/data/3.0/onecall*", () => {
        return HttpResponse.json(createOpenWeatherOneCallMockData());
    })
];

export function mockOpenWeatherOneCallHandle(response: HttpResponse, options?: RequestHandlerOptions) {
    return http.get(
        "https://api.openweathermap.org/data/3.0/onecall",
        () => response,
        options
    );
}
