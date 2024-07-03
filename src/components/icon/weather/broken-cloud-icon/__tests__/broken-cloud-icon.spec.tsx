import { describe, expect, it } from "vitest";
import { BrokenCloud } from "./..";
import { withRender } from "@utils/wrappers";

describe("Component: broken-cloud-icon", () => {
    it("Widget should be able to render.", () => {
        const { getByLabelText } = withRender(<BrokenCloud />);

        expect(getByLabelText("Broken clouds")).toBeInTheDocument();
    });
});
