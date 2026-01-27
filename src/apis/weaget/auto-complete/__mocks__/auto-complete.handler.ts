import { withSearchParams } from "@utils/msw-resolver";
import { http, HttpResponse, RequestHandlerOptions } from "msw";

import { createAutoCompleteMockData } from "./auto-complete.mock";

export const autoCompleteHandler = [
    http.get("/api/location/auto-complete", withSearchParams(
        params => params.has("input"),
        () => HttpResponse.json(createAutoCompleteMockData())
    )),
    http.get("/api/location/auto-complete", () => {
        return HttpResponse.json({
            id: crypto.randomUUID(),
            message: "Failed to retrieve location suggestion."
        });
    })
];

export function mockAutoCompleteHandle(response: HttpResponse, options?: RequestHandlerOptions) {
    return http.get(
        "/api/location/auto-complete",
        () => response,
        options
    );
}
