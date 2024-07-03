import { describe, expect, it } from "vitest";
import { Thunderstorm } from "./..";
import { withRender } from "@utils/wrappers";

describe("Component: thunderstorm-icon", () => {
    it("Widget should be able to render.", () => {
        const { getByLabelText } = withRender(<Thunderstorm />);
        expect(getByLabelText("Thunderstorm")).toBeInTheDocument();
    });
});
