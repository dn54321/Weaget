import * as math from "@src/utils/math";
import { useSettingStore } from "@src/hooks/stores/use-setting-store";
import { convertTemperature, getTemperatureSymbol } from "./temperature-unit.utils";
import { TemperatureScale } from "@src/types/weather.types";

/*
     TemperatureUnit

     The TemperateUnit component is a component that outputs the tempreature in the selected system unit.
     The supported temperatures are as follows:
        - Celcius: C
        - Fahrenheit: F
*/

export interface TempProps {
    decimals?: number;
    symbol?: boolean;
    value: number;
}

export default function TempUnit(props: TempProps) {
    const round = props.decimals ?? 0;
    const symbol = Boolean(props.symbol);
    const temperatureScale = useSettingStore(state => state.temperatureScale) as TemperatureScale;
    return (
        <>
            {math.round(convertTemperature(temperatureScale, props.value), round) + "°"}
            {symbol && getTemperatureSymbol(temperatureScale)}
        </>
    );
}
