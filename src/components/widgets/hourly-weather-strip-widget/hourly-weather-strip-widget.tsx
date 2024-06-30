import { Box, Divider, Pagination, Skeleton, Stack } from "@mui/material";
import { useState } from "react";
import { OneCallWeatherDetails } from "@features/open-weather-map-one-call/oneCall.type";
import { parseWeatherDetailStats } from "@components/cards/weather-stats-card/weather-stats-card.utils";
import { Widget } from "@components/containers/widget/widget";
import WeatherStrip from "@components/ui/weather-strip/weather-strip.component";

export function HourlyWeatherWidgetSkeleton() {
    return (
        <Widget
            title="Weather Details"
            disableChildrenPadding
        >
            {[...Array(12)].map((_, i) => (
                <Box key={i} data-testid="weather-stat-skeleton">
                    <Box height="66px" my="1px" key={i} display="flex" alignItems="center">
                        <Box width="40px" ml="20px">
                            <Skeleton variant="circular" width={40} height={40} />
                        </Box>
                        <Box ml="10px">
                            <Skeleton variant="text" width="60px" sx={{ lineHeight: 1 }} />
                            <Skeleton variant="text" width="90px" sx={{ lineHeight: 1 }} />
                        </Box>
                        <Box position="relative" width="100%" height="100%" mx="30px">
                            <Stack
                                direction="row"
                                gap="20px"
                                sx={{
                                    alignItems: "center",
                                    position: "absolute",
                                    left: "0px",
                                    right: "0px",
                                    top: "0px",
                                    bottom: "0px",
                                }}
                            >
                                <Stack
                                    direction="row"
                                    sx={{
                                        overflow: "hidden",
                                        flexWrap: "wrap",
                                        width: "100%",
                                        height: "40px",
                                        gap: "20px",
                                    }}
                                >
                                    {[...Array(7)].map((_, i) => (
                                        <Box key={i}>
                                            <Skeleton variant="rectangular" width={40} height={40} />
                                        </Box>
                                    ))}
                                </Stack>
                            </Stack>
                        </Box>
                        <Stack ml="auto" mr="15px" alignItems="flex-end">
                            <Skeleton variant="text" width="80px" sx={{ lineHeight: 1 }} />
                            <Skeleton variant="text" width="90px" sx={{ lineHeight: 1 }} />
                        </Stack>
                    </Box>
                    <Divider />
                </Box>
            ))}
            <Box display="flex" justifyContent="center" mt="10px" pb="7px">
                <Pagination count={4} page={1} color="primary" disabled />
            </Box>
        </Widget>
    );
}

export interface HourlyWeatherStripWidgetProps {
    weatherData?: OneCallWeatherDetails;
}

export default function HourlyWeatherStripWidget(props: HourlyWeatherStripWidgetProps) {
    const [page, setPage] = useState(1);
    const [activeStrip, setActiveStrip] = useState<number>(0);

    if (!props.weatherData || !props.weatherData.hourly) {
        return <HourlyWeatherWidgetSkeleton />;
    }

    const weather = props.weatherData;
    const WeatherStrips = weather.hourly?.slice((page - 1) * 12, page * 12).map((hourlyWeather) => {
        const time = hourlyWeather.dt.getTime();
        return (
            <Box component="li" key={time}>
                <WeatherStrip
                    date={hourlyWeather.dt}
                    timezone={weather.timezone}
                    weatherCode={hourlyWeather.weather[0].id}
                    weatherDescription={hourlyWeather.weather[0].description}
                    temperature={hourlyWeather.temp}
                    rainPercentage={hourlyWeather.pop}
                    stats={parseWeatherDetailStats(hourlyWeather, weather.timezone)}
                    expanded={activeStrip === time}
                    setExpanded={() => { setActiveStrip((activeStrip === time) ? 0 : time); }}
                />
            </Box>
        );
    }

    );

    const handleChange = (_, value) => {
        setPage(value);
    };

    return (
        <Widget title="Hourly Weather Details" disableChildrenPadding>
            <ol>{WeatherStrips}</ol>
            <Box display="flex" justifyContent="center" mt="10px" pb="7px">
                <Pagination
                    count={4}
                    page={page}
                    onChange={handleChange}
                    color="primary"
                />
            </Box>
        </Widget>
    );
}
