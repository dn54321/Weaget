import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { debounceFunc, throttleFunc } from "@components/ui/search-bar/search-bar.utils";

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
            throttleFunc(mockFn, "initial");
            throttleFunc(mockFn, "throttled");
            expect(mockFn).toBeCalledTimes(1);
            expect(mockFn).toBeCalledWith("initial");
            vi.runAllTimers();
            expect(mockFn).toBeCalledTimes(2);
            expect(mockFn).toBeCalledWith("throttled");
        });

        it("should not call throttle function if query is undefined", async () => {
            const mockFn = vi.fn();
            throttleFunc(mockFn, undefined);
            vi.runAllTimers();
            expect(mockFn).toBeCalledTimes(0);
        });
    });

    describe("debounceFunc", () => {
        it("should debounce a called function", async () => {
            const mockFn = vi.fn();
            debounceFunc(mockFn, "initial");
            debounceFunc(mockFn, "debounces");
            expect(mockFn).toBeCalledTimes(0);
            vi.runAllTimers();
            debounceFunc(mockFn, "second");
            expect(mockFn).toBeCalledTimes(1);
            expect(mockFn).toBeCalledWith("debounces");
        });

        it("should not call throttle function if query is undefined", async () => {
            const mockFn = vi.fn();
            debounceFunc(mockFn, undefined);
            vi.runAllTimers();
            expect(mockFn).toBeCalledTimes(0);
        });
    });
});
