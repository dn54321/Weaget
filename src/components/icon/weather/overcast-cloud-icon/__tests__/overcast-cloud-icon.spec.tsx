import { describe, expect, it } from "vitest";
import { OvercastCloud } from "./..";
import { withRender } from "@utils/render";

describe("Component: overcast-cloud-icon", () => {
    it("Widget should be able to render.", () => {
        const { getByLabelText } = withRender(<OvercastCloud />);

        expect(getByLabelText("Overcast cloud")).toBeInTheDocument();
    });
});
