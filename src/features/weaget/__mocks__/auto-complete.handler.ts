import { HttpResponse, RequestHandlerOptions, http } from "msw";
import { createAutoCompleteMockData } from "./auto-complete.mock";
import { withSearchParams } from "@utils/msw-resolver";

export const autoCompleteHandler = [
    http.get("/api/location/auto-complete", withSearchParams(
        params => params.has("input"),
        () => HttpResponse.json(createAutoCompleteMockData()),
    )),
    http.get("/api/location/auto-complete", () => {
        return HttpResponse.json({
            id: crypto.randomUUID(),
            message: "Failed to retrieve location suggestion.",
        });
    }),
];

export function mockAutoCompleteHandle(response: HttpResponse, options?: RequestHandlerOptions) {
    return http.get(
        "/api/location/auto-complete",
        () => response,
        options,
    );
}
