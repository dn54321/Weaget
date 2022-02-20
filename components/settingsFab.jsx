import {Fab, Box} from '@mui/material';
import {SettingContext} from '@src/settings';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import {useContext} from 'react';

// Fab icon that exist on the bottom right of the screen.
// Used to change the measurement/temperature system.

export default function SettingsFab(props) {
    const {temperature_scale, measurement_system, toggler} = useContext(SettingContext);

    function altTempScale(tempScale) {
        return (tempScale === "celcius") ? "fahrenheit" : "celcius";
    }

    function altMeasScale(measScale) {
        return (measScale === "metric") ? "imperial" : "metric";
    }
    function handleTempChange(measScale, toggler) {
        const alt = altTempScale(measScale);
        toggler({temperature_scale: alt});
    }

    function handleMeasChange(measScale, toggler) {
        const alt = altMeasScale(measScale);
        toggler({measurement_system: alt});
    }

    return (
    <Box sx={{
        position: "sticky",
        bottom: "20px",
        display: "flex",
        gap: "5px",
        mr: "20px",
        mb: "20px",
        alignItems: "flex-end",
        flexDirection: "column",
        ...props
    }}>
        { props.measurement ? 
        <Fab color="primary" aria-label={"Change to " + altMeasScale(measurement_system) + "system"} 
            size="large" variant="extended"
             onClick={() => handleMeasChange(measurement_system, toggler)}>
            <SquareFootIcon sx={{ mr: 1 }}/>
            {`${measurement_system} system`}
        </Fab>
        : null}

        { props.temperature ?
        <Fab color="primary" aria-label={"Change to " + altTempScale(temperature_scale)} 
            size="large" variant="extended"
            onClick={() => handleTempChange(temperature_scale, toggler)}>
            <DeviceThermostatIcon sx={{ mr: 1 }}/>
            {temperature_scale}
        </Fab>
        : null}
    </Box>
    )
}