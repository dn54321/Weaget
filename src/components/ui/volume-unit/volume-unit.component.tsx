import { Box } from "@mui/material";
import { useSettingStore } from "@src/hooks/stores/use-setting-store";
import { MeasurementScale } from "@src/types/measurement.types";
import { convertVolumeMeasurement } from "./volume-unit.utils";
import { useSystemTranslation } from "@src/hooks/use-system-translation";

/*
     VolumeUnit

     The veolumeUnit component is a component that outputs the speed in the selected system unit.
     The speeds are as follows:
        - Metric: mm/h
        - Imperial: inches/h
*/

function getSymbol(temperatureScale: string) {
    switch (temperatureScale) {
        case MeasurementScale.IMPERIAL: return <abbr title="inches per hour">iph</abbr>;
        case MeasurementScale.METRIC: return (
            <abbr title="millimeters per hour">
                mmh
                <Box
                    component="sup"
                    sx={{
                        verticalAlign: "top",
                        position: "relative",
                        top: "-0.5em",
                    }}
                >
                    -1
                </Box>
            </abbr>
        );
    }
}

interface VolumeUnitProps {
    decimals?: number;
    symbol?: boolean;
    value: number;
}

export default function VolumeUnit(props: VolumeUnitProps) {
    const decimal = props.decimals ?? 1;
    const symbol = props.symbol ?? true;
    const { t } = useSystemTranslation();
    const measurementSystem = useSettingStore(state => state.measurementScale) as MeasurementScale;
    const unitType = measurementSystem === MeasurementScale.METRIC
        ? t("measurement.millimetersPerHour")
        : t("measurement.inchesPerHour");
    return (
        <>
            {convertVolumeMeasurement(measurementSystem, props.value, decimal)}
            <abbr title={unitType}>{symbol && getSymbol(measurementSystem)}</abbr>
        </>
    );
}
