import { describe, expect, it } from "vitest";
import { Mist } from "..";
import { withRender } from "@utils/render";

describe("Component: Mist", () => {
    it("Widget should be able to render.", () => {
        const { getByRole, getByTitle } = withRender(<Mist />);
        expect(getByRole("img")).toBeInTheDocument();
        expect(getByTitle("weather.icon.mist.title")).toBeInTheDocument();
    });

    it("Widget should not display title on decoration.", () => {
        const { queryByTitle, getByRole } = withRender(<Mist decoration />);
        expect(getByRole("img")).toBeInTheDocument();
        expect(queryByTitle("weather.icon.mist.title")).not.toBeInTheDocument();
    });
});
