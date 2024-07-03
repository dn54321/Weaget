import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RainCloud } from "..";
import { withRender } from "@utils/wrappers";

describe("Component: rain-cloud-icon", () => {
    it("Widget should be able to render.", () => {
        const { getByLabelText } = withRender(<RainCloud />);

        expect(getByLabelText("Rain cloud")).toBeInTheDocument();
    });
});
