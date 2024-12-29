import { describe, expect, it } from "vitest";
import { OvercastCloud } from "./..";
import { withRender } from "@utils/render";

describe("Component: overcast-cloud-icon", () => {
    it("Widget should be able to render.", () => {
        const { getByRole, getByTitle } = withRender(<OvercastCloud />);
        expect(getByRole("img")).toBeInTheDocument();
        expect(getByTitle("weather.icon.overcastCloud.title")).toBeInTheDocument();
    });

    it("Widget should not display title on decoration.", () => {
        const { queryByTitle, getByRole } = withRender(<OvercastCloud decoration />);
        expect(getByRole("img")).toBeInTheDocument();
        expect(queryByTitle("weather.icon.overcastCloud.title")).not.toBeInTheDocument();
    });
});
