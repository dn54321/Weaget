import { withRender } from "@utils/render";
import { describe, expect, it } from "vitest";

import { BrokenCloud } from "./..";

describe("Component: broken-cloud-icon", () => {
    it("Widget should be able to render.", () => {
        const { getByRole, getByTitle } = withRender(<BrokenCloud />);
        expect(getByRole("img")).toBeInTheDocument();
        expect(getByTitle("weather.icon.brokenCloud.title")).toBeInTheDocument();
    });

    it("Widget should not display title on decoration.", () => {
        const { getByRole, queryByTitle } = withRender(<BrokenCloud decoration />);
        expect(getByRole("img")).toBeInTheDocument();
        expect(queryByTitle("weather.icon.brokenCloud.title")).not.toBeInTheDocument();
    });
});
