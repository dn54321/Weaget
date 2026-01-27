import { withRender } from "@utils/render";
import { describe, expect, it } from "vitest";

import { FewCloudIcon } from "./..";

describe("Component: few-cloud-icon", () => {
    it("Widget should be able to render.", () => {
        const { getByRole, getByTitle } = withRender(<FewCloudIcon />);
        expect(getByRole("img")).toBeInTheDocument();
        expect(getByTitle("weather.icon.fewCloud.title")).toBeInTheDocument();
    });

    it("Widget should not display title on decoration.", () => {
        const { getByRole, queryByTitle } = withRender(<FewCloudIcon decoration />);
        expect(getByRole("img")).toBeInTheDocument();
        expect(queryByTitle("weather.icon.fewCloud.title")).not.toBeInTheDocument();
    });
});
