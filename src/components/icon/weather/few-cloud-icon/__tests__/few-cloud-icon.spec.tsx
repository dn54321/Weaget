import { describe, expect, it } from "vitest";
import { FewCloudIcon } from "./..";
import { withRender } from "@utils/wrappers";

describe("Component: few-cloud-icon", () => {
    it("Widget should be able to render.", () => {
        const { getByLabelText } = withRender(<FewCloudIcon />);
        expect(getByLabelText("Few clouds")).toBeInTheDocument();
    });
});
