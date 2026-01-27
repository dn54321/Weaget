import { HttpResponse, http } from "msw";
import type { JsonBodyType, RequestHandlerOptions } from "msw";
import { createOpenWeatherOneCallMockData } from "./oneCall.mock";

export const openWeatherOneCallHandler = [
    http.get("https://api.openweathermap.org/data/3.0/onecall", () => {
        return HttpResponse.json(createOpenWeatherOneCallMockData());
    }),
];

export function mockOpenWeatherOneCallHandle(response: HttpResponse<JsonBodyType>, options?: RequestHandlerOptions) {
    return http.get(
        "https://api.openweathermap.org/data/3.0/onecall",
        () => response,
        options,
    );
}
