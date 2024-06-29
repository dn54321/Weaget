import { RenderResult, act, fireEvent, render, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { testWrapper, withTestWrapper } from "@utils/wrappers";
import Navbar from "@components/layout/navbar/navbar.component";
import { server } from "../../../../../vitest-setup";
import { testQueryClient } from "@utils/query-client";
import userEvent from "@testing-library/user-event";
import { TemperatureScale } from "@src/types/weather.types";
import { useSettingStore } from "@src/hooks/stores/use-setting-store";
import { MeasurementScale } from "@src/types/measurement.types";
import { useTheme } from "@src/hooks/use-theme";
import { SystemTheme } from "@src/types/system.types";

describe('Component: navbar', () => {
    beforeEach(() => {
        vi.mock("next/navigation", () => ({
            useRouter: () => ({push: () => true}),
        }));
    });

    afterEach(() => {
        testQueryClient.clear();
        server.resetHandlers();
        vi.resetAllMocks();
    });
    
    it('should render navbar.', () => {
        render(withTestWrapper(<Navbar/>))
    });

    it('should render navbar with hamburger if mobileBurgerFn is defined.', async () => {
        const mockfn = vi.fn();
        const user = userEvent.setup();
        const { getByLabelText } = render(withTestWrapper(<Navbar mobileBurgerFn={mockfn}/>));
        await user.click(getByLabelText("open menu"));
        expect(mockfn).toHaveBeenCalled();
    });

    it('should have access to settings by clicking the settings icon in mobile view.', async () => {
        const user = userEvent.setup();
        window.innerWidth = 500;
        fireEvent(window, new Event('resize'));
        const { getByRole, getByText } = render(withTestWrapper(<Navbar/>));
        const settingsButton = getByRole('button', { name: /settings/i });
        await user.click(settingsButton);
        expect(getByText("Measurement System")).toBeInTheDocument();
        expect(getByText("Temperature Scale")).toBeInTheDocument();
        expect(getByText("Theme Colour")).toBeInTheDocument();
    });

    describe('when the mobile menu is open', async () => {
        let renderedScreen: RenderResult;
        beforeEach(async () => {
            const user = userEvent.setup();
            window.innerWidth = 500;
            fireEvent(window, new Event('resize'));
            renderedScreen = render(withTestWrapper(<Navbar/>));
            const settingsButton = renderedScreen.getByRole('button', { name: /settings/i });
            await user.click(settingsButton);
        });

        it.each([
            [TemperatureScale.CELSIUS, TemperatureScale.FAHRENHEIT, "Fahrenenheit (F°)"],
            [TemperatureScale.FAHRENHEIT, TemperatureScale.CELSIUS, "Celcius (C°)"]
        ])('should be able to toggle temperature scale from %s to %s', async (
            from: TemperatureScale,
            to: TemperatureScale,
            pattern: string
        ) => {
            const user = userEvent.setup();
            const {result} = renderHook(() => useSettingStore(), { wrapper: testWrapper });
            act(() => result.current.setTemperatureScale(from));
            const tempButton = renderedScreen.getByText(pattern);
            await user.click(tempButton);
            expect(result.current.temperatureScale).toEqual(to);
        });

        it.each([
            [MeasurementScale.METRIC, MeasurementScale.IMPERIAL, "Imperial (MPH)"],
            [MeasurementScale.IMPERIAL, MeasurementScale.METRIC, "Metric (M/S)"]
        ])('should be able to toggle temperature scale from %s to %s', async (
            from: MeasurementScale,
            to: MeasurementScale,
            pattern: string
        ) => {
            const user = userEvent.setup();
            const {result} = renderHook(() => useSettingStore(), { wrapper: testWrapper });
            act(() => result.current.setMeasurementScale(from));
            const measurementButton = renderedScreen.getByText(pattern);
            await user.click(measurementButton);
            expect(result.current.measurementScale).toEqual(to);
        });

        it.each([
            [SystemTheme.DARK, SystemTheme.LIGHT, "Light Theme"],
            [SystemTheme.LIGHT, SystemTheme.DARK, "Dark Theme"]
        ])('should be able to toggle temperature scale from %s to %s', async (
            from: SystemTheme,
            to: SystemTheme,
            pattern: string
        ) => {
            const user = userEvent.setup();
            const {result} = renderHook(() => useTheme(), { wrapper: testWrapper });
            act(() => result.current.setThemeColour(from));
            const themeButton = renderedScreen.getByText(pattern);
            await user.click(themeButton);
            expect(result.current.themeColour).toEqual(to);
        });

        
    });
});