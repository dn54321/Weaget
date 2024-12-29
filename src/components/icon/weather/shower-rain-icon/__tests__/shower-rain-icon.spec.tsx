import { describe, expect, it } from "vitest";
import { ShowerRain } from "..";
import { withRender } from "@utils/render";

describe("Component: shower-rain-icon", () => {
    it("Widget should be able to render.", () => {
        const { getByRole, getByTitle } = withRender(<ShowerRain />);
        expect(getByRole("img")).toBeInTheDocument();
        expect(getByTitle("weather.icon.showerRain.title")).toBeInTheDocument();
    });

    it("Widget should not display title on decoration.", () => {
        const { queryByTitle, getByRole } = withRender(<ShowerRain decoration />);
        expect(getByRole("img")).toBeInTheDocument();
        expect(queryByTitle("weather.icon.showerRain.title")).not.toBeInTheDocument();
    });
});
