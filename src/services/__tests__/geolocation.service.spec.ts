import { afterEach, describe, expect, it, test } from "vitest";
import { getLocationAutocompleteSuggestions, getLocationDetails, getLocationDetailsByIp, getNearbyLocationDetails } from "@services/geolocation.service";
import { HttpResponse } from "msw";
import { createGeonamesNearbyLocationMockData } from "@features/geonames-nearby-search/__mocks__/nearby-location.mock";
import { createGoogleLocationAutoCompleteMockData } from "@features/google-geocode/__mocks__/location-auto-complete.mock";
import { createGoogleLocationLookupMock } from "@features/google-geocode/__mocks__/location-lookup.mock";
import { createIpInfoCurrentLocationMock } from "@features/ipinfo-current-location/__mocks__/current-location.mock";
import { faker } from "@faker-js/faker";
import geonamesNearbyLocationSchema from "@features/geonames-nearby-search/nearby-location.schema";
import { googleLocationAutoCompleteSchema } from "@features/google-geocode/location-auto-complete.schema";
import googleLocationLookupSchema from "@features/google-geocode/location-lookup.schema";
import { ipinfoCurrentLocationSchema } from "@features/ipinfo-current-location/current-location.schema";
import { mockGeonamesNearbyLocationHandle } from "@features/geonames-nearby-search/__mocks__/nearby-location.handler";
import { mockGoogleLocationAutoCompleteHandle } from "@features/google-geocode/__mocks__/location-auto-complete.handler";
import { mockGoogleLocationHandle } from "@features/google-geocode/__mocks__/location-lookup.handler";
import { mockIpinfoCurrentLocationHandle } from "@features/ipinfo-current-location/__mocks__/current-location.handler";
import { server } from "@project/vitest-setup";

describe("Geolocation Service", async () => {
    afterEach(() => {
        server.resetHandlers();
    });

    describe("getLocationDetails", async () => {
        it("should expect location without region to return valid response.", async () => {
            const mockLocationData = createGoogleLocationLookupMock();
            server.use(mockGoogleLocationHandle(HttpResponse.json(mockLocationData)));
            await expect(getLocationDetails("mockLocation"))
                .resolves
                .toEqual(googleLocationLookupSchema.parse(mockLocationData));
        });

        it("should expect location with region to return valid response.", async () => {
            const mockLocationData = createGoogleLocationLookupMock();
            server.use(mockGoogleLocationHandle(HttpResponse.json(mockLocationData)));
            await expect(getLocationDetails("mockLocation", "mockRegion"))
                .resolves
                .toEqual(googleLocationLookupSchema.parse(mockLocationData));
        });

        it("should expect function to throw on unexpected response.", async () => {
            server.use(mockGoogleLocationHandle(HttpResponse.json({ data: "test", status: "OK" })));
            await expect(getLocationDetails("mockLocation", "mockRegion"))
                .rejects
                .toThrow();
        });

        test.each([
            [401], [403], [404], [405], [406], [500], [502], [504],
        ])("should expect invalid response to throw error on %i status code.", async (statusCode: number) => {
            server.use(mockGoogleLocationHandle(HttpResponse.json(null, { status: statusCode })));
            await expect(getLocationDetails("mockLocation", "mockRegion"))
                .rejects
                .toBeTypeOf("object");
        });

        test.each([
            ["OVER_DAILY_LIMIT"],
            ["OVER_QUERY_LIMIT"],
            ["REQUEST_DENIED"],
            ["INVALID_REQUEST"],
            ["UNKNOWN_ERROR"],
        ])("should expect invalid response to throw error on %s request status.", async (requestStatus: string) => {
            const mockData = {
                ...createGoogleLocationLookupMock(),
                status: requestStatus,
            };

            server.use(mockGoogleLocationHandle(HttpResponse.json(mockData)));
            await expect(getLocationDetails("mockLocation", "mockRegion"))
                .rejects
                .toThrow();
        });

        test.each([
            ["OK"],
            ["ZERO_RESULTS"],
        ])("should expect valid response on %s request status.", async (requestStatus: string) => {
            const mockData = {
                ...createGoogleLocationLookupMock(),
                status: requestStatus,
            };

            server.use(mockGoogleLocationHandle(HttpResponse.json(mockData)));
            await expect(getLocationDetails("mockLocation", "mockRegion"))
                .resolves
                .toMatchObject({ status: requestStatus });
        });
    });

    describe("getLocationDetailsByIp", async () => {
        it("should expect location with IP to return valid response.", async () => {
            const mockLocationDetailsData = createIpInfoCurrentLocationMock();
            const responseData = ipinfoCurrentLocationSchema.parse(mockLocationDetailsData);
            server.use(mockIpinfoCurrentLocationHandle(HttpResponse.json(mockLocationDetailsData)));
            await expect(getLocationDetailsByIp("mockLocation"))
                .resolves
                .toEqual(responseData);
        });

        it("should expect bogon response to return valid response.", async () => {
            const mockLocationDetailsData = createIpInfoCurrentLocationMock();
            const responseData = ipinfoCurrentLocationSchema.parse(mockLocationDetailsData);
            server.use(mockIpinfoCurrentLocationHandle(HttpResponse.json(mockLocationDetailsData)));
            server.use(mockIpinfoCurrentLocationHandle(HttpResponse.json({ bogon: true, ip: "::1" }), { once: true }));
            await expect(getLocationDetailsByIp("mockLocation"))
                .resolves
                .toEqual(responseData);
        });

        it("should expect bogon response to throw without retry enabled.", async () => {
            const mockLocationDetailsData = createIpInfoCurrentLocationMock();
            server.use(mockIpinfoCurrentLocationHandle(HttpResponse.json(mockLocationDetailsData)));
            server.use(mockIpinfoCurrentLocationHandle(HttpResponse.json({ bogon: true, ip: "::1" }), { once: true }));
            await expect(getLocationDetailsByIp("mockLocation", false))
                .rejects
                .toThrow();
        });

        it("should expect function to throw on unexpected response", async () => {
            const mockLocationDetailsData = { data: "unexpected response" };
            server.use(mockIpinfoCurrentLocationHandle(HttpResponse.json(mockLocationDetailsData)));
            await expect(getLocationDetailsByIp("mockLocation", false))
                .rejects
                .toThrow();
        });

        test.each([
            [401], [403], [404], [405], [406], [500], [502], [504],
        ])("should expect invalid response to throw error on %i status code.", async (statusCode: number) => {
            const mockLocationDetailsData = createIpInfoCurrentLocationMock();
            server.use(mockIpinfoCurrentLocationHandle(HttpResponse.json(mockLocationDetailsData, { status: statusCode })));
            await expect(getLocationDetailsByIp("mockLocation"))
                .rejects
                .toThrow();
        });
    });

    describe("getNearbyLocationDetails", () => {
        it("should expect location with lat and lng to return valid response.", async () => {
            const mockNearbyLocationData = createGeonamesNearbyLocationMockData();
            const responseData = geonamesNearbyLocationSchema.parse(mockNearbyLocationData);
            server.use(mockGeonamesNearbyLocationHandle(HttpResponse.json(mockNearbyLocationData)));
            await expect(getNearbyLocationDetails(0, 0))
                .resolves
                .toEqual(responseData);
        });

        it("should expect function to throw on unexpected response.", async () => {
            const mockNearbyLocationData = { data: "unexpected response" };
            server.use(mockGeonamesNearbyLocationHandle(HttpResponse.json(mockNearbyLocationData)));
            await expect(getNearbyLocationDetails(0, 0))
                .rejects
                .toThrow();
        });

        test.each([
            [401], [403], [404], [405], [406], [500], [502], [504],
        ])("should expect invalid response to throw error on %i status code.", async (statusCode: number) => {
            const mockNearbyLocationData = createGeonamesNearbyLocationMockData();
            const responseData = geonamesNearbyLocationSchema.parse(mockNearbyLocationData);
            server.use(mockGeonamesNearbyLocationHandle(HttpResponse.json(responseData, { status: statusCode })));
            await expect(getNearbyLocationDetails(0, 0))
                .rejects
                .toThrow();
        });
    });

    describe("getLocationAutocompleteSuggestions", () => {
        it("should expect location suggestion with valid input to return location suggestions.", async () => {
            const mockLocationAutocompleteData = createGoogleLocationAutoCompleteMockData();
            const responseData = googleLocationAutoCompleteSchema.parse(mockLocationAutocompleteData);
            server.use(mockGoogleLocationAutoCompleteHandle(HttpResponse.json(mockLocationAutocompleteData)));
            await expect(getLocationAutocompleteSuggestions("mockInput"))
                .resolves
                .toEqual(responseData);
        });

        it("should expect location suggestion with valid input and params to return location suggestions.", async () => {
            const mockLocationAutocompleteData = createGoogleLocationAutoCompleteMockData();
            const responseData = googleLocationAutoCompleteSchema.parse(mockLocationAutocompleteData);
            server.use(mockGoogleLocationAutoCompleteHandle(HttpResponse.json(mockLocationAutocompleteData)));
            const location = `${faker.location.latitude},${faker.location.longitude}`;
            await expect(getLocationAutocompleteSuggestions("mockInput", { location }))
                .resolves
                .toEqual(responseData);
        });

        it("should expect function to throw on unexpected response.", async () => {
            const mockLocationAutocompleteData = { data: "unexpected response" };
            server.use(mockGoogleLocationAutoCompleteHandle(HttpResponse.json(mockLocationAutocompleteData)));
            await expect(getLocationAutocompleteSuggestions("mockInput"))
                .rejects
                .toThrow();
        });

        test.each([
            [401], [403], [404], [405], [406], [500], [502], [504],
        ])("should expect invalid response to throw error on %i status code.", async (statusCode: number) => {
            const mockLocationAutocompleteData = createGoogleLocationAutoCompleteMockData();
            const responseData = googleLocationAutoCompleteSchema.parse(mockLocationAutocompleteData);
            server.use(mockGoogleLocationAutoCompleteHandle(HttpResponse.json(responseData, { status: statusCode })));
            await expect(getLocationAutocompleteSuggestions("mockInput"))
                .rejects
                .toThrow();
        });
    });
});
