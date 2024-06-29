import { Box, Skeleton, Stack } from "@mui/material";
import { DateTime } from "luxon";
import { useWidgetStore } from "@src/hooks/stores/use-widget-store";
import { OneCallWeatherDetails } from "@features/open-weather-map-one-call/oneCall.type";
import WeatherStatsCard from "@components/cards/weather-stats-card/weather-stats-card.component";
import { parseWeatherDetailStats } from "@components/cards/weather-stats-card/weather-stats-card.utils";
import { Widget } from "@components/containers/widget/widget";

export function HourlyWeatherWidgetSkeleton() {
    return (
        <Widget
            title="Weather Details"
            rightDecorum={<Skeleton variant="text" width="120px" sx={{ lineHeight: 1 }} />}
        >
            <Box
                data-testid="weather-details-skeleton"
                sx={{
                    display: "grid",
                    justifyContent: "space-around",
                    gridTemplateColumns: "repeat(auto-fill, 170px)",
                    gap: "10px",
                    mt: "20px",
                }}
            >
                {[...Array(6)].map((_, i) => (
                    <Stack direction="row" key={i}>
                        <Box width="40px" height="40px" ml="20px">
                            <Skeleton variant="rectangular" width={40} height={40} />
                        </Box>
                        <Box ml="10px">
                            <Skeleton variant="text" width="60px" sx={{ lineHeight: 1 }} />
                            <Skeleton variant="text" width="90px" sx={{ lineHeight: 1 }} />
                        </Box>
                    </Stack>
                ))}
            </Box>
        </Widget>
    );
}

export interface WeatherStatWidgetProp {
    weatherData?: OneCallWeatherDetails;
}

export default function WeatherStatWidget(props: WeatherStatWidgetProp) {
    const focusedWeather = useWidgetStore(state => state.focusedWeather) ?? props.weatherData?.current;

    if (!focusedWeather) {
        return <HourlyWeatherWidgetSkeleton />;
    }

    const timezone = props.weatherData!.timezone;
    const updatedTimestamp = DateTime.fromJSDate(focusedWeather.dt, { zone: timezone });

    return (
        <Widget
            title="Weather Details"
            rightDecorum={updatedTimestamp.toLocaleString(DateTime.DATE_MED)}
            disableChildrenPadding
        >
            <WeatherStatsCard stats={parseWeatherDetailStats(focusedWeather, timezone)} />
        </Widget>
    );
}
