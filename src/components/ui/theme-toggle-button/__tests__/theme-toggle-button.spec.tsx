import { afterEach, describe, expect, it } from "vitest";
import { testQueryClient } from "@utils/query-client";
import { SystemTheme } from "@src/types/system.types";
import { render, renderHook } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { testWrapper } from "@utils/wrappers";
import ThemeToggleButton from "@components/ui/theme-toggle-button/theme-toggle-button.component";
import { useSystemTheme } from "@src/hooks/use-system-theme";

describe("Component: theme-toggle-button", async () => {
    afterEach(() => {
        testQueryClient.clear();
    });

    it.each([
        [SystemTheme.LIGHT, SystemTheme.DARK],
        [SystemTheme.DARK, SystemTheme.LIGHT],
    ])("should toggle from %s to %s when the theme toggle button is pressed",
        async (initial, expected) => {
            const { result } = renderHook(() => useSystemTheme());
            result.current.setThemeColour(initial);
            const user = userEvent.setup();
            const { getByRole } = render(<ThemeToggleButton />, { wrapper: testWrapper });
            await user.click(getByRole("button"));
            expect(result.current.themeColour).toBe(expected);
        });
});
