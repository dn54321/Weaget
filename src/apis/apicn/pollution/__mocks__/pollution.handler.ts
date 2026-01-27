import { APICN_BASE_URL } from "@src/apis/apicn/config";
import { http, HttpResponse, RequestHandlerOptions } from "msw";

import { createApicnPollutionMockData } from "./pollution.mock";

export const mockPollutionApiHandler = [
    http.get(`${APICN_BASE_URL}/feed/geo*`, () => {
        return HttpResponse.json(createApicnPollutionMockData());
    })
];

export function mockPollutionResponse(response: HttpResponse, options?: RequestHandlerOptions) {
    return http.get(
        `${APICN_BASE_URL}/feed/geo*`,
        () => response,
        options
    );
}
