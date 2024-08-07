import { describe, expect, it } from "vitest";
import { Mist } from "..";
import { withRender } from "@utils/render";

describe("Component: Mist", () => {
    it("Widget should be able to render.", () => {
        const { getByLabelText } = withRender(<Mist />);

        expect(getByLabelText("Mist")).toBeInTheDocument();
    });
});
