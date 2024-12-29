import { describe, expect, it } from "vitest";
import { LocalisationDropdownButton } from "@components/ui/localisation-dropdown-button/localisation-dropdown-button.component";
import { SystemLocale } from "@project/src/types/system.types";
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
        expect(menuitems[0].textContent).toEqual("language.english");
        expect(menuitems[1].textContent).toEqual("language.japanese");
    });

    it("Expect that the default locale is english", async () => {
        const user = userEvent.setup();
        const { getByLabelText, getByRole } = withRender(<LocalisationDropdownButton />);
        const button = getByLabelText("component.localisationDropdownButton.chooseLanguage");

        await user.click(button);
        await user.click(button);
        await user.click(button);

        const englishMenu = getByRole("menuitem", { name: "language.english" });
        expect(englishMenu).toHaveClass("Mui-selected");

        const japaneseMenu = getByRole("menuitem", { name: "language.japanese" });
        expect(japaneseMenu).not.toHaveClass("Mui-selected");
    });

    it("Expect clicking a different locale will switch locales", async () => {
        const user = userEvent.setup();
        const { getByLabelText, getByRole } = withRender(<LocalisationDropdownButton />);
        const button = getByLabelText("component.localisationDropdownButton.chooseLanguage");

        await user.click(button);
        await user.click(getByRole("menuitem", { name: "language.japanese" }));
        await user.click(button);

        const englishMenu = getByRole("menuitem", { name: "language.english" });
        expect(englishMenu).not.toHaveClass("Mui-selected");

        const japaneseMenu = getByRole("menuitem", { name: "language.japanese" });
        expect(japaneseMenu).toHaveClass("Mui-selected");
    });
});
