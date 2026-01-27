import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import { Box, BoxProps, Fab } from "@mui/material";
import { useSettingStore } from "@src/hooks/stores/use-setting-store";
import { useSystemTranslation } from "@src/hooks/use-system-translation";
import { MeasurementScale } from "@src/types/measurement.types";
import { TemperatureScale } from "@src/types/weather.types";

// Fab icon that exist on the bottom right of the screen.
// Used to change the measurement/temperature system.

export interface SettingFabProps {
    measurement?: boolean
    temperature?: boolean
}

export default function SettingsFab(props: BoxProps & SettingFabProps) {
    const { t } = useSystemTranslation();
    const { measurement, temperature, ...boxProps } = props;
    const temperatureScale = useSettingStore(state => state.temperatureScale);
    const measurementScale = useSettingStore(state => state.measurementScale);
    const setTemperatureScale = useSettingStore(state => state.setTemperatureScale);
    const setMeasurementScale = useSettingStore(state => state.setMeasurementScale);

    function toggleTemperatureScale(tempScale: string) {
        return (tempScale === TemperatureScale.FAHRENHEIT) ? TemperatureScale.CELSIUS : TemperatureScale.FAHRENHEIT;
    }

    function toggleMeasurementSystem(measScale: string) {
        return (measScale === MeasurementScale.METRIC) ? MeasurementScale.IMPERIAL : MeasurementScale.METRIC;
    }

    function handleTemperatureScaleChange(
        measScale: string,
        setTemperatureFn: (temperature: TemperatureScale) => void
    ) {
        const alt = toggleTemperatureScale(measScale);
        setTemperatureFn(alt);
    }

    function handleMeasurementScaleChange(
        measScale: string,
        setMeasurementFn: (measurement: MeasurementScale) => void
    ) {
        const alt = toggleMeasurementSystem(measScale);
        setMeasurementFn(alt);
    }

    return (
        <Box sx={{
            alignItems: "flex-end",
            bottom: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            mb: "20px",
            mr: "20px",
            pointerEvents: "none",
            position: "sticky",
            ...boxProps
        }}
        >
            { measurement
                ? (
                    <Fab
                        aria-label={measurementScale === MeasurementScale.METRIC
                            ? t("component.settingsFab.switchImperial")
                            : t("component.settingsFab.switchMetric")}
                        color="primary"
                        onClick={() => handleMeasurementScaleChange(measurementScale, setMeasurementScale)}
                        size="large"
                        sx={{ pointerEvents: "all" }}
                        variant="extended"
                    >
                        <SquareFootIcon sx={{ mr: 1 }} />
                        {measurementScale === MeasurementScale.METRIC
                            ? t("component.settingsFab.metricSystem")
                            : t("component.settingsFab.imperialSystem")}
                    </Fab>
                )
                : null}

            { temperature
                ? (
                    <Fab
                        aria-label={temperatureScale === TemperatureScale.CELSIUS
                            ? t("component.settingsFab.switchFahrenheit")
                            : t("component.settingsFab.switchCelsius")}
                        color="primary"
                        onClick={() => handleTemperatureScaleChange(temperatureScale, setTemperatureScale)}
                        size="large"
                        sx={{ pointerEvents: "all" }}
                        variant="extended"
                    >
                        <DeviceThermostatIcon sx={{ mr: 1 }} />
                        {temperatureScale === TemperatureScale.CELSIUS
                            ? t("temperature.celsius.text")
                            : t("temperature.fahrenheit.text")}
                    </Fab>
                )
                : null}
        </Box>
    );
}
