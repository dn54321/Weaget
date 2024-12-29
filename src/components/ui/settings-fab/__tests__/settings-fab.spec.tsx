import { describe, expect, it } from "vitest";
import { MeasurementScale } from "@src/types/measurement.types";
import { SettingsFab } from "./..";
import { TemperatureScale } from "@src/types/weather.types";
import userEvent from "@testing-library/user-event";
import { withRender } from "@utils/render";

describe("Component: settings-fab", async () => {
    it("should only show temperature scale if temperature is enabled.", () => {
        const settings = {
            TemperatureScale: TemperatureScale.CELSIUS,
            measurementScale: MeasurementScale.METRIC,
        };
        const { getByText } = withRender(<SettingsFab temperature />, { settings });
        expect(getByText("temperature.celsius.text")).toBeInTheDocument();
        expect(() => getByText("component.settingsFab.metricSystem")).toThrow();
    });

    it("should only show measurement scale if temperature is enabled.", () => {
        const settings = {
            TemperatureScale: TemperatureScale.CELSIUS,
            measurementScale: MeasurementScale.METRIC,
        };
        const { getByText } = withRender(<SettingsFab measurement />, { settings });
        expect(getByText(`component.settingsFab.metricSystem`)).toBeInTheDocument();
        expect(() => getByText("temperature.celsius.text")).toThrow();
    });

    it.each([
        [TemperatureScale.CELSIUS, TemperatureScale.FAHRENHEIT],
        [TemperatureScale.FAHRENHEIT, TemperatureScale.CELSIUS],
    ])("should toggle when temperature toggle is clicked from %s to %s.",
        async (from, to) => {
            const user = userEvent.setup();
            const settings = { temperatureScale: from };
            const { getByText } = withRender(<SettingsFab measurement temperature />, { settings });
            await user.click(getByText(`temperature.${from}.text`));
            expect(getByText(`temperature.${to}.text`)).toBeInTheDocument();
        });

    it.each([
        [MeasurementScale.METRIC, MeasurementScale.IMPERIAL],
        [MeasurementScale.IMPERIAL, MeasurementScale.METRIC],
    ])("should toggle when imperial toggle is clicked from %s to %s.",
        async (from, to) => {
            const user = userEvent.setup();
            const settings = { measurementScale: from };
            const { getByText } = withRender(<SettingsFab measurement temperature />, { settings });
            await user.click(getByText(`component.settingsFab.${from}System`));
            expect(getByText(`component.settingsFab.${to}System`)).toBeInTheDocument();
        });
});
