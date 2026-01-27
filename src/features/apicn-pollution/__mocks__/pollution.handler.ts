import { HttpResponse, http } from "msw";
import type { JsonBodyType, RequestHandlerOptions } from "msw";
import { createApicnPollutionMockData } from "./pollution.mock";

export const apicnPollutionHandler = [
    http.get("https://api.waqi.info/feed/geo*", () => {
        return HttpResponse.json(createApicnPollutionMockData());
    }),
];

export function mockApicnPollutionHandle(response: HttpResponse<JsonBodyType>, options?: RequestHandlerOptions) {
    return http.get(
        "https://api.waqi.info/feed/geo*",
        () => response,
        options,
    );
}
