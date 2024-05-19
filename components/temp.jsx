import {SettingContext} from '@src/settings';
import {useContext} from 'react';
import * as math from '@src/math';

/*
     A React Context for celcius.
     Should display the appropriate celcius or fahrenheit System
     with units and convert numeric values appropritately to the
     correct unit.
*/

function convertTemperature(temp, tempScale) {
    switch (tempScale) {
        case "celcius": return (temp-273.15);
        case "fahrenheit": return ((temp - 273.15) * 9/5 + 32);
        default: return temp
    }
}

export function getSymbol(tempScale) {
    switch (tempScale) {
        case "celcius": return "C";
        case "fahrenheit": return "F";
        default: return "K";
    }
}

export default function Temp({round = 0, symbol = false, label}) {
    const {temperature_scale} = useContext(SettingContext);
    return (
    <>
        {math.round(convertTemperature(label, temperature_scale), round)+"°"}
        {symbol && getSymbol(temperature_scale)}
    </>
    )
}