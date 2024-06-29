import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { SystemTheme } from "@src/types/system.types";
import { useTheme } from "@src/hooks/use-theme";

describe('Hooks - use-theme', async () => {
    beforeEach(() => {
        window.matchMedia = vi.fn().mockImplementation(() => ({
            matches: false,
            media: true,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn()
          }));

    })
    afterEach(() => {
        vi.resetAllMocks();
    });

    describe('useTheme', async () => {
        test.each(
            [
                ['light', false],
                ['dark', true]
            ]
        )('Theme should be set to %s mode if dark mode is %o during initialisation.', (colourScheme, darkModeInitialisation) => {
            window.matchMedia = vi.fn().mockImplementation(query => ({
                matches: darkModeInitialisation,
                media: true,
                onchange: null,
                addListener: vi.fn(),
                removeListener: vi.fn()
              }));

            const { result } = renderHook(
                () => useTheme(), 
            );
            expect(result.current.themeColour).toEqual(colourScheme);
        })

        test.each(
            [
                [SystemTheme.LIGHT],
                [SystemTheme.DARK]
            ]
        )('Should return the correct theme colour when set to %s mode.', async (themeColour: SystemTheme) => {
            const { result } = renderHook(
                () => useTheme(), 
            );

            act(() => {
                result.current.setThemeColour(themeColour)
            });
            expect(result.current.themeColour).toEqual(themeColour);
        }); 

        test.each(
            [
                [SystemTheme.LIGHT, SystemTheme.DARK],
                [SystemTheme.DARK, SystemTheme.LIGHT]
            ]
        )('Toggling from %s mode should set the theme colour to %s mode.', async (
            oldThemeColour: SystemTheme,
            newThemeColour: SystemTheme
        ) => {
            const { result } = renderHook(
                () => useTheme(), 
            );

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