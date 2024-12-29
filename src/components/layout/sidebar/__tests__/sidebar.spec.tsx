import { afterEach, describe, expect, it, vi } from "vitest";
import { useDesktopScreen, useMobileScreen } from "@project/src/utils/resize-window";
import Sidebar from "@components/layout/sidebar/sidebar.component";
import { withRender } from "@project/src/utils/render";

describe("Component: siderbar", async () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("Desktop view should display the sidebar", () => {
        useDesktopScreen();
        const { getByText } = withRender(<Sidebar>mockContent</Sidebar>);
        const sideMenuText = getByText("mockContent");
        expect(sideMenuText).toBeVisible();
    });

    it("Mobile view should not display the sidebar", async () => {
        useMobileScreen();
        const { getByText } = withRender(<Sidebar>mockContent</Sidebar>);
        const sideMenuText = getByText("mockContent");
        expect(sideMenuText).not.toBeVisible();
    });
});
