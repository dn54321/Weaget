import { describe, expect, it } from "vitest";
import { RainCloud } from "..";
import { withRender } from "@utils/render";

describe("Component: rain-cloud-icon", () => {
    it("Widget should be able to render.", () => {
        const { getByRole, getByTitle } = withRender(<RainCloud />);
        expect(getByRole("img")).toBeInTheDocument();
        expect(getByTitle("weather.icon.rainCloud.title")).toBeInTheDocument();
    });

    it("Widget should not display title on decoration.", () => {
        const { queryByTitle, getByRole } = withRender(<RainCloud decoration />);
        expect(getByRole("img")).toBeInTheDocument();
        expect(queryByTitle("weather.icon.rainCloud.title")).not.toBeInTheDocument();
    });
});
