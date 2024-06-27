
import { Box } from '@mui/material';
import * as math from '@src/utils/math';
import { useSettingStore } from '../../hooks/stores/use-setting-store';
import { MeasurementScale } from '../../types/measurement.types';

/*
     SpeedUnit
     
     The speedUnit component is a component that outputs the speed in the selected system unit.
     The speeds are as follows:
        - Metric: m/s
        - Imperial: mph  
*/

function convertMeasurement(value: number, measurementScale: string) {
    switch (measurementScale) {
        case MeasurementScale.METRIC: return value;
        case MeasurementScale.IMPERIAL: return value*2.23694;
        default: return value;
    }
}

export function getSymbol(temperatureScale: string) {
    switch (temperatureScale) {
        case MeasurementScale.IMPERIAL: return <abbr title="miles per hour">mph</abbr>;
        case MeasurementScale.METRIC: return <abbr title="meters per second">ms<Box component="sup" sx={{
            verticalAlign: "top", 
            position: "relative",
            top: "-0.5em",
        }}>-1</Box></abbr>;
    }
}

interface MeasurementUnitProps {
    decimals?: number;
    symbol?: boolean;
    value: number;
}

export default function SpeedUnit(props: MeasurementUnitProps) {
    const round = props.decimals ?? 1;
    const symbol = props.symbol ?? true;
    const measurementSystem = useSettingStore(state => state.measurementScale);
    return (
    <>
        {math.round(convertMeasurement(props.value, measurementSystem), round)}
        {symbol && getSymbol(measurementSystem)}
    </>
    )
}