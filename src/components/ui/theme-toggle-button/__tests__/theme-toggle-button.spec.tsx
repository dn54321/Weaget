import ThemeToggleButton from "@components/ui/theme-toggle-button/theme-toggle-button.component";
import { capitalize } from "@mui/material";
import { SystemTheme } from "@src/types/system.types";
import userEvent from "@testing-library/user-event";
import { testQueryClient } from "@utils/query-client";
import { withRender } from "@utils/render";
import { afterEach, describe, expect, it } from "vitest";

describe("Component: theme-toggle-button", async () => {
    afterEach(() => {
        testQueryClient.clear();
    });

    it.each([
        [SystemTheme.LIGHT, SystemTheme.DARK],
        [SystemTheme.DARK, SystemTheme.LIGHT]
    ])("should toggle from %s to %s when the theme toggle button is pressed",
        async (initial, expected) => {
            const user = userEvent.setup();
            const settings = { theme: initial };
            const view = withRender(<ThemeToggleButton />, { settings });
            expect(view.getByLabelText(`component.themeToggleButton.toggle${capitalize(expected)}Theme`)).toBeInTheDocument();
            await user.click(view.getByRole("button"));
            expect(view.getByLabelText(`component.themeToggleButton.toggle${capitalize(initial)}Theme`)).toBeInTheDocument();
        });
});
