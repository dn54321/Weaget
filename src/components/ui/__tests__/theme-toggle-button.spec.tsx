import { afterEach, describe, expect, it } from "vitest";
import { testQueryClient } from "../../../utils/query-client";
import { SystemTheme } from "../../../types/system.types";
import { render, renderHook } from "@testing-library/react";
import { useTheme } from "../../../hooks/use-theme";
import userEvent from "@testing-library/user-event";
import { ThemeToggleButton } from "../theme-toggle-button";
import { testWrapper } from "../../../utils/wrappers";

describe("Component: theme-toggle-button", async () => {
    afterEach(() => {
        testQueryClient.clear();
    });

    it.each([
        [SystemTheme.LIGHT, SystemTheme.DARK],
        [SystemTheme.DARK, SystemTheme.LIGHT],
    ])('should toggle from %s to %s when the theme toggle button is pressed', 
    async (initial, expected) => {
        const {result} = renderHook(() => useTheme());
        result.current.setThemeColour(initial);
        const user = userEvent.setup();
        const {getByRole} = render(<ThemeToggleButton/>, {wrapper: testWrapper});
        await user.click(getByRole("button"));
        expect(result.current.themeColour).toBe(expected);
    });
});