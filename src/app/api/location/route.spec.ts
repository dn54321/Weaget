import { server } from "@project/vitest-setup";
import { mockIpinfoCurrentLocationHandle } from "@src/apis/ipinfo/current-location/__mocks__/current-location.handler";
import { withHandleError } from "@utils/msw-http-mocker";
import { createMockRequest } from "@utils/next-mock-request-builder";
import { afterEach, describe, expect, it, test } from "vitest";

import { GET } from "./route";

// All IP addresses generated with:
// https://commentpicker.com/ip-address-generator.php

describe("Route: location", async () => {
    afterEach(() => {
        server.resetHandlers();
    });

    test.each([
        ["55.201.252.167"],
        ["2c2e:e260:2888:ee4c:c061:7e5e:53ff:d4ce"],
        ["::ffff:127.0.0.1"]
    ])("should return 200 status when x-forwarded-for is set to \"%s\".",
        async (ip: string) => {
            const request = createMockRequest({
                headers: { "x-forwarded-for": ip },
                path: "/api/location"
            });

            const response = await GET(request);
            expect(response.status).toBe(200);
        });

    it("should return 500 when unexpected error occurs.", async () => {
        withHandleError(mockIpinfoCurrentLocationHandle);
        const request = createMockRequest({
            headers: { "x-forwarded-for": "55.201.252.167" },
            path: "/api/location"
        });
        const response = await GET(request);
        expect(response.status).toBe(500);
    });

    it("should return 500 when there's no ip address supplied.", async () => {
        const request = createMockRequest({
            path: "/api/location"
        });
        const response = await GET(request);
        expect(response.status).toBe(500);
    });
});
