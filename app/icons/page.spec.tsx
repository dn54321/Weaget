import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { weatherIconShowcase } from "./layout";
import Page from "./page";
import userEvent from "@testing-library/user-event";
import { withRender } from "@utils/wrappers";

describe("Page: app/icons/page", () => {
    const mocks = vi.hoisted(() => {
        return {
            mockRouterPush: vi.fn(),
        };
    });

    beforeEach(() => {
        vi.mock("next/navigation", () => ({
            useRouter: () => ({ push: mocks.mockRouterPush }),
        }));
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    it("should be able to view a grid of icons.", () => {
        const { getAllByTestId } = withRender(<Page />);
        const iconCards = getAllByTestId("icon-card");
        expect(iconCards).not.toHaveLength(0);
    });

    it.each(weatherIconShowcase)("should redirect to $name weather icon page when clicked.", async (
        weatherIcon
    ) => {
        mocks.mockRouterPush.mockResolvedValue(true);
        const user = userEvent.setup();
        const { getByText } = withRender(<Page />);
        const linkElement = getByText(weatherIcon.name);
        await user.click(linkElement);
        expect(mocks.mockRouterPush).toHaveBeenCalledWith(`icons/weather/${weatherIcon.id}`);
    });
});
