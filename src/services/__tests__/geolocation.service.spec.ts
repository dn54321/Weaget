import { faker } from '@faker-js/faker';
import { HttpResponse } from 'msw';
import { afterEach, describe, expect, test } from 'vitest';
import { server } from '../../../vitest-setup';
import { mockGeonamesNearbyLocationHandle } from '../../features/geonames-nearby-search/__mocks__/nearby-location.handler';
import { createGeonamesNearbyLocationMockData } from '../../features/geonames-nearby-search/__mocks__/nearby-location.mock';
import geonamesNearbyLocationSchema from '../../features/geonames-nearby-search/nearby-location.schema';
import { mockGoogleLocationAutoCompleteHandle } from '../../features/google-geocode/__mocks__/location-auto-complete.handler';
import { createGoogleLocationAutoCompleteMockData } from '../../features/google-geocode/__mocks__/location-auto-complete.mock';
import { mockGoogleLocationHandle } from '../../features/google-geocode/__mocks__/location-lookup.handler';
import { createGoogleLocationLookupMock } from '../../features/google-geocode/__mocks__/location-lookup.mock';
import { googleLocationAutoCompleteSchema } from '../../features/google-geocode/location-auto-complete.schema';
import googleLocationLookupSchema from '../../features/google-geocode/location-lookup.schema';
import { mockIpinfoCurrentLocationHandle } from '../../features/ipinfo-current-location/__mocks__/current-location.handler';
import { createIpInfoCurrentLocationMock } from '../../features/ipinfo-current-location/__mocks__/current-location.mock';
import { ipinfoCurrentLocationSchema } from '../../features/ipinfo-current-location/current-location.schema';
import { getLocationAutocompleteSuggestions, getLocationDetails, getLocationDetailsByIp, getNearbyLocationDetails } from '../geolocation.service';

describe('Geolocation Service', async () => {
    afterEach(() => {
        server.resetHandlers();
    })
    
    describe('getLocationDetails', async () => {
        test('Expect location without region to return valid response.', async () => {
            const mockLocationData = createGoogleLocationLookupMock();
            server.use(mockGoogleLocationHandle(HttpResponse.json(mockLocationData)));
            await expect(getLocationDetails('mockLocation'))
                .resolves
                .toEqual(googleLocationLookupSchema.parse(mockLocationData));
        });

        test('Expect location with region to return valid response.', async () => {
            const mockLocationData = createGoogleLocationLookupMock();
            server.use(mockGoogleLocationHandle(HttpResponse.json(mockLocationData)));
            await expect(getLocationDetails('mockLocation', 'mockRegion'))
              .resolves
              .toEqual(googleLocationLookupSchema.parse(mockLocationData));
        });

        test('Expect function to throw on unexpected response.', async () => {
            server.use(mockGoogleLocationHandle(HttpResponse.json({data: "test", status: "OK"})));
            await expect(getLocationDetails('mockLocation', 'mockRegion'))
              .rejects
              .toThrow();
        });

        test.each([
            [401], [403], [404], [405], [406], [500], [502], [504]
        ])('Expect invalid response to throw error on %i status code.', async (statusCode: number) => {
            server.use(mockGoogleLocationHandle(HttpResponse.json(null, {status: statusCode})));
            await expect(getLocationDetails('mockLocation', 'mockRegion'))
              .rejects
              .toBeTypeOf('object');
        });

        test.each([
            ["OVER_DAILY_LIMIT"], 
            ["OVER_QUERY_LIMIT"], 
            ["REQUEST_DENIED"], 
            ["INVALID_REQUEST"],
            ["UNKNOWN_ERROR"]
        ])('Expect invalid response to throw error on %s request status.', async (requestStatus: string) => {
            const mockData = {
                ...createGoogleLocationLookupMock(),
                status: requestStatus
            }

            server.use(mockGoogleLocationHandle(HttpResponse.json(mockData)));
            await expect(getLocationDetails('mockLocation', 'mockRegion'))
              .rejects
              .toThrow();
        });

        test.each([
            ["OK"], 
            ["ZERO_RESULTS"], 
        ])('Expect valid response on %s request status.', async (requestStatus: string) => {
            const mockData = {
                ...createGoogleLocationLookupMock(),
                status: requestStatus
            }

            server.use(mockGoogleLocationHandle(HttpResponse.json(mockData)));
            await expect(getLocationDetails('mockLocation', 'mockRegion'))
              .resolves
              .toMatchObject({status: requestStatus});
        });
    });

    describe('getLocationDetailsByIp', async () => {
        test('Expect location with IP to return valid response.', async () => {
            const mockLocationDetailsData = createIpInfoCurrentLocationMock();
            const responseData = ipinfoCurrentLocationSchema.parse(mockLocationDetailsData);
            server.use(mockIpinfoCurrentLocationHandle(HttpResponse.json(mockLocationDetailsData)));
            await expect(getLocationDetailsByIp('mockLocation'))
                .resolves
                .toEqual(responseData);
        });

        test('Expect bogon response to return valid response.', async () => {
            const mockLocationDetailsData = createIpInfoCurrentLocationMock();
            const responseData = ipinfoCurrentLocationSchema.parse(mockLocationDetailsData);
            server.use(mockIpinfoCurrentLocationHandle(HttpResponse.json(mockLocationDetailsData)));
            server.use(mockIpinfoCurrentLocationHandle(HttpResponse.json({ip: "::1", bogon: true}), {once: true}));
            await expect(getLocationDetailsByIp('mockLocation'))
                .resolves
                .toEqual(responseData);
        });

        test('Expect bogon response to throw without retry enabled.', async () => {
            const mockLocationDetailsData = createIpInfoCurrentLocationMock();
            server.use(mockIpinfoCurrentLocationHandle(HttpResponse.json(mockLocationDetailsData)));
            server.use(mockIpinfoCurrentLocationHandle(HttpResponse.json({ip: "::1", bogon: true}), {once: true}));
            await expect(getLocationDetailsByIp('mockLocation', false))
                .rejects
                .toThrow();
        });

        test('Expect function to throw on unexpected response', async () => {
            const mockLocationDetailsData = {data: 'unexpected response'};
            server.use(mockIpinfoCurrentLocationHandle(HttpResponse.json(mockLocationDetailsData)));
            await expect(getLocationDetailsByIp('mockLocation', false))
                .rejects
                .toThrow();
        });

        test.each([
            [401], [403], [404], [405], [406], [500], [502], [504]
        ])('Expect invalid response to throw error on %i status code.', async (statusCode: number) => {
            const mockLocationDetailsData = createIpInfoCurrentLocationMock();
            server.use(mockIpinfoCurrentLocationHandle(HttpResponse.json(mockLocationDetailsData, {status: statusCode})));
            await expect(getLocationDetailsByIp('mockLocation'))
                .rejects
                .toThrow();
        });
    });

    describe('getNearbyLocationDetails', () => {
        test('Expect location with lat and lng to return valid response.', async () => {
            const mockNearbyLocationData = createGeonamesNearbyLocationMockData();
            const responseData = geonamesNearbyLocationSchema.parse(mockNearbyLocationData);
            server.use(mockGeonamesNearbyLocationHandle(HttpResponse.json(mockNearbyLocationData)));
            await expect(getNearbyLocationDetails(0, 0))
                .resolves
                .toEqual(responseData);
        });

        test('Expect function to throw on unexpected response.', async () => {
            const mockNearbyLocationData = {data: 'unexpected response'};
            server.use(mockGeonamesNearbyLocationHandle(HttpResponse.json(mockNearbyLocationData)));
            await expect(getNearbyLocationDetails(0, 0))
                .rejects
                .toThrow();
        });

        test.each([
            [401], [403], [404], [405], [406], [500], [502], [504]
        ])('Expect invalid response to throw error on %i status code.', async (statusCode: number) => {
            const mockNearbyLocationData = createGeonamesNearbyLocationMockData();
            const responseData = geonamesNearbyLocationSchema.parse(mockNearbyLocationData);
            server.use(mockGeonamesNearbyLocationHandle(HttpResponse.json(responseData, {status: statusCode})));
            await expect(getNearbyLocationDetails(0, 0))
                .rejects
                .toThrow();
        });
    });

    describe('getLocationAutocompleteSuggestions', () => {
        test('Expect location suggestion with valid input to return location suggestions.', async () => {
            const mockLocationAutocompleteData = createGoogleLocationAutoCompleteMockData();
            const responseData = googleLocationAutoCompleteSchema.parse(mockLocationAutocompleteData);
            server.use(mockGoogleLocationAutoCompleteHandle(HttpResponse.json(mockLocationAutocompleteData)));
            await expect(getLocationAutocompleteSuggestions('mockInput'))
                .resolves
                .toEqual(responseData);
        });

        test('Expect location suggestion with valid input and params to return location suggestions.', async () => {
            const mockLocationAutocompleteData = createGoogleLocationAutoCompleteMockData();
            const responseData = googleLocationAutoCompleteSchema.parse(mockLocationAutocompleteData);
            server.use(mockGoogleLocationAutoCompleteHandle(HttpResponse.json(mockLocationAutocompleteData)));
            const location = `${faker.location.latitude},${faker.location.longitude}`;
            await expect(getLocationAutocompleteSuggestions('mockInput', {location}))
                .resolves
                .toEqual(responseData);
        });

        test('Expect function to throw on unexpected response.', async () => {
            const mockLocationAutocompleteData = {data: 'unexpected response'};
            server.use(mockGoogleLocationAutoCompleteHandle(HttpResponse.json(mockLocationAutocompleteData)));
            await expect(getLocationAutocompleteSuggestions('mockInput'))
                .rejects
                .toThrow();
        });

        test.each([
            [401], [403], [404], [405], [406], [500], [502], [504]
        ])('Expect invalid response to throw error on %i status code.', async (statusCode: number) => {
            const mockLocationAutocompleteData = createGoogleLocationAutoCompleteMockData();
            const responseData = googleLocationAutoCompleteSchema.parse(mockLocationAutocompleteData);
            server.use(mockGoogleLocationAutoCompleteHandle(HttpResponse.json(responseData, {status: statusCode})));
            await expect(getLocationAutocompleteSuggestions('mockInput'))
                .rejects
                .toThrow();
        });
    });
})