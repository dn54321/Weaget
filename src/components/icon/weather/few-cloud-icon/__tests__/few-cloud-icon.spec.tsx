import { describe, expect, it } from "vitest";
import { FewCloudIcon } from "./..";
import { withRender } from "@utils/render";

describe("Component: few-cloud-icon", () => {
    it("Widget should be able to render.", () => {
        const { getByRole, getByTitle } = withRender(<FewCloudIcon />);
        expect(getByRole("img")).toBeInTheDocument();
        expect(getByTitle("weather.icon.fewCloud.title")).toBeInTheDocument();
    });

    it("Widget should not display title on decoration.", () => {
        const { queryByTitle, getByRole } = withRender(<FewCloudIcon decoration />);
        expect(getByRole("img")).toBeInTheDocument();
        expect(queryByTitle("weather.icon.fewCloud.title")).not.toBeInTheDocument();
    });
});
