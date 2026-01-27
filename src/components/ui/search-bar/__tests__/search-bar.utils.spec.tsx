import { debounceSearchFunc, throttleSearchFunc } from "@components/ui/search-bar/search-bar.utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("Component: search-bar-utils", async () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    describe("throttleFunc", () => {
        it("should throttle a called function", async () => {
            const mockFn = vi.fn();
            throttleSearchFunc(mockFn, "initial");
            throttleSearchFunc(mockFn, "throttled");
            expect(mockFn).toBeCalledTimes(1);
            expect(mockFn).toBeCalledWith("initial");
            vi.runAllTimers();
            expect(mockFn).toBeCalledTimes(2);
            expect(mockFn).toBeCalledWith("throttled");
        });

        it("should not call throttle function if query is undefined", async () => {
            const mockFn = vi.fn();
            throttleSearchFunc(mockFn, undefined);
            vi.runAllTimers();
            expect(mockFn).toBeCalledTimes(0);
        });
    });

    describe("debounceFunc", () => {
        it("should debounce a called function", async () => {
            const mockFn = vi.fn();
            debounceSearchFunc(mockFn, "initial");
            debounceSearchFunc(mockFn, "debounces");
            expect(mockFn).toBeCalledTimes(0);
            vi.runAllTimers();
            debounceSearchFunc(mockFn, "second");
            expect(mockFn).toBeCalledTimes(1);
            expect(mockFn).toBeCalledWith("debounces");
        });

        it("should not call throttle function if query is undefined", async () => {
            const mockFn = vi.fn();
            debounceSearchFunc(mockFn, undefined);
            vi.runAllTimers();
            expect(mockFn).toBeCalledTimes(0);
        });
    });
});
