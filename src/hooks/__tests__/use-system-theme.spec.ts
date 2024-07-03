import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { SystemTheme } from "@src/types/system.types";
import { useSystemTheme } from "@src/hooks/use-system-theme";
import { testWrapper } from "@utils/wrappers";

describe("Hooks - use-system-theme", async () => {
    beforeEach(() => {
        window.matchMedia = vi.fn().mockImplementation(() => ({
            matches: false,
            media: true,
            onchange: null,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        }));
    });
    afterEach(() => {
        vi.resetAllMocks();
    });

    describe("useSystemTheme", async () => {
        test.each(
            [
                ["light", false],
                ["dark", true],
            ]
        )("Theme should be set to %s mode if dark mode is %o during initialisation.", (colourScheme, darkModeInitialisation) => {
            window.matchMedia = vi.fn().mockImplementation(() => ({
                matches: darkModeInitialisation,
                media: true,
                onchange: null,
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
            }));

            const { result } = renderHook(() => useSystemTheme(), { wrapper: testWrapper });
            expect(result.current.themeColour).toEqual(colourScheme);
        });

        test.each(
            [
                [SystemTheme.LIGHT],
                [SystemTheme.DARK],
            ]
        )("Should return the correct theme colour when set to %s mode.", async (themeColour: SystemTheme) => {
            const { result } = renderHook(() => useSystemTheme(), { wrapper: testWrapper });
            act(() => {
                result.current.setThemeColour(themeColour);
            });
            expect(result.current.themeColour).toEqual(themeColour);
        });

        test.each(
            [
                [SystemTheme.LIGHT, SystemTheme.DARK],
                [SystemTheme.DARK, SystemTheme.LIGHT],
            ]
        )("Toggling from %s mode should set the theme colour to %s mode.", async (
            oldThemeColour: SystemTheme,
            newThemeColour: SystemTheme
        ) => {
            const { result } = renderHook(() => useSystemTheme(), { wrapper: testWrapper });

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
