import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import { MeasurementScale } from "@src/types/measurement.types";
import Navbar from "@components/layout/navbar/navbar.component";
import { SystemTheme } from "@src/types/system.types";
import { TemperatureScale } from "@src/types/weather.types";
import { server } from "@project/vitest-setup";
import { testQueryClient } from "@utils/query-client";
import { useMobileScreen } from "@project/src/utils/resize-window";
import userEvent from "@testing-library/user-event";
import { withRender } from "@utils/render";
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
        useMobileScreen();
        const user = userEvent.setup();
        const { getByRole, getByText } = withRender(<Navbar />);
        await user.click(getByRole("button", { name: /settings/i }));

        expect(getByText("settings.measurementScale")).toBeInTheDocument();
        expect(getByText("settings.temperatureScale")).toBeInTheDocument();
        expect(getByText("settings.themeColor")).toBeInTheDocument();
    });

    it("should be able to close settings dialogue in navbar.", async () => {
        const user = userEvent.setup();
        fireEvent(window, new Event("resize"));
        const { getByRole } = withRender(<Navbar />);
        await user.click(getByRole("button", { name: /settings/i }));
        await user.click(getByRole("button", { name: /close/i }));
        waitFor(() => expect(getByRole("button", { name: /settings/i })).toBeInTheDocument());
    });

    it("should have access to the search bar in mobile view.", async () => {
        useMobileScreen();

        const user = userEvent.setup();
        const { getByRole, getByPlaceholderText } = withRender(<Navbar />);
        const settingsButton = getByRole("button", { name: "component.navbar.openSearchBar" });
        await user.click(settingsButton);
        expect(getByPlaceholderText("component.searchBar.placeholder")).toBeInTheDocument();
    });

    it("should be able to close the search bar in mobile view.", async () => {
        useMobileScreen();

        const user = userEvent.setup();
        const { queryByRole, getByRole, getByLabelText } = withRender(<Navbar />);
        await user.click(getByRole("button", { name: "component.navbar.openSearchBar" }));
        expect(queryByRole("button", { name: "component.navbar.openSearchBar" })).not.toBeInTheDocument();
        await user.click(getByLabelText("component.navbar.goBacktoNavbar"));
        expect(getByRole("button", { name: "component.navbar.openSearchBar" })).toBeInTheDocument();
    });

    describe("when the mobile menu is open", async () => {
        beforeAll(() => {
            useMobileScreen();
        });

        it.each([
            ["Celsius (C°)", "Fahrenenheit (F°)", TemperatureScale.CELSIUS, "temperature.celsius.text (°C)", "temperature.fahrenheit.text (°F)"],
            ["Fahrenenheit (F°)", "Celsius (C°)", TemperatureScale.FAHRENHEIT, "temperature.fahrenheit.text (°F)", "temperature.celsius.text (°C)"],
        ])("should be able to toggle from %s to %s when clicking temperature button toggle.", async (
            _1: string,
            _2: string,
            temperatureSetting: TemperatureScale,
            from: string,
            to: string,
        ) => {
            const user = userEvent.setup();
            const settings = { temperatureScale: temperatureSetting };
            const view = withRender(<Navbar />, { settings });
            const settingsButton = view.getByRole("button", { name: /settings/i });
            await user.click(settingsButton);

            const tempButton = view.getByText(from);
            await user.click(tempButton);
            expect(view.getByText(to)).toBeInTheDocument();
        });

        it.each([
            ["Metric (M/S)", "Imperial (MPH)", MeasurementScale.METRIC, "measurement.metric (M/S)", "measurement.imperial (MPH)"],
            ["Imperial (MPH)", "Metric (M/S)", MeasurementScale.IMPERIAL, "measurement.imperial (MPH)", "measurement.metric (M/S)"],
        ])("should be able to toggle from %s to %s when clicking measurement button toggle.", async (
            _1: string,
            _2: string,
            measurementSetting: MeasurementScale,
            from: string,
            to: string,
        ) => {
            const user = userEvent.setup();
            const settings = { measurementScale: measurementSetting };
            const view = withRender(<Navbar />, { settings });
            const settingsButton = view.getByRole("button", { name: /settings/i });
            await user.click(settingsButton);

            const tempButton = view.getByText(from);
            await user.click(tempButton);
            expect(view.getByText(to)).toBeInTheDocument();
        });

        it.each([
            ["Dark Theme", "Light Theme", SystemTheme.DARK, "theme.darkTheme", "theme.lightTheme"],
            ["Light Theme", "Dark Theme", SystemTheme.LIGHT, "theme.lightTheme", "theme.darkTheme"],
        ])("should be able to toggle from %s to %s when clicking theme button toggle.", async (
            _1: string,
            _2: string,
            themeSetting: SystemTheme,
            from: string,
            to: string,
        ) => {
            const user = userEvent.setup();
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
