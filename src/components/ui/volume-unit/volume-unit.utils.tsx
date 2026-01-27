import { MeasurementScale } from "@src/types/measurement.types";
import { round } from "@utils/math";

export function convertVolumeMeasurement(measurementScale: MeasurementScale, value: number, decimals = 100) {
    switch (measurementScale) {
        case MeasurementScale.IMPERIAL: return round(value * 0.039370078740157, decimals);
        case MeasurementScale.METRIC: return round(value, decimals);
    }
}

export function getVolumeSymbol(measurementScale: MeasurementScale) {
    switch (measurementScale) {
        case MeasurementScale.IMPERIAL: return "iph";
        case MeasurementScale.METRIC: return "mm/h";
    }
}
