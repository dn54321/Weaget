import { describe, expect, it } from "vitest";
import { MoonIcon } from "./..";
import { withRender } from "@utils/render";

describe("Component: moon-icon", () => {
    it("Widget should be able to render.", () => {
        const { getByRole, getByTitle } = withRender(<MoonIcon />);
        expect(getByRole("img")).toBeInTheDocument();
        expect(getByTitle("weather.icon.moon.title")).toBeInTheDocument();
    });

    it("Widget should not display title on decoration.", () => {
        const { queryByTitle, getByRole } = withRender(<MoonIcon decoration />);
        expect(getByRole("img")).toBeInTheDocument();
        expect(queryByTitle("weather.icon.moon.title")).not.toBeInTheDocument();
    });
});
