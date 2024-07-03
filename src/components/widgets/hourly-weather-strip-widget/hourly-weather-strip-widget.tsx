import { Box, Divider, Pagination, Skeleton, SkeletonProps, Stack, SxProps } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { OneCallWeatherDetails } from "@features/open-weather-map-one-call/oneCall.type";
import { parseWeatherDetailStats } from "@components/cards/weather-stats-card/weather-stats-card.utils";
import { Widget } from "@components/containers/widget/widget";
import { WeatherStrip, type WeatherStripProps } from "@components/ui/weather-strip";

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
    sx?: SxProps;
}

export default function HourlyWeatherStripWidget(props: HourlyWeatherStripWidgetProps) {
    const [page, setPage] = useState(1);
    const [activeStrip, setActiveStrip] = useState<number>(0);

    const hourlyWeatherData = props.weatherData && props.weatherData.hourly
        ? props.weatherData.hourly.map((hourlyWeather) => {
            const time = hourlyWeather.dt.getTime();
            return {
                key: time,
                props: {
                    date: hourlyWeather.dt,
                    timezone: props.weatherData!.timezone,
                    weatherCode: hourlyWeather.weather[0].id,
                    weatherDescription: hourlyWeather.weather[0].description,
                    temperature: hourlyWeather.temp,
                    rainPercentage: hourlyWeather.pop,
                    stats: parseWeatherDetailStats(hourlyWeather, props.weatherData!.timezone),
                    expanded: activeStrip === time,
                    setExpanded: () => { setActiveStrip((activeStrip === time) ? 0 : time); },
                } as WeatherStripProps,
            };
        })
        : Array(48).fill(0).map((_, idx) => ({
            key: idx,
            props: {
                skeleton: true,
            } as SkeletonProps,
        }));

    const WeatherStrips = hourlyWeatherData.slice((page - 1) * 12, page * 12).map((hourlyWeather) => {
        return (
            <Box component="li" key={hourlyWeather.key}>
                <WeatherStrip {...hourlyWeather.props} />
            </Box>
        );
    }

    );

    const handleChange = (_: ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <Widget
            title="Hourly Weather Details"
            disableChildrenPadding
            sx={props.sx}
        >
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
