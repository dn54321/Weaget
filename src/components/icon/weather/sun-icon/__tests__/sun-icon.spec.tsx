import { describe, expect, it } from "vitest";
import { withRender } from "@utils/render";
import { SunIcon } from "..";

describe("Component: sun-icon", () => {
    it("Widget should be able to render.", () => {
        const { getByLabelText } = withRender(<SunIcon />);

        expect(getByLabelText("Sun")).toBeInTheDocument();
    });
});
