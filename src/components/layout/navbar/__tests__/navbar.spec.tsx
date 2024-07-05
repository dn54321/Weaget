import { fireEvent, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { withRender } from "@utils/render";
import Navbar from "@components/layout/navbar/navbar.component";
import { server } from "@project/vitest-setup";
import { testQueryClient } from "@utils/query-client";
import userEvent from "@testing-library/user-event";
import { TemperatureScale } from "@src/types/weather.types";
import { MeasurementScale } from "@src/types/measurement.types";
import { SystemTheme } from "@src/types/system.types";

describe("Component: navbar", () => {
    beforeEach(() => {
        vi.mock("next/navigation", () => ({
            useRouter: () => ({ push: () => true }),
        }));
    });

    afterEach(() => {
        testQueryClient.clear();
        server.resetHandlers();
        vi.resetAllMocks();
    });

    it("should render navbar.", () => {
        withRender(<Navbar />);
    });

    it("should render navbar with hamburger if mobileBurgerFn is defined.", async () => {
        const mockfn = vi.fn();
        const user = userEvent.setup();
        const { getByLabelText } = withRender(<Navbar mobileBurgerFn={mockfn} />);
        await user.click(getByLabelText("open menu"));
        expect(mockfn).toHaveBeenCalled();
    });

    it("should have access to settings by clicking the settings icon in mobile view.", async () => {
        const user = userEvent.setup();
        window.innerWidth = 500;
        fireEvent(window, new Event("resize"));
        const { getByRole, getByText } = withRender(<Navbar />);
        const settingsButton = getByRole("button", { name: /settings/i });
        await user.click(settingsButton);
        expect(getByText("Measurement System")).toBeInTheDocument();
        expect(getByText("Temperature Scale")).toBeInTheDocument();
        expect(getByText("Theme Colour")).toBeInTheDocument();
    });

    it("should be able to close settings dialogue in navbar.", async () => {
        const user = userEvent.setup();
        window.innerWidth = 500;
        fireEvent(window, new Event("resize"));
        const { getByRole } = withRender(<Navbar />);
        await user.click(getByRole("button", { name: /settings/i }));
        await user.click(getByRole("button", { name: /close/i }));
        waitFor(() => expect(getByRole("button", { name: /settings/i })).toBeInTheDocument());
    });

    it("should have access to the search bar in mobile view.", async () => {
        const user = userEvent.setup();
        window.innerWidth = 500;
        fireEvent(window, new Event("resize"));
        const { getByRole, getByPlaceholderText } = withRender(<Navbar />);
        const settingsButton = getByRole("button", { name: /Search Weather/i });
        await user.click(settingsButton);
        expect(getByPlaceholderText("Search Weather Location")).toBeInTheDocument();
    });

    it("should be able to close the search bar in mobile view.", async () => {
        const user = userEvent.setup();
        window.innerWidth = 500;
        fireEvent(window, new Event("resize"));
        const { getByRole, getByLabelText } = withRender(<Navbar />);
        await user.click(getByRole("button", { name: /Search Weather/i }));
        await user.click(getByLabelText("go back"));
        expect(getByRole("button", { name: /Search Weather/i })).toBeInTheDocument();
    });

    describe("when the mobile menu is open", async () => {
        it.each([
            ["Celcius (C°)", "Fahrenenheit (F°)", TemperatureScale.CELSIUS],
            ["Fahrenenheit (F°)", "Celcius (C°)", TemperatureScale.FAHRENHEIT],
        ])("should be able to toggle from %s to %s when clicking temperature button toggle.", async (
            from: string,
            to: string,
            temperatureSetting: TemperatureScale
        ) => {
            const user = userEvent.setup();
            window.innerWidth = 500;
            fireEvent(window, new Event("resize"));
            const settings = { temperatureScale: temperatureSetting };
            const view = withRender(<Navbar />, { settings });
            const settingsButton = view.getByRole("button", { name: /settings/i });
            await user.click(settingsButton);

            const tempButton = view.getByText(from);
            await user.click(tempButton);
            expect(view.getByText(to)).toBeInTheDocument();
        });

        it.each([
            ["Metric (M/S)", "Imperial (MPH)", MeasurementScale.METRIC],
            ["Imperial (MPH)", "Metric (M/S)", MeasurementScale.IMPERIAL],
        ])("should be able to toggle from %s to %s when clicking measurement button toggle.", async (
            from: string,
            to: string,
            measurementSetting: MeasurementScale
        ) => {
            const user = userEvent.setup();
            window.innerWidth = 500;
            fireEvent(window, new Event("resize"));
            const settings = { measurementScale: measurementSetting };
            const view = withRender(<Navbar />, { settings });
            const settingsButton = view.getByRole("button", { name: /settings/i });
            await user.click(settingsButton);

            const tempButton = view.getByText(from);
            await user.click(tempButton);
            expect(view.getByText(to)).toBeInTheDocument();
        });

        it.each([
            ["Dark Theme", "Light Theme", SystemTheme.DARK],
            ["Light Theme", "Dark Theme", SystemTheme.LIGHT],
        ])("should be able to toggle from %s to %s when clicking theme button toggle.", async (
            from: string,
            to: string,
            themeSetting: SystemTheme
        ) => {
            const user = userEvent.setup();
            window.innerWidth = 500;
            fireEvent(window, new Event("resize"));
            const settings = { theme: themeSetting };
            const view = withRender(<Navbar />, { settings });
            const settingsButton = view.getByRole("button", { name: /settings/i });
            await user.click(settingsButton);

            const tempButton = view.getByText(from);
            await user.click(tempButton);
            expect(view.getByText(to)).toBeInTheDocument();
        });
    });
});
