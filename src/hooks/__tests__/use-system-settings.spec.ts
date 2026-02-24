import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { SystemTheme } from "@src/types/system.types";
import { testWrapper } from "@utils/wrappers";
import { useSystemSettings } from "@project/src/hooks/use-system-settings";

describe("Hooks - use-system-settings", async () => {
    beforeEach(() => {
        localStorage.clear();
    });
    afterEach(() => {
        vi.resetAllMocks();
    });

    describe("useSystemTheme", async () => {
        test.each(
            [
                ["light"],
                ["dark"],
            ],
        )("Theme should be set to %s mode if set in local storage.", (colourScheme) => {
            localStorage.setItem("mui-mode", colourScheme);
            const { result } = renderHook(() => useSystemSettings(), { wrapper: testWrapper });
            expect(result.current.themeColour).toEqual(colourScheme);
        });

        test.each(
            [
                [SystemTheme.LIGHT],
                [SystemTheme.DARK],
            ],
        )("Should return the correct theme colour when set to %s mode.", async (themeColour: SystemTheme) => {
            const { result } = renderHook(() => useSystemSettings(), { wrapper: testWrapper });
            act(() => {
                result.current.setThemeColour(themeColour);
            });
            expect(result.current.themeColour).toEqual(themeColour);
        });

        test.each(
            [
                [SystemTheme.LIGHT, SystemTheme.DARK],
                [SystemTheme.DARK, SystemTheme.LIGHT],
            ],
        )("Toggling from %s mode should set the theme colour to %s mode.", async (
            oldThemeColour: SystemTheme,
            newThemeColour: SystemTheme,
        ) => {
            const { result } = renderHook(() => useSystemSettings(), { wrapper: testWrapper });

            act(() => {
                result.current.setThemeColour(oldThemeColour);
            });

            expect(result.current.themeColour).toEqual(oldThemeColour);

            act(() => {
                result.current.toggleTheme();
            });

            expect(result.current.themeColour).toEqual(newThemeColour);
        });
    });
});
