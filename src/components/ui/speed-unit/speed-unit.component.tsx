import * as math from "@src/utils/math";
import { useSettingStore } from "@src/hooks/stores/use-setting-store";
import { MeasurementScale } from "@src/types/measurement.types";
import React from "react";
import { useSystemTranslation } from "@src/hooks/use-system-translation";
import { convertSpeedMeasurement } from "./speed-unit.utils";
import { Box } from "@mui/system";

/*
     SpeedUnit

     The speedUnit component is a component that outputs the speed in the selected system unit.
     The speeds are as follows:
        - Metric: m/s
        - Imperial: mph
*/

interface MeasurementUnitProps {
    decimals?: number;
    symbol?: boolean;
    value: number;
}

export function getSymbol(temperatureScale: string) {
    switch (temperatureScale) {
        case MeasurementScale.IMPERIAL: return <React.Fragment>mph</React.Fragment>;
        case MeasurementScale.METRIC: return (
            <React.Fragment>
                ms
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
            </React.Fragment>
        );
    }
}

export default function SpeedUnit(props: MeasurementUnitProps) {
    const round = props.decimals ?? 1;
    const symbol = props.symbol ?? true;
    const measurementSystem = useSettingStore(state => state.measurementScale);
    const { t } = useSystemTranslation();
    const unitType = measurementSystem === MeasurementScale.METRIC
        ? t("measurement.metersPerSecond")
        : t("measurement.milesPerHour");
    return (
        <>
            {math.round(convertSpeedMeasurement(props.value, measurementSystem), round)}
            <abbr title={unitType}>{symbol && getSymbol(measurementSystem)}</abbr>
        </>
    );
}
