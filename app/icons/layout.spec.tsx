import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Layout, { weatherIconShowcase } from "./layout";
import { render } from "@testing-library/react";
import { withTestWrapper } from "@utils/wrappers";
import userEvent from "@testing-library/user-event";

describe("Page: app/icons/layout.tsx", async () => {
    const mocks = vi.hoisted(() => {
        return {
            mockRouterPush: vi.fn(),
        };
    });

    beforeEach(() => {
        vi.mock("next/navigation", () => ({
            useRouter: () => ({ push: mocks.mockRouterPush }),
            usePathname: () => "/",
        }));
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    it("should be able to render it's children element successfully.", () => {
        const { getByText } = render(withTestWrapper(<Layout>testText</Layout>));
        expect(getByText("testText")).toBeInTheDocument();
    });

    it("should take me to the gallery page when I click its icon.", async (icon) => {
        const user = userEvent.setup();
        const { getByText } = render(withTestWrapper(<Layout>testText</Layout>));
        await user.click(getByText("Gallery"));
        expect(mocks.mockRouterPush).toBeCalledWith(`/icons`);
    });

    it.each(weatherIconShowcase)("should take me to the $name page when I click its icon.", async (icon) => {
        const user = userEvent.setup();
        const { getByText } = render(withTestWrapper(<Layout>testText</Layout>));
        await user.click(getByText(icon.name));
        expect(mocks.mockRouterPush).toBeCalledWith(`/icons/weather/${icon.id}`);
    });
});
