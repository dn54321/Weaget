import { MeasurementScale } from "@src/types/measurement.types";

export function convertSpeedMeasurement(metricValue: number, measurementScale: string) {
    switch (measurementScale) {
        case MeasurementScale.METRIC: return metricValue;
        case MeasurementScale.IMPERIAL: return metricValue * 2.23694;
        default: return metricValue;
    }
}

export function getSpeedSymbol(measurementScale: MeasurementScale) {
    switch (measurementScale) {
        case MeasurementScale.IMPERIAL: return "mph";
        case MeasurementScale.METRIC: return "m/s";
    }
}
