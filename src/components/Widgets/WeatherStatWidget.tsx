import { mdiThermometerWater, mdiWaterPercent, mdiWeatherCloudy, mdiWeatherSnowy, mdiWeatherPouring, mdiWeatherSunnyAlert, mdiWeatherSunsetDown, mdiWeatherSunsetUp } from '@mdi/js';
import Icon from '@mdi/react';
import AirIcon from '@mui/icons-material/Air';
import { Box, Card, Divider, Skeleton, Stack } from "@mui/material";
import styled from "@mui/system/styled";
import { DateTime } from 'luxon';
import { CurrentWeatherDetails, DailyWeatherDetails, HourlyWeatherDetails, OneCallWeatherDetails } from "../../types/models/openWeather/oneCall.model";
import WeatherStatsCard, { parseWeatherDetailStats } from '../Cards/WeatherStatsCard';
import SpeedUnit from "../SpeedUnit";
import { Widget } from '../Containers/Widget';
import Temp from '../TemperateUnit';
import VolumeUnit from '../VolumeUnit';
import { useWidgetStore } from '../../hooks/stores/useWidgetStore';

const Container = styled(Card)(() => ({
    width: "100%",
    color: "black",
}));

export function HourlyWeatherWidgetSkeleton() {
    return (
        <Box>
            {[...Array(12)].map((_,i) => (
                <Box key={i}>
                    <Box height="66px" my="1px" key={i} display="flex" alignItems="center">
                        <Skeleton variant="circular" width={40} height={40}/>
                        <Box ml="10px">
                        <Skeleton variant="text" width="60px" sx={{lineHeight: 1}}/>
                        <Skeleton variant="text" width="90px" sx={{lineHeight: 1}}/>
                        </Box>
                        {/* <HideBox hidden={400} ml="40px"><Skeleton width="40px" height="66px"/></HideBox>
                        <HideBox ml="10px" hidden={450}><Skeleton width="40px" height="66px"/></HideBox> */}
                        <Stack ml="auto" mr="5px" alignItems="flex-end">
                            <Skeleton variant="text" width="80px" sx={{lineHeight: 1}}/>
                            <Skeleton variant="text" width="90px" sx={{lineHeight: 1}}/>
                        </Stack>
                    </Box>
                    <Divider/>
                </Box>
            ))}
        </Box>
    )
}

export interface WeatherStripProp {
    weatherData?: OneCallWeatherDetails;
}

export default function WeatherStatWidget(props: WeatherStripProp) {
    const focusedWeather = useWidgetStore(state => state.focusedWeather) ?? props.weatherData?.current;

    if (!focusedWeather) {
        return <HourlyWeatherWidgetSkeleton/>;
    }

    const timezone = props.weatherData!.timezone;
    const updatedTimestamp = DateTime.fromJSDate(focusedWeather.dt, { zone: timezone });

    return (
        <Widget
            title="Weather Details"
            rightDecorum={updatedTimestamp.toLocaleString(DateTime.DATE_MED)}
            disableChildrenPadding
        >
            <WeatherStatsCard stats={parseWeatherDetailStats(focusedWeather, timezone)}/>
        </Widget>
    )
}