import { Box, Card, Skeleton, Stack } from "@mui/material";
import styled from "@mui/system/styled";
import { DateTime } from 'luxon';
import { useWidgetStore } from '../../hooks/stores/useWidgetStore';
import { OneCallWeatherDetails } from "../../types/models/openWeather/oneCall.model";
import WeatherStatsCard, { parseWeatherDetailStats } from '../Cards/WeatherStatsCard';
import { Widget } from '../Containers/Widget';

const Container = styled(Card)(() => ({
    width: "100%",
    color: "black",
}));

export function HourlyWeatherWidgetSkeleton() {
    return (
        <Widget
            title="Weather Details"
            rightDecorum={<Skeleton variant="text" width="120px" sx={{lineHeight: 1}}/>}

        >
            <Box 
                sx={{
                    display: "grid",
                    justifyContent: "space-around",
                    gridTemplateColumns: "repeat(auto-fill, 170px)",
                    gap: "10px",
                    mt: "20px"
                }}
            >
                {[...Array(6)].map((_,i) => (
                    <Stack direction="row" key={i}>
                        <Box width="40px" height="40px" ml="20px">
                            <Skeleton variant="rectangular" width={40} height={40}/>
                        </Box>
                        <Box ml="10px">
                            <Skeleton variant="text" width="60px" sx={{lineHeight: 1}}/>
                            <Skeleton variant="text" width="90px" sx={{lineHeight: 1}}/>
                        </Box>
                    </Stack>
                ))}
            </Box>
        </Widget>
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