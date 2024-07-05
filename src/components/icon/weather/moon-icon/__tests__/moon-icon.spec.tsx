import { describe, expect, it } from "vitest";
import { MoonIcon } from "./..";
import { withRender } from "@utils/render";

describe("Component: moon-icon", () => {
    it("Widget should be able to render.", () => {
        const { getByLabelText } = withRender(<MoonIcon />);

        expect(getByLabelText("Moon")).toBeInTheDocument();
    });
});
