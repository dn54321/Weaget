import {SettingContext} from '@src/settings';
import {useContext} from 'react';
import {round} from '@src/math';

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

export default function Temp(props) {
    const {temperature_scale} = useContext(SettingContext);
    return (
    <>
        {round(convertTemperature(props.label, temperature_scale),props.round)+"°"}
        {props.symbol && getSymbol(temperature_scale)}
    </>
    )
}

Temp.defaultProps = {
    round: 0,
    symbol: false    
};