import { describe, expect, it } from "vitest";
import Logo from "@components/icon/core/logo-icon/logo-icon.component";
import { withRender } from "@utils/render";

describe("Component: logo-icon", () => {
    it("Widget should be able to render.", () => {
        const { getByLabelText } = withRender(<Logo />);
        expect(getByLabelText("webapp.name general.logo")).toBeInTheDocument();
    });
});
