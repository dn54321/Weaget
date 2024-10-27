import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button, SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { DateTime } from "luxon";
import * as React from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";

import { useSettingStore } from "@src/hooks/stores/use-setting-store";
import { MeasurementScale } from "@src/types/measurement.types";
import { OneCallWeatherDetails } from "@features/open-weather-map-one-call/oneCall.type";
import { Widget } from "@components/containers/widget/widget";
import { convertVolumeMeasurement, getVolumeSymbol } from "@components/ui/volume-unit/volume-unit.utils";
import { useSystemTranslation } from "@src/hooks/use-system-translation";
import { DEFAULT_LOCALE } from "@src/i18n/settings";

/*
    Rainfall card tells us how much rain has fallen
    with 120mins per min, 48hrs per hr and 14 days per day.
*/

// file constants
const chartLabel = [
    "component.widget.rainfall.120Mins",
    "component.widget.rainfall.48Hours",
    "component.widget.rainfall.14Days",
];

const seeDirection = [
    "component.widget.rainfall.see120Mins",
    "component.widget.rainfall.see48Hours",
    "component.widget.rainfall.see14Days",
];

const dataLabel = ["minutely", "hourly", "daily"];
const chartHeight = "250px";

export interface SyledButtonprops {
    decrement?: boolean;
    dispatch: (action: ReducerAction) => void;
    chart: { id: number };

}
const StyledButton = (props: SyledButtonprops) => {
    const { t } = useSystemTranslation();
    const reducerAction = props.decrement ? ReducerActions.DECREMENT : ReducerActions.INCREMENT;
    const incrementCounter = props.decrement ? 2 : 1;
    const translationRainfallNavigationKey = seeDirection[(props.chart.id + incrementCounter) % 3];
    return (
        <Button
            component="span"
            aria-label={t(translationRainfallNavigationKey)}
            title={t(translationRainfallNavigationKey)}
            onClick={() => props.dispatch({ type: reducerAction })}
            sx={{
                "backgroundColor": "primary.main",
                "minWidth": "16px",
                "padding": "0px",
                "& svg": {
                    fontSize: "16px",
                    color: "primary.contrastText",
                },
                "&:hover": {
                    backgroundColor: "primary.dark",
                },
            }}
        >
            {(props.decrement) ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </Button>
    );
};

// The chart component from recharts.
interface ChartProps {
    measurementScale: MeasurementScale;
    data?: Array<{ name: string; rainfall: number }>;
}
const Chart = (props: ChartProps) => {
    return (
        <Box
            position="relative"
            width="100%"
            height={chartHeight}
            sx={{
                "& .recharts-tooltip-label": {
                    color: "black",
                },
            }}
        >
            <Box position="absolute" left={0} right={0} top={0} bottom={0}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={props.data}>
                        <defs>
                            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="rainfall"
                            stroke="#8884d8"
                            fillOpacity={1}
                            fill="url(#grad)"
                            unit={getVolumeSymbol(props.measurementScale)}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
};

// Each Graph (minutely, hourly, daily) has a score.
// The score determines which graph is presented on page load.
// Score calculated by the percentage of points above 0.
// A consequence of more points being > 0 is a smoother graph
// which we prefer over a graph over a chaotic graph or a graph with nothing.

function getScore(weatherLabel: string, wtr: OneCallWeatherDetails) {
    let arr: Array<number> = [];
    switch (weatherLabel) {
        case "minutely":
            arr = wtr.minutely?.map(x => x.precipitation) ?? [];
            break;
        case "hourly":
            arr = wtr.hourly?.map(x => x.rain?.["1h"] ? x.rain?.["1h"] : 0) ?? [];
            break;
        case "daily":
            arr = wtr.daily?.map(x => x.rain ? x.rain : 0) ?? [];
            break;
    }
    let score = 0;
    arr.forEach((x: number) => x && ++score);
    return score / arr.length;
}

function getData(
    measurementScale: MeasurementScale,
    weatherLabel: string,
    wtr: OneCallWeatherDetails,
    locale: string = DEFAULT_LOCALE,
) {
    switch (weatherLabel) {
        case "minutely": return wtr.minutely?.map(x => ({
            rainfall: convertVolumeMeasurement(measurementScale, x.precipitation ?? 0, 2),
            name: DateTime
                .fromJSDate(x.dt, { zone: wtr.timezone })
                .setLocale(locale)
                .toLocaleString(DateTime.TIME_SIMPLE),
        })) ?? [];
        case "hourly": return wtr.hourly?.map(x => ({
            rainfall: convertVolumeMeasurement(measurementScale, (x.rain && x.rain["1h"]) ?? 0, 2),
            name: DateTime.fromJSDate(x.dt, { zone: wtr.timezone })
                .setLocale(locale)
                .toLocaleString(DateTime.TIME_SIMPLE),
        })) ?? [];
        case "daily": return wtr.daily?.map(x => ({
            rainfall: convertVolumeMeasurement(measurementScale, x.rain ?? 0, 2),
            name: DateTime
                .fromJSDate(x.dt, { zone: wtr.timezone })
                .setLocale(locale)
                .toLocaleString(DateTime.DATE_FULL),
        })) ?? [];
    }
}

// Switches between different graphs
export enum ReducerActions {
    SET = "set",
    INCREMENT = "increment",
    DECREMENT = "decrement",
}

export type ReducerAction =
    | { type: ReducerActions.SET; val: number }
    | { type: ReducerActions.INCREMENT }
    | { type: ReducerActions.DECREMENT };

export interface ReducerState {
    id: number;
}

function reducer(state: ReducerState, action: ReducerAction): ReducerState {
    switch (action.type) {
        case "increment":
            return { id: (state.id + 1) % 3 };
        case "decrement":
            return { id: (state.id + 2) % 3 };
        case "set":
            return { id: action.val };
        default:
            console.log("Received invalid reducer type");
            return state;
    }
}

// Get index of graph based on score
function getChartIndex(weather?: OneCallWeatherDetails) {
    let maxIndex = 0;
    let maxScore = 0;
    weather && dataLabel.forEach((x, i) => {
        const score = getScore(x, weather);
        if (score > maxScore) {
            maxScore = score;
            maxIndex = i;
        }
    });

    return maxIndex;
}

export interface RainfallWidgetProps {
    weatherData?: OneCallWeatherDetails;
    sx?: SxProps;
}

export default function RainfallWidget(props: RainfallWidgetProps) {
    const { t, locale } = useSystemTranslation();
    const measurementScale = useSettingStore(state => state.measurementScale) as MeasurementScale;
    const [chart, dispatch] = React.useReducer(reducer, { id: 0 });
    React.useEffect(() => {
        dispatch({ type: ReducerActions.SET, val: getChartIndex(props.weatherData) });
    }, [props.weatherData]);

    return (
        <Widget
            title={t("component.widget.rainfall.title")}
            sx={props.sx}
            rightDecorum={(
                <Box display="flex" alignItems="center">
                    <StyledButton chart={chart} dispatch={dispatch} decrement />
                    <Box width="80px" sx={{ display: "grid", placeItems: "center" }}>{t(chartLabel[chart?.id])}</Box>
                    <StyledButton chart={chart} dispatch={dispatch} />
                </Box>
            )}
        >
            {props.weatherData
                ? (
                        <Box mt="15px" mb="-15px">
                            <Chart
                                measurementScale={measurementScale}
                                data={getData(measurementScale, dataLabel[chart?.id], props.weatherData, locale)}
                            />
                        </Box>
                    )
                : (
                        <Skeleton
                            width="100%"
                            variant="rectangular"
                            data-testid="rainfall-skeleton"
                            sx={{
                                height: chartHeight,
                                mt: "15px",
                                borderRadius: "20px",
                            }}
                        />
                    )}
        </Widget>
    );
}
