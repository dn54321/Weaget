import { describe, expect, it } from "vitest";
import { ScatteredCloud } from "..";
import { withRender } from "@utils/render";

describe("Component: scattered-cloud-icon", () => {
    it("Widget should be able to render.", () => {
        const { getByLabelText } = withRender(<ScatteredCloud />);

        expect(getByLabelText("Scattered cloud")).toBeInTheDocument();
    });
});
