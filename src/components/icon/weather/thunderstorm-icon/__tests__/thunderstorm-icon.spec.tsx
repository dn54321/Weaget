import { describe, expect, it } from "vitest";
import { Thunderstorm } from "./..";
import { withRender } from "@utils/render";

describe("Component: thunderstorm-icon", () => {
    it("Widget should be able to render.", () => {
        const { getByTitle, getByRole } = withRender(<Thunderstorm />);
        expect(getByRole("img")).toBeInTheDocument();
        expect(getByTitle("weather.icon.thunderstorm.title")).toBeInTheDocument();
    });

    it("Widget should not display title on decoration.", () => {
        const { queryByTitle, getByRole } = withRender(<Thunderstorm decoration />);
        expect(getByRole("img")).toBeInTheDocument();
        expect(queryByTitle("weather.icon.thunderstorm.title")).not.toBeInTheDocument();
    });
});
