import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Layout, { weatherIconShowcase } from "./layout";
import { useMobileScreen } from "@project/src/utils/resize-window";
import userEvent from "@testing-library/user-event";
import { withRender } from "@utils/render";

describe("Page: app/icons/layout.tsx", async () => {
    const mocks = vi.hoisted(() => {
        return {
            mockRouterPush: vi.fn(),
        };
    });

    beforeEach(() => {
        vi.mock("next/navigation", () => ({
            usePathname: () => "/",
            useRouter: () => ({ push: mocks.mockRouterPush }),
        }));
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    it("should be able to render it's children element successfully.", () => {
        const { getByText } = withRender(<Layout>testText</Layout>);
        expect(getByText("testText")).toBeInTheDocument();
    });

    it("should take me to the gallery page when I click its icon.", async () => {
        const user = userEvent.setup();
        const { getByText } = withRender(<Layout>testText</Layout>);
        await user.click(getByText("page.iconGallery.gallery"));
        expect(mocks.mockRouterPush).toBeCalledWith(`/icons`);
    });

    it.each(weatherIconShowcase)("should take me to the $name page when I click its icon.", async (icon) => {
        const user = userEvent.setup();
        const { getByText } = withRender(<Layout>testText</Layout>);
        await user.click(getByText(icon.name));
        expect(mocks.mockRouterPush).toBeCalledWith(`/icons/weather/${icon.id}`);
    });

    it("should minimise the side bar on tablet size which is accessible via the burger menu icon.", async () => {
        const user = userEvent.setup();
        useMobileScreen();
        const { getByLabelText, getByText } = withRender(<Layout>testText</Layout>);
        expect(getByText("page.iconGallery.gallery")).not.toBeVisible();
        const burgerMenu = getByLabelText("open menu");
        await user.click(burgerMenu);
        expect(getByText("page.iconGallery.gallery")).toBeVisible();
    });
});
