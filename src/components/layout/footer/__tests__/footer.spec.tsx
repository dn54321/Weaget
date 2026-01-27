import Footer from "@components/layout/footer/footer.component";
import { withRender } from "@src/utils/render";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("Component: footer", async () => {
    const mocks = vi.hoisted(() => {
        return {
            mockRouterPush: vi.fn()
        };
    });

    beforeEach(() => {
        vi.mock("next/navigation", () => ({
            usePathname: () => "/",
            useRouter: () => ({ push: mocks.mockRouterPush })
        }));
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    it.each([
        ["Source code", "https://github.com/dn54321/Weaget", "footer.iconButton.sourceCode.title"],
        ["Github", "https://github.com/dn54321/", "footer.iconButton.github.title"],
        ["Linkedin", "https://www.linkedin.com/in/daniel-pham-8bba33193/", "footer.iconButton.linkedIn.title"],
        ["Weather icons", "/icons", "footer.iconButton.icons.title"]]
    )("should have a %s button that takes the user to %s", async (_iconName, link, title) => {
        const { getByLabelText } = withRender(<Footer />);
        const user = userEvent.setup();
        const button = getByLabelText(title);
        await user.click(button);
        expect(mocks.mockRouterPush).toBeCalledWith(link);
    });
});
