import { withRender } from "@utils/render";
import { describe, expect, it } from "vitest";

import { SnowCloud } from "..";

describe("Component: snow-cloud-icon", () => {
    it("Widget should be able to render.", () => {
        const { getByRole, getByTitle } = withRender(<SnowCloud />);
        expect(getByRole("img")).toBeInTheDocument();
        expect(getByTitle("weather.icon.snowCloud.title")).toBeInTheDocument();
    });

    it("Widget should not display title on decoration.", () => {
        const { getByRole, queryByTitle } = withRender(<SnowCloud decoration />);
        expect(getByRole("img")).toBeInTheDocument();
        expect(queryByTitle("weather.icon.snowCloud.title")).not.toBeInTheDocument();
    });
});
