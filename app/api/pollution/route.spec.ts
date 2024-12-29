import { afterEach, describe, expect, it } from "vitest";
import { GET } from "./route";
import { createMockRequest } from "@utils/next-mock-request-builder";
import { mockApicnPollutionHandle } from "@features/apicn-pollution/__mocks__/pollution.handler";
import { server } from "@project/vitest-setup";
import { withHandleError } from "@utils/msw-http-mocker";

// All IP addresses generated with:
// https://commentpicker.com/ip-address-generator.php

describe("Route: api/pollution", async () => {
    afterEach(() => {
        server.resetHandlers();
    });

    it("should return 200 status when lat and lng is set.", async () => {
        const request = createMockRequest({
            params: { lat: "1.23", lng: "4.56" },
            path: "/api/location",
        });

        const response = await GET(request);
        expect(response?.status).toBe(200);
    });

    it("should return 500 when unexpected error occurs.", async () => {
        withHandleError(mockApicnPollutionHandle);
        const request = createMockRequest({
            params: { lat: "1.23", lng: "4.56" },
            path: "/api/location",
        });

        const response = await GET(request);
        expect(response?.status).toBe(500);
    });
});
