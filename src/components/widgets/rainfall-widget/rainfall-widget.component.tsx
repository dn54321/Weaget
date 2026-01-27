import { Widget } from "@components/containers/widget/widget";
import { convertVolumeMeasurement, getVolumeSymbol } from "@components/ui/volume-unit/volume-unit.utils";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button, SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { OneCallWeatherDetails } from "@src/apis/open-weather-map/one-call/one-call.type";
import { useSettingStore } from "@src/hooks/stores/use-setting-store";
import { useSystemTranslation } from "@src/hooks/use-system-translation";
import { MeasurementScale } from "@src/types/measurement.types";
import { SystemLocale } from "@src/types/system.types";
import { DateTime } from "luxon";
import * as React from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";

/*
    Rainfall card tells us how much rain has fallen
    with 120mins per min, 48hrs per hr and 14 days per day.
*/

// file constants
const chartLabel = [
    "component.widget.rainfall.120Mins",
    "component.widget.rainfall.48Hours",
    "component.widget.rainfall.14Days"
];

const seeDirection = [
    "component.widget.rainfall.see120Mins",
    "component.widget.rainfall.see48Hours",
    "component.widget.rainfall.see14Days"
];

const dataLabel = ["minutely", "hourly", "daily"];
const chartHeight = "250px";

export interface SyledButtonprops {
    chart: { id: number }
    decrement?: boolean
    dispatch: (action: ReducerAction) => void

}
const StyledButton = (props: SyledButtonprops) => {
    const { t } = useSystemTranslation();
    const reducerAction = props.decrement ? ReducerActions.DECREMENT : ReducerActions.INCREMENT;
    const incrementCounter = props.decrement ? 2 : 1;
    const translationRainfallNavigationKey = seeDirection[(props.chart.id + incrementCounter) % 3];
    return (
        <Button
            aria-label={t(translationRainfallNavigationKey)}
            component="span"
            onClick={() => props.dispatch({ type: reducerAction })}
            sx={{
                "&:hover": {
                    backgroundColor: "primary.dark"
                },
                "& svg": {
                    color: "primary.contrastText",
                    fontSize: "16px"
                },
                "backgroundColor": "primary.main",
                "minWidth": "16px",
                "padding": "0px"
            }}
            title={t(translationRainfallNavigationKey)}
        >
            {(props.decrement) ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </Button>
    );
};

// The chart component from recharts.
interface ChartProps {
    data?: Array<{ name: string, rainfall: number }>
    measurementScale: MeasurementScale
}
const Chart = (props: ChartProps) => {
    return (
        <Box
            height={chartHeight}
            position="relative"
            sx={{
                "& .recharts-tooltip-label": {
                    color: "black"
                }
            }}
            width="100%"
        >
            <Box bottom={0} left={0} position="absolute" right={0} top={0}>
                <ResponsiveContainer height="100%" width="100%">
                    <AreaChart data={props.data}>
                        <defs>
                            <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                        <Tooltip />
                        <Area
                            dataKey="rainfall"
                            fill="url(#grad)"
                            fillOpacity={1}
                            stroke="#8884d8"
                            type="monotone"
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

// Switches between different graphs
export enum ReducerActions {
    DECREMENT = "decrement",
    INCREMENT = "increment",
    SET = "set"
}

export interface RainfallWidgetProps {
    sx?: SxProps
    weatherData?: OneCallWeatherDetails
}

export type ReducerAction =
  | { type: ReducerActions.DECREMENT }
  | { type: ReducerActions.INCREMENT }
  | { type: ReducerActions.SET, val: number };

export interface ReducerState {
    id: number
}

export default function RainfallWidget(props: RainfallWidgetProps) {
    const { locale, t } = useSystemTranslation();
    const measurementScale = useSettingStore(state => state.measurementScale) as MeasurementScale;
    const [chart, dispatch] = React.useReducer(reducer, { id: 0 });
    React.useEffect(() => {
        dispatch({ type: ReducerActions.SET, val: getChartIndex(props.weatherData) });
    }, [props.weatherData]);

    return (
        <Widget
            rightDecorum={(
                <Box alignItems="center" display="flex">
                    <StyledButton chart={chart} decrement dispatch={dispatch} />
                    <Box sx={{ display: "grid", placeItems: "center" }} width="80px">{t(chartLabel[chart?.id])}</Box>
                    <StyledButton chart={chart} dispatch={dispatch} />
                </Box>
            )}
            sx={props.sx}
            title={t("component.widget.rainfall.title")}
        >
            {props.weatherData
                ? (
                    <Box mb="-15px" mt="15px">
                        <Chart
                            data={getData(measurementScale, dataLabel[chart?.id], props.weatherData, locale)}
                            measurementScale={measurementScale}
                        />
                    </Box>
                )
                : (
                    <Skeleton
                        data-testid="rainfall-skeleton"
                        sx={{
                            borderRadius: "20px",
                            height: chartHeight,
                            mt: "15px"
                        }}
                        variant="rectangular"
                        width="100%"
                    />
                )}
        </Widget>
    );
}

// Get index of graph based on score
function getChartIndex(weather?: OneCallWeatherDetails) {
    let maxIndex = 0;
    let maxScore = 0;
    if (weather) {
        dataLabel.forEach((x, i) => {
            const score = getScore(x, weather);
            if (score > maxScore) {
                maxScore = score;
                maxIndex = i;
            }
        });
    }

    return maxIndex;
}

function getData(
    measurementScale: MeasurementScale,
    weatherLabel: string,
    wtr: OneCallWeatherDetails,
    locale: SystemLocale
) {
    switch (weatherLabel) {
        case "daily": return wtr.daily?.map(x => ({
            name: DateTime
                .fromJSDate(x.dt, { zone: wtr.timezone })
                .setLocale(locale)
                .toLocaleString(DateTime.DATE_FULL),
            rainfall: convertVolumeMeasurement(measurementScale, x.rain ?? 0, 2)
        })) ?? [];
        case "hourly": return wtr.hourly?.map(x => ({
            name: DateTime.fromJSDate(x.dt, { zone: wtr.timezone })
                .setLocale(locale)
                .toLocaleString(DateTime.TIME_SIMPLE),
            rainfall: convertVolumeMeasurement(measurementScale, (x.rain && x.rain["1h"]) ?? 0, 2)
        })) ?? [];
        case "minutely": return wtr.minutely?.map(x => ({
            name: DateTime
                .fromJSDate(x.dt, { zone: wtr.timezone })
                .setLocale(locale)
                .toLocaleString(DateTime.TIME_SIMPLE),
            rainfall: convertVolumeMeasurement(measurementScale, x.precipitation ?? 0, 2)
        })) ?? [];
    }
}

function getScore(weatherLabel: string, wtr: OneCallWeatherDetails) {
    let arr: Array<number> = [];
    switch (weatherLabel) {
        case "daily":
            arr = wtr.daily?.map(x => x.rain ? x.rain : 0) ?? [];
            break;
        case "hourly":
            arr = wtr.hourly?.map(x => x.rain?.["1h"] ? x.rain?.["1h"] : 0) ?? [];
            break;
        case "minutely":
            arr = wtr.minutely?.map(x => x.precipitation) ?? [];
            break;
    }
    let score = 0;
    arr.forEach((x: number) => x && ++score);
    return score / arr.length;
}

function reducer(state: ReducerState, action: ReducerAction): ReducerState {
    switch (action.type) {
        case "decrement":
            return { id: (state.id + 2) % 3 };
        case "increment":
            return { id: (state.id + 1) % 3 };
        case "set":
            return { id: action.val };
    }
    return state;
}
