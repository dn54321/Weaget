import { Fab, Box, BoxProps } from "@mui/material";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import { TemperatureScale } from "@src/types/weather.types";
import { useSettingStore } from "@src/hooks/stores/use-setting-store";
import { useSystemTranslation } from "@src/hooks/use-system-translation";

// Fab icon that exist on the bottom right of the screen.
// Used to change the measurement/temperature system.

export interface SettingFabProps {
    temperature?: boolean;
    measurement?: boolean;
}

export default function SettingsFab(props: SettingFabProps & BoxProps) {
    const { t } = useSystemTranslation();
    const { temperature, measurement, ...boxProps } = props;
    const temperatureScale = useSettingStore(state => state.temperatureScale);
    const measurementScale = useSettingStore(state => state.measurementScale);
    const setTemperatureScale = useSettingStore(state => state.setTemperatureScale);
    const setMeasurementScale = useSettingStore(state => state.setMeasurementScale);

    function toggleTemperatureScale(tempScale: string) {
        return (tempScale === TemperatureScale.FAHRENHEIT) ? TemperatureScale.CELSIUS : TemperatureScale.FAHRENHEIT;
    }

    function toggleMeasurementSystem(measScale: string) {
        return (measScale === "metric") ? "imperial" : "metric";
    }

    function handleTemperatureScaleChange(measScale: string, setSystemState: Function) {
        const alt = toggleTemperatureScale(measScale);
        setSystemState(alt);
    }

    function handleMeasurementScaleChange(measScale: string, setSystemState: Function) {
        const alt = toggleMeasurementSystem(measScale);
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
            ...boxProps,
        }}
        >
            { measurement
                ? (
                        <Fab
                            color="primary"
                            aria-label={"Change to " + toggleMeasurementSystem(measurementScale) + " system"}
                            size="large"
                            variant="extended"
                            sx={{ pointerEvents: "all" }}
                            onClick={() => handleMeasurementScaleChange(measurementScale, setMeasurementScale)}
                        >
                            <SquareFootIcon sx={{ mr: 1 }} />
                            {`${measurementScale} system`}
                        </Fab>
                    )
                : null}

            { temperature
                ? (
                        <Fab
                            color="primary"
                            aria-label={"Change to " + toggleTemperatureScale(temperatureScale)}
                            size="large"
                            variant="extended"
                            sx={{ pointerEvents: "all" }}
                            onClick={() => handleTemperatureScaleChange(temperatureScale, setTemperatureScale)}
                        >
                            <DeviceThermostatIcon sx={{ mr: 1 }} />
                            {t(`temperature.${temperatureScale}.text`)}
                        </Fab>
                    )
                : null}
        </Box>
    );
}
