import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BrokenCloud } from "./..";
import { withTestWrapper } from "@utils/wrappers";

describe("Component: broken-cloud-icon", () => {
    it("Widget should be able to render.", () => {
        const { getByLabelText } = render(
            withTestWrapper(<BrokenCloud />)
        );

        expect(getByLabelText("Broken clouds")).toBeInTheDocument();
    });
});
