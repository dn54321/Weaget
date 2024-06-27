import {Fab, Box, BoxProps} from '@mui/material';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import { TemperatureScale } from '../../types/weather.types';
import { useSettingStore } from '../../hooks/stores/use-setting-store';

// Fab icon that exist on the bottom right of the screen.
// Used to change the measurement/temperature system.

export interface SettingFabProps {
    temperature?: boolean,
    measurement?: boolean
}

export default function SettingsFab(props: SettingFabProps & BoxProps) {
    const { temperature, measurement, ...boxProps } = props;
    const temperatureScale = useSettingStore((state) => state.temperatureScale);
    const measurementScale = useSettingStore((state) => state.measurementScale);
    const setTemperatureScale = useSettingStore((state) => state.setTemperatureScale);
    const setMeasurementScale = useSettingStore((state) => state.setMeasurementScale);

    function altTempScale(tempScale: string) {
        return (tempScale === TemperatureScale.FAHRENHEIT) ? TemperatureScale.CELSIUS : TemperatureScale.FAHRENHEIT;
    }

    function altMeasScale(measScale: string) {
        return (measScale === "metric") ? "imperial" : "metric";
    }

    function handleTemperatureScaleChange(measScale: string, setSystemState: Function) {
        const alt = altTempScale(measScale);
        setSystemState(alt);
    }

    function handleMeasurementScaleChange(measScale: string, setSystemState: Function) {
        const alt = altMeasScale(measScale);
        setSystemState(alt);
    }

    return (
        <Box sx={{
            position: "sticky",
            bottom: "20px",
            display: "flex",
            pointerEvents: "none",
            gap: "5px",
            mr: "20px",
            mb: "20px",
            alignItems: "flex-end",
            flexDirection: "column",
            ...boxProps
        }}>
            { measurement ? 
            <Fab 
                color="primary" 
                aria-label={"Change to " + altMeasScale(measurementScale) + " system"} 
                size="large" variant="extended"
                sx={{pointerEvents: "all"}}
                onClick={() => handleMeasurementScaleChange(measurementScale, setMeasurementScale)}>
                <SquareFootIcon sx={{ mr: 1 }}
            />
                {`${measurementScale} system`}
            </Fab>
            : null}

            { temperature ?
            <Fab 
                color="primary" 
                aria-label={"Change to " + altTempScale(temperatureScale)} 
                size="large" 
                variant="extended"
                sx={{pointerEvents: "all"}}
                onClick={() => handleTemperatureScaleChange(temperatureScale, setTemperatureScale)}>
                <DeviceThermostatIcon sx={{ mr: 1 }}/>
                {temperatureScale}
            </Fab>
            : null}
        </Box>
    )
}