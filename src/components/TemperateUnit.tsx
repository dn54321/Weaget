
import * as math from '@src/utils/math';
import { useSettingStore } from '../hooks/stores/useSettingStore';
import { TemperatureScale } from '../types/weather.types';

/*
     TemperatureUnit
     
     The TemperateUnit component is a component that outputs the tempreature in the selected system unit.
     The supported temperatures are as follows:
        - Celcius: C
        - Fahrenheit: F
*/

function convertTemperature(temp: number, tempScale: string) {
    switch (tempScale) {
        case TemperatureScale.CELSIUS: return (temp-273.15);
        case TemperatureScale.FAHRENHEIT: return ((temp - 273.15) * 9/5 + 32);
        default: return temp
    }
}

export function getSymbol(tempScale: string) {
    switch (tempScale) {
        case TemperatureScale.CELSIUS: return "C";
        case TemperatureScale.FAHRENHEIT: return "F";
        default: return "K";
    }
}

export interface TempProps {
    decimals?: number;
    symbol?: boolean;
    value: number;
}

export default function Temp(props: TempProps) {
    const round = props.decimals ?? 0;
    const symbol = Boolean(props.symbol);

    const temperatureScale = useSettingStore((state) => state.temperatureScale);
    return (
    <>
        {math.round(convertTemperature(props.value, temperatureScale), round)+"°"}
        {symbol && getSymbol(temperatureScale)}
    </>
    )
}