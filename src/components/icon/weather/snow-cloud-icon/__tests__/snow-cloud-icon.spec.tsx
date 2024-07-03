import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SnowCloud } from "..";
import { withRender } from "@utils/wrappers";

describe("Component: snow-cloud-icon", () => {
    it("Widget should be able to render.", () => {
        const { getByLabelText } = withRender(<SnowCloud />);

        expect(getByLabelText("Snow cloud")).toBeInTheDocument();
    });
});
