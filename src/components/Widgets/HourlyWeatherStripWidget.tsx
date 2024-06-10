import { mdiThermometerWater, mdiWaterPercent, mdiWeatherCloudy, mdiWeatherPouring, mdiWeatherSnowy, mdiWeatherSunnyAlert } from '@mdi/js';
import Icon from '@mdi/react';
import AirIcon from '@mui/icons-material/Air';
import { Box, Card, Divider, Pagination, Skeleton, Stack } from "@mui/material";
import styled from "@mui/system/styled";
import { useState } from "react";
import { HourlyWeatherDetails, OneCallWeatherDetails } from "../../types/models/openWeather/oneCall.model";
import SpeedUnit from "../SpeedUnit";
import WeatherStrip from '../WeatherStrip';
import { Widget } from '../Containers/Widget';
import Temp from '../TemperateUnit';
import { WeatherStats, parseWeatherDetailStats } from '../Cards/WeatherStatsCard';

const Container = styled(Card)(() => ({
    width: "100%",
    color: "black",
    padding: "15px"
}));

function UVWarning(scale) {
    if (scale === undefined) return scale;
    if (scale <= 2) return `Low (${scale})`;
    else if (scale <= 5) return `Moderate (${scale})`;
    else if (scale <= 7) return `High (${scale})`;
    else if (scale <= 10) return `Very High (${scale})`;
    else return `Extreme (${scale})`;
}

export function HourlyWeatherWidgetSkeleton() {
    return (
        <Widget
            title="Weather Details"
            disableChildrenPadding
        >
            {[...Array(12)].map((_,i) => (
                <Box key={i}>
                    <Box height="66px" my="1px" key={i} display="flex" alignItems="center">
                        <Box width="40px" ml="20px">
                            <Skeleton variant="circular" width={40} height={40}/>
                        </Box>
                        <Box ml="10px">
                            <Skeleton variant="text" width="60px" sx={{lineHeight: 1}}/>
                            <Skeleton variant="text" width="90px" sx={{lineHeight: 1}}/>
                        </Box>
                        <Box position="relative" width="100%" height="100%" mx="30px">
                            <Stack direction="row" gap="20px" sx={{
                                alignItems: "center",
                                position: "absolute",
                                left: "0px",
                                right: "0px",
                                top: "0px",
                                bottom: "0px",
                            }}>
                                <Stack direction="row" sx={{
                                    overflow: "hidden",
                                    flexWrap: "wrap",
                                    width: "100%",
                                    height: "40px",
                                    gap: "20px"
                                }}>
                                    {[...Array(7)].map((_,i) => (
                                            <Box key={i}>
                                                <Skeleton variant="rectangular" width={40} height={40}/>
                                            </Box>
                                        ))
                                    }
                                </Stack>
                            </Stack>
                        </Box>
                        <Stack ml="auto" mr="15px" alignItems="flex-end">
                            <Skeleton variant="text" width="80px" sx={{lineHeight: 1}}/>
                            <Skeleton variant="text" width="90px" sx={{lineHeight: 1}}/>
                        </Stack>
                    </Box>
                    <Divider/>
                </Box>
            ))}
        </Widget>
    )
}

export interface WeatherStripProp {
    weatherData?: OneCallWeatherDetails;
}

export default function HourlyWeatherStripWidget(props: WeatherStripProp) {
    const [page, setPage] = useState(1);
    const [activeStrip, setActiveStrip] = useState<number>(0);

    if (!props.weatherData) {
        return <HourlyWeatherWidgetSkeleton/>;
    }

    const weather = props.weatherData;
    const WeatherStrips = weather.hourly.slice((page-1)*12,page*12).map(hourlyWeather => {
        const time = hourlyWeather.dt.getTime();
        return (
            <WeatherStrip 
                key={time}
                date={hourlyWeather.dt}
                timezone={weather.timezone}
                weatherCode={hourlyWeather.weather[0].id}
                weatherDescription={hourlyWeather.weather[0].description}
                temperature={hourlyWeather.temp}
                rainPercentage={hourlyWeather.pop}
                stats={parseWeatherDetailStats(hourlyWeather, weather.timezone)}
                expanded={activeStrip === time}
                setExpanded={() => { setActiveStrip((activeStrip === time) ? 0: time) }}
            />
        )
    }
        
    )   


    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <Widget title="Hourly Weather Details" disableChildrenPadding>
            <ul>{WeatherStrips}</ul>
            <Box display="flex" justifyContent="center" mt="10px">
                {props.weatherData ?
                    <Pagination count={4} page={page} onChange={handleChange} color="primary"
                    sx={{
                        py:"5px",
                        "& .MuiPaginationItem-root": {
                            color: "black"
                        },
                        "& .Mui-selected": {
                            color: "#fff"
                        }
                    }}/>
                    :
                    <Box my="10px"><Box className="dot-falling"/></Box>
                }
            </Box>
        </Widget>
    )
}