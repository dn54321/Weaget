import { describe, expect, it } from "vitest";
import { ScatteredCloud } from "..";
import { withRender } from "@utils/render";

describe("Component: scattered-cloud-icon", () => {
    it("Widget should be able to render.", () => {
        const { getByRole, getByTitle } = withRender(<ScatteredCloud />);
        expect(getByRole("img")).toBeInTheDocument();
        expect(getByTitle("weather.icon.scatteredCloud.title")).toBeInTheDocument();
    });

    it("Widget should not display title on decoration.", () => {
        const { queryByTitle, getByRole } = withRender(<ScatteredCloud decoration />);
        expect(getByRole("img")).toBeInTheDocument();
        expect(queryByTitle("weather.icon.scatteredCloud.title")).not.toBeInTheDocument();
    });
});
