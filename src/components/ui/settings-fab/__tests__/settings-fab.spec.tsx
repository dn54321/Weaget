import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { MeasurementScale } from "@src/types/measurement.types";
import { TemperatureScale } from "@src/types/weather.types";
import { withRender } from "@utils/render";
import { SettingsFab } from "./..";

describe("Component: settings-fab", async () => {
    it("should only show temperature scale if temperature is enabled.", () => {
        const settings = {
            TemperatureScale: TemperatureScale.CELSIUS,
            measurementScale: MeasurementScale.METRIC,
        };
        const { getByText } = withRender(<SettingsFab temperature />, { settings });
        expect(getByText(TemperatureScale.CELSIUS)).toBeInTheDocument();
        expect(() => getByText(`${MeasurementScale.METRIC} system`)).toThrow();
    });

    it("should only show measurement scale if temperature is enabled.", () => {
        const settings = {
            TemperatureScale: TemperatureScale.CELSIUS,
            measurementScale: MeasurementScale.METRIC,
        };
        const { getByText } = withRender(<SettingsFab measurement />, { settings });
        expect(getByText(`${MeasurementScale.METRIC} system`)).toBeInTheDocument();
        expect(() => getByText(TemperatureScale.CELSIUS)).toThrow();
    });

    it.each([
        [TemperatureScale.CELSIUS, TemperatureScale.FAHRENHEIT],
        [TemperatureScale.FAHRENHEIT, TemperatureScale.CELSIUS],
    ])("should toggle when temperature toggle is clicked from %s to %s.",
        async (from, to) => {
            const user = userEvent.setup();
            const settings = { temperatureScale: from };
            const { getByText } = withRender(<SettingsFab measurement temperature />, { settings });
            await user.click(getByText(from));
            expect(getByText(to)).toBeInTheDocument();
        });

    it.each([
        [MeasurementScale.METRIC, MeasurementScale.IMPERIAL],
        [MeasurementScale.IMPERIAL, MeasurementScale.METRIC],
    ])("should toggle when imperial toggle is clicked from %s to %s.",
        async (from, to) => {
            const user = userEvent.setup();
            const settings = { measurementScale: from };
            const { getByText } = withRender(<SettingsFab measurement temperature />, { settings });
            await user.click(getByText(`${from} system`));
            expect(getByText(`${to} system`)).toBeInTheDocument();
        });
});
