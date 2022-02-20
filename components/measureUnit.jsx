import {SettingContext} from '@src/settings';
import {useContext} from 'react';
import {Box} from '@mui/material';
import {round} from '@src/math';

/*
     A React Context for measurement.
     Should display the appropriate Metric or Imperial System
     with units and convert numeric values appropritately to the
     correct unit.
*/

function convertMeasurement(value, MeasScale) {
    switch (MeasScale) {
        case "metric": return value;
        case "imperial": return value*2.23694;
        default: return value;
    }
}

export function getSymbol(tempScale) {
    switch (tempScale) {
        case "imperial": return <abbr title="miles per hour">mph</abbr>;
        default:
        case "metric": return <abbr title="meters per second">ms<Box component="sup" sx={{
            verticalAlign: "top", 
            position: "relative",
            top: "-0.5em",
        }}>-1</Box></abbr>;
    }
}

export default function MeasureUnit(props) {
    const {measurement_system} = useContext(SettingContext);
    return (
    <>
        {round(convertMeasurement(props.label, measurement_system),props.round)}
        {props.symbol && getSymbol(measurement_system)}
    </>
    )
}

MeasureUnit.defaultProps = {
    round: 1,
    symbol: true    
};