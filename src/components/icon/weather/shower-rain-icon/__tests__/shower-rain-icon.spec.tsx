import { describe, expect, it } from "vitest";
import { ShowerRain } from "..";
import { withRender } from "@utils/wrappers";

describe("Component: shower-rain-icon", () => {
    it("Widget should be able to render.", () => {
        const { getByLabelText } = withRender(<ShowerRain />);

        expect(getByLabelText("Shower rain")).toBeInTheDocument();
    });
});
