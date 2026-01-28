import { describe, expect, it } from "vitest";
import { LocalisationDropdownButton } from "@components/ui/localisation-dropdown-button/localisation-dropdown-button.component";
import { SystemLocale } from "@project/src/types/system.types";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { withRender } from "@project/src/utils/render";
describe("Component: localisation-dropdown-button", async () => {
    it("should display a icon-button with aria-label support", async () => {
        const { getByLabelText } = withRender(<LocalisationDropdownButton />);
        const button = getByLabelText("component.localisationDropdownButton.chooseLanguage");
        expect(button.tagName).toEqual("BUTTON");
    });

    it("should display a dropdown of options when the button is clicked", async () => {
        const user = userEvent.setup();
        const { getByLabelText, getAllByRole } = withRender(<LocalisationDropdownButton />);
        const button = getByLabelText("component.localisationDropdownButton.chooseLanguage");

        await user.click(button);

        const menuitems = getAllByRole("menuitem");
        expect(menuitems.length).greaterThan(0);
    });

    it("should display a dropdown of filtered options if provided", async () => {
        const user = userEvent.setup();
        const { getAllByRole, getByLabelText } = withRender(
            <LocalisationDropdownButton
                localesFilter={[SystemLocale.ENGLISH, SystemLocale.JAPANESE]}
            />,
        );
        const button = getByLabelText("component.localisationDropdownButton.chooseLanguage");

        await user.click(button);
        const menuitems = getAllByRole("menuitem");
        expect(menuitems.length).toEqual(2);
        expect(menuitems[0].textContent).toEqual("English");
        expect(menuitems[1].textContent).toEqual("日本語");
    });

    it("Expect that the default locale is english", async () => {
        const user = userEvent.setup();
        const { getByLabelText, getByRole } = withRender(<LocalisationDropdownButton />);
        const button = getByLabelText("component.localisationDropdownButton.chooseLanguage");

        await user.click(button);
        await user.click(button);
        await user.click(button);

        const englishMenu = getByRole("menuitem", { name: "English" });
        expect(englishMenu).toHaveClass("Mui-selected");

        const japaneseMenu = getByRole("menuitem", { name: "日本語" });
        expect(japaneseMenu).not.toHaveClass("Mui-selected");
    });

    it("Expect clicking a different locale will switch locales", async () => {
        const user = userEvent.setup();
        const { getByLabelText, getByRole } = withRender(<LocalisationDropdownButton />);
        const button = getByLabelText("component.localisationDropdownButton.chooseLanguage");

        await user.click(button);
        await user.click(getByRole("menuitem", { name: "日本語" }));
        await user.click(button);

        const englishMenu = getByRole("menuitem", { name: "English" });
        expect(englishMenu).not.toHaveClass("Mui-selected");

        const japaneseMenu = getByRole("menuitem", { name: "日本語" });
        expect(japaneseMenu).toHaveClass("Mui-selected");
    });

    it("should skip invalid locale in filter", async () => {
        const user = userEvent.setup();
        const { getAllByRole, getByLabelText } = withRender(
            <LocalisationDropdownButton
                localesFilter={["mockLocale" as SystemLocale, SystemLocale.JAPANESE]}
            />,
        );
        const button = getByLabelText("component.localisationDropdownButton.chooseLanguage");

        await user.click(button);

        const menuitems = getAllByRole("menuitem");
        screen.debug();
        expect(menuitems.length).toEqual(1);
        expect(menuitems[0].textContent).toEqual("日本語");
    });

    it("should show the tooltip when hovering over the button", async () => {
        const user = userEvent.setup();
        const { getByLabelText, findByRole } = withRender(<LocalisationDropdownButton />);
        const button = getByLabelText("component.localisationDropdownButton.chooseLanguage");

        await user.hover(button);

        const tooltip = await findByRole("tooltip");
        expect(tooltip).toBeVisible();
        expect(tooltip).toHaveTextContent("component.localisationDropdownButton.chooseLanguage");
    });

    it("should hide the tooltip when the menu is open", async () => {
        const user = userEvent.setup();
        const { getByLabelText, findByRole, queryByRole } = withRender(<LocalisationDropdownButton />);
        const button = getByLabelText("component.localisationDropdownButton.chooseLanguage");

        await user.hover(button);

        const tooltipDefaultState = await findByRole("tooltip");
        expect(tooltipDefaultState).toBeVisible();

        await user.click(button);

        const closedTooltip = queryByRole("tooltip");
        expect(closedTooltip).not.toBeInTheDocument();

        await user.keyboard("{Escape}");

        const tooltip = await findByRole("tooltip");
        expect(tooltip).toBeVisible();
    });
});
