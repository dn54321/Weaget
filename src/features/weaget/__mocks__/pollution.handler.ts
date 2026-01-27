import { HttpResponse, http } from "msw";
import type { JsonBodyType, RequestHandlerOptions } from "msw";
import { createPollutionMockData } from "./pollution.mock";

export const pollutionHandler = [
    http.get("/api/pollution", () => {
        return HttpResponse.json(createPollutionMockData());
    }),
];

export function mockPollutionHandle(response: HttpResponse<JsonBodyType>, options?: RequestHandlerOptions) {
    return http.get(
        "/api/pollution",
        () => response,
        options,
    );
}
