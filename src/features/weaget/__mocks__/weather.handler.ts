import { HttpResponse, RequestHandlerOptions, http } from "msw";
import { createWeatherMockData } from "./weather.mock";

export const weatherHandler = [
    http.get("api/weather/:location", () => {
        return HttpResponse.json(createWeatherMockData());
    }),
];

export function mockWeatherHandle(response: HttpResponse, options?: RequestHandlerOptions) {
    return http.get(
        "api/weather/:location",
        () => response,
        options,
    );
}
