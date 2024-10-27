import * as math from "@src/utils/math";
import { useSettingStore } from "@src/hooks/stores/use-setting-store";
import { convertTemperature, getTemperatureSymbol } from "./temperature-unit.utils";
import { TemperatureScale } from "@src/types/weather.types";
import { useSystemTranslation } from "@src/hooks/use-system-translation";

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
    const { t } = useSystemTranslation();
    return (
        <>
            {math.round(convertTemperature(temperatureScale, props.value), round) + "°"}
            <span title={
                temperatureScale === TemperatureScale.CELSIUS
                    ? t("temperature.celsius.text")
                    : t("temperature.fahrenheit.text")
            }
            >
                {symbol && getTemperatureSymbol(temperatureScale)}
            </span>
        </>
    );
}
