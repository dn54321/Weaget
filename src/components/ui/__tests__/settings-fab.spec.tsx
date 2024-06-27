import { render, renderHook } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { useSettingStore } from "../../../hooks/stores/use-setting-store"
import { MeasurementScale } from "../../../types/measurement.types"
import { TemperatureScale } from "../../../types/weather.types"
import { testWrapper } from "../../../utils/wrappers"
import SettingsFab from "../settings-fab"

describe("Component: settings-fab", async () => {
    it("should only show temperature scale if temperature is enabled.", () => {
        const {result} = renderHook(() => useSettingStore(), {wrapper: testWrapper});
        result.current.setTemperatureScale(TemperatureScale.CELSIUS);
        result.current.setMeasurementScale(MeasurementScale.METRIC);
        const {getByText} = render(<SettingsFab temperature/>);
        expect(getByText(TemperatureScale.CELSIUS)).toBeInTheDocument();
        expect(() => getByText(`${MeasurementScale.METRIC} system`)).toThrow();
    });

    it("should only show measurement scale if temperature is enabled.", () => {
        const {result} = renderHook(() => useSettingStore(), {wrapper: testWrapper});
        result.current.setTemperatureScale(TemperatureScale.CELSIUS);
        result.current.setMeasurementScale(MeasurementScale.METRIC);
        const {getByText} = render(<SettingsFab measurement/>);
        expect(getByText(`${MeasurementScale.METRIC} system`)).toBeInTheDocument();
        expect(() => getByText(TemperatureScale.CELSIUS)).toThrow();
    });

    it.each([
        [TemperatureScale.CELSIUS, TemperatureScale.FAHRENHEIT],
        [TemperatureScale.FAHRENHEIT, TemperatureScale.CELSIUS],
    ])("should toggle when temperature toggle is clicked from %s to %s.", 
    async (from, to) => {
        const user = userEvent.setup();
        const {result} = renderHook(() => useSettingStore(), {wrapper: testWrapper});
        result.current.setTemperatureScale(from);
        const {getByText} = render(<SettingsFab temperature measurement/>);
        await user.click(getByText(from));
        expect(getByText(to)).toBeInTheDocument();
        expect(result.current.temperatureScale).toEqual(to);
    });

    it.each([
        [MeasurementScale.METRIC, MeasurementScale.IMPERIAL],
        [MeasurementScale.IMPERIAL, MeasurementScale.METRIC],
    ])("should toggle when imperial toggle is clicked from %s to %s.", 
    async (from, to) => {
        const user = userEvent.setup();
        const {result} = renderHook(() => useSettingStore(), {wrapper: testWrapper});
        result.current.setMeasurementScale(from);
        const {getByText} = render(<SettingsFab temperature measurement/>);
        await user.click(getByText(`${from} system`));
        expect(getByText(`${to} system`)).toBeInTheDocument();
        expect(result.current.measurementScale).toEqual(to);
    });
})