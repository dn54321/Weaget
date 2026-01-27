import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";

import { cleanup } from "@testing-library/react";

import { mockApicnApiHandler } from "./src/apis/apicn/__mocks__/apicn.handler";
import { mockGeonameApiHandler } from "./src/apis/geonames/__mocks__/geonames.handler";
import { mockGoogleApiHandler } from "./src/apis/google/__mocks__/google.handler";
import { mockIpinfoApiHandler } from "./src/apis/ipinfo/__mocks__/ipinfo.handler";
import { mockOpenWeatherMapApiHandler } from "./src/apis/open-weather-map/__mocks__/open-weather-map.handler";
import { setupServer } from "msw/node";
import { useState } from "react";

// Mock every endpoint possible.
export const server = setupServer(
    ...mockApicnApiHandler,
    ...mockGeonameApiHandler,
    ...mockGoogleApiHandler,
    ...mockIpinfoApiHandler,
    ...mockOpenWeatherMapApiHandler,
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
    ...await importOriginal<typeof import("react")>(),
    use: (obj: Promise<object>) => {
        const [effect, setEffect] = useState<object | undefined>(obj);
        obj.then(resolved => setEffect(resolved));
        return effect;
    },
}));

vi.mock("react-i18next", async importOriginal => ({
    // this mock makes sure any components using the translate hook can use it without a warning being shown
    ...await importOriginal<typeof import("react-i18next")>(),
    useTranslation: () => {
        return {
            i18n: {
                changeLanguage: () => new Promise(() => {}),
            },
            t: (str: string) => str,
        };
    },
}));

// Required to make react-charts pass.
// https://github.com/jsdom/jsdom/issues/3368
global.ResizeObserver = class ResizeObserver {
    observe() {
        // do nothing
    }

    unobserve() {
        // do nothing
    }

    disconnect() {
        // do nothing
    }
};

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
        const data = await response.json();
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
            "%s %s received %s %s %s",
            request.method,
            request.url,
            response.status,
            response.statusText,
            JSON.stringify(data),
        );
    });
}
