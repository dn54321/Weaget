import '@testing-library/jest-dom/vitest';
import { setupServer } from 'msw/node';
import { apicnPollutionHandler } from './src/features/apicn-pollution/__mocks__/pollution.handler';
import { geonamesNearbyLocationHandler } from './src/features/geonames-nearby-search/__mocks__/nearby-location.handler';
import { googleLocationAutoCompleteHandler } from './src/features/google-geocode/__mocks__/location-auto-complete.handler';
import { googleLocationLookupHandler } from './src/features/google-geocode/__mocks__/location-lookup.handler';
import { ipinfoCurrentLocationHandler } from './src/features/ipinfo-current-location/__mocks__/current-location.handler';
import { openWeatherOneCallHandler } from './src/features/open-weather-map-one-call/__mocks__/onecall.handler';
import { autoCompleteHandler } from './src/features/weaget/__mocks__/auto-complete.handler';
import { currentLocationHandler } from './src/features/weaget/__mocks__/current-location.handler';
import { locationLookupHandler } from './src/features/weaget/__mocks__/location-lookup.handler';
import { nearbyLocationHandler } from './src/features/weaget/__mocks__/nearby-location.handler';
import { pollutionHandler } from './src/features/weaget/__mocks__/pollution.handler';
import { weatherHandler } from './src/features/weaget/__mocks__/weather.handler';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Mock every endpoint possible.
export const server = setupServer(
    ...apicnPollutionHandler,
    ...geonamesNearbyLocationHandler,
    ...googleLocationAutoCompleteHandler,
    ...googleLocationLookupHandler,
    ...ipinfoCurrentLocationHandler,
    ...openWeatherOneCallHandler,
    
    ...autoCompleteHandler,
    ...nearbyLocationHandler,
    ...currentLocationHandler,
    ...locationLookupHandler,
    ...pollutionHandler,
    ...weatherHandler
)

server.listen();

afterEach(() => {
    cleanup();
});

// Hard-coded mocks to get tests to work.
vi.mock('zustand');



vi.mock('next/font/google', () => ({
    Roboto: () => ({
        style: {
            fontFamily: 'mocked',
        },
    }),
    Quicksand: () => ({
        style: {
            fontFamily: 'mocked',
        },
    })
}));

const resizeObserverMock = vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
  
// Stub the global ResizeObserver
vi.stubGlobal('ResizeObserver', resizeObserverMock)

const originalConsoleError = console.error;
const jsDomCssError = "Error: Could not parse CSS stylesheet";
console.error = (...params: Array<string>) => {
    if (!params.find((p) => p.toString().includes(jsDomCssError))) {
        originalConsoleError(...params);
    }
};

// Basic Logging

// server.events.on('request:start', ({ request }) => {
//     if (process.env.NODE_ENV === 'test') {
//         console.log('Outgoing:', request.method, request.url);
//     }
// });

// Verbose Logging

// server.events.on('response:mocked', async ({ request, requestId, response }) => {
//     const data = await response.json();
//     console.log(
//         '%s %s received %s %s',
//         request.method,
//         request.url,
//         response.status,
//         response.statusText,
//     )
// })

// Extremely Verbose Logging

// server.events.on('response:mocked', async ({ request, requestId, response }) => {
//     const data = await response.json();
//     console.log(
//         '%s %s received %s %s %s',
//         request.method,
//         request.url,
//         response.status,
//         response.statusText,
//         JSON.stringify(data),
//     )
// })