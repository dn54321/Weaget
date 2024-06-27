
import { Box } from '@mui/material';
import * as math from '@src/utils/math';
import { useSettingStore } from '../../hooks/stores/use-setting-store';
import { MeasurementScale } from '../../types/measurement.types';


/*
     VolumeUnit
     
     The veolumeUnit component is a component that outputs the speed in the selected system unit.
     The speeds are as follows:
        - Metric: mm/h
        - Imperial: inches/h  
*/

function convertMeasurement(value: number, measurementScale: string) {
    switch (measurementScale) {
        case MeasurementScale.METRIC: return value;
        case MeasurementScale.IMPERIAL: return value*0.039370078740157;
        default: return value;
    }
}

export function getSymbol(temperatureScale: string) {
    switch (temperatureScale) {
        case MeasurementScale.IMPERIAL: return <abbr title="inches per hour">iph</abbr>;
        case MeasurementScale.METRIC: return <abbr title="millimeters per hour">mmh<Box component="sup" sx={{
            verticalAlign: "top", 
            position: "relative",
            top: "-0.5em",
        }}>-1</Box></abbr>;
    }
}

interface VolumeUnitProps {
    decimals?: number;
    symbol?: boolean;
    value: number;
}

export function getVolume(measurementScale: MeasurementScale, value: number, decimal = 1) {
    return math.round(convertMeasurement(value, measurementScale), decimal);
}

export function getVolumeSymbol(measurementScale: MeasurementScale) {
    return measurementScale === MeasurementScale.IMPERIAL ? "iph" : "mm/h";
}

export default function VolumeUnit(props: VolumeUnitProps) {
    const decimal = props.decimals ?? 1;
    const symbol = props.symbol ?? true;
    const measurementSystem = useSettingStore(state => state.measurementScale);
    return (
    <>
        {math.round(convertMeasurement(props.value, measurementSystem), decimal)}
        {symbol && getSymbol(measurementSystem)}
    </>
    )
}