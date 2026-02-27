import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { createElement, useState } from "react";
import { apicnPollutionHandler } from "./src/features/apicn-pollution/__mocks__/pollution.handler";
import { autoCompleteHandler } from "./src/features/weaget/__mocks__/auto-complete.handler";
import { cleanup } from "@testing-library/react";
import { currentLocationHandler } from "./src/features/weaget/__mocks__/current-location.handler";
import { geonamesNearbyLocationHandler } from "./src/features/geonames-nearby-search/__mocks__/nearby-location.handler";
import { googleLocationAutoCompleteHandler } from "./src/features/google-geocode/__mocks__/location-auto-complete.handler";
import { googleLocationLookupHandler } from "./src/features/google-geocode/__mocks__/location-lookup.handler";
import { ipinfoCurrentLocationHandler } from "./src/features/ipinfo-current-location/__mocks__/current-location.handler";
import { locationLookupHandler } from "./src/features/weaget/__mocks__/location-lookup.handler";
import { nearbyLocationHandler } from "./src/features/weaget/__mocks__/nearby-location.handler";
import { openWeatherOneCallHandler } from "./src/features/open-weather-map-one-call/__mocks__/onecall.handler";
import { pollutionHandler } from "./src/features/weaget/__mocks__/pollution.handler";
import { setupServer } from "msw/node";
import { weatherHandler } from "./src/features/weaget/__mocks__/weather.handler";

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
    ...weatherHandler,
);

server.listen();

afterEach(() => {
    cleanup();
});

// Hard-coded mocks to get tests to work.
vi.mock("zustand");

vi.mock("next/font/google", () => ({
    Quicksand: () => ({
        style: {
            fontFamily: "mocked",
        },
    }),
    Roboto: () => ({
        style: {
            fontFamily: "mocked",
        },
    }),
}));

// BUG: use is not recognised by react-testing-library.
vi.mock("react", async importOriginal => ({
    ...await importOriginal(),
    use: (obj: Promise<object>) => {
        const [effect, setEffect] = useState<object | undefined>(obj);
        obj.then(resolved => setEffect(resolved));
        return effect;
    },
}));

vi.mock("react-i18next", async importOriginal => ({
    // this mock makes sure any components using the translate hook can use it without a warning being shown
    ...await importOriginal(),
    useTranslation: () => {
        return {
            i18n: {
                changeLanguage: () => new Promise(() => {}),
            },
            t: (str: string) => str,
        };
    },
}));

// Hides vitest warnings about Recharts ResponsiveContainer
vi.mock("recharts", async (importOriginal) => {
    const originalModule = (await importOriginal()) as Record<string, unknown>;
    return {
        ...originalModule,
        ResponsiveContainer: () => createElement("div"),
    };
});

const mockCookies = {
    get: vi.fn(),
    set: vi.fn(),
    delete: vi.fn(),
    has: vi.fn(),
    getAll: vi.fn(),
};

vi.mock("next/dist/server/request/cookies", () => ({
    cookies: () => mockCookies,
}));

const originalConsoleError = console.error;
const jsDomCssError = "Error: Could not parse CSS stylesheet";
console.error = (...params: Array<string>) => {
    if (!params.find(p => p.toString().includes(jsDomCssError))) {
        originalConsoleError(...params);
    }
};

// Basic Logging
if (process.env.LOG && process.env.LOG.toLowerCase() === "basic") {
    server.events.on("request:start", ({ request }) => {
        if (process.env.NODE_ENV === "test") {
            console.log("Outgoing:", request.method, request.url);
        }
    });
}

// Verbose Logging
if (process.env.LOG && process.env.LOG.toLowerCase() === "standard") {
    server.events.on("response:mocked", async ({ request, response }) => {
        console.log(
            "%s %s received %s %s",
            request.method,
            request.url,
            response.status,
            response.statusText,
        );
    });
}

// Extremely Verbose Logging
if (process.env.LOG && process.env.LOG.toLowerCase() === "verbose") {
    server.events.on("response:mocked", async ({ request, requestId, response }) => {
        const data = await response.json();
        console.log(
            "[%s] %s %s received %s %s %s",
            requestId,
            request.method,
            request.url,
            response.status,
            response.statusText,
            JSON.stringify(data),
        );
    });
}
