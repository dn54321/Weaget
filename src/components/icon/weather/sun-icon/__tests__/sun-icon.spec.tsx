import { describe, expect, it } from "vitest";
import { SunIcon } from "..";
import { withRender } from "@utils/render";

describe("Component: sun-icon", () => {
    it("Widget should be able to render.", () => {
        const { getByTitle, getByRole } = withRender(<SunIcon />);
        expect(getByRole("img")).toBeInTheDocument();
        expect(getByTitle("weather.icon.sun.title")).toBeInTheDocument();
    });

    it("Widget should not display title on decoration.", () => {
        const { queryByTitle, getByRole } = withRender(<SunIcon decoration />);
        expect(getByRole("img")).toBeInTheDocument();
        expect(queryByTitle("weather.icon.sun.title")).not.toBeInTheDocument();
    });
});
