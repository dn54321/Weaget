import { WeatherCard, WeatherCardProps } from "@components/cards/weather-card";
import { Widget } from "@components/containers/widget/widget";
import { SkeletonProps } from "@components/with-skeleton";
import { Stack, SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import { OneCallWeatherDetails } from "@src/apis/open-weather-map/one-call/one-call.type";
import { useWidgetStore } from "@src/hooks/stores/use-widget-store";
import { useSystemTranslation } from "@src/hooks/use-system-translation";
import { useEffect, useState } from "react";

export interface DailyWeatherCardWidgetProps {
    sx?: SxProps
    weatherData?: OneCallWeatherDetails
}

export interface WeatherListProps {
    activeCard: number
    setActiveCard: (number: number) => void
    setHoverCard: (number: number) => void
    weatherData?: OneCallWeatherDetails
}

export default function DailyWeatherCardWidget(props: DailyWeatherCardWidgetProps) {
    const [activeCard, setActiveCard] = useState(-1);
    const [hoverCard, setHoverCard] = useState(-1);
    const { t } = useSystemTranslation();
    const setFocusedWeather = useWidgetStore(state => state.setFocusedWeather);

    useEffect(() => {
        if (hoverCard >= 0) {
            setFocusedWeather(props.weatherData?.daily?.[hoverCard]);
        }
        else if (activeCard >= 0) {
            setFocusedWeather(props.weatherData?.daily?.[activeCard]);
        }
        else {
            setFocusedWeather(undefined);
        }
    }, [activeCard, hoverCard, setFocusedWeather, props.weatherData]);

    return (
        <Widget
            subtitle={t("component.widget.dailyWeatherCard.description")}
            sx={props.sx}
            title={t("component.widget.dailyWeatherCard.title")}
        >
            <Box height="180px" mt="10px" position="relative">
                <Stack
                    className="skinny-scrollbar"
                    component="ol"
                    direction="row"
                    gap="5px"
                    left="0"
                    onMouseLeave={() => setHoverCard(-1)}
                    position="absolute"
                    py="5px"
                    right="0"
                    sx={{ overflowX: "auto" }}
                >
                    <WeatherList
                        activeCard={activeCard}
                        setActiveCard={setActiveCard}
                        setHoverCard={setHoverCard}
                        weatherData={props.weatherData}
                    />
                </Stack>
            </Box>
        </Widget>
    );
}

function WeatherList(props: WeatherListProps) {
    const weatherDetails = props.weatherData?.daily?.map((dailyWeather, idx) => ({
        key: dailyWeather.dt.getTime(),
        props: {
            active: props.activeCard === idx,
            date: dailyWeather.dt,
            maxTemperature: dailyWeather.temp.max,
            minTemperature: dailyWeather.temp.min,
            rainfallPercentage: dailyWeather.pop,
            timezone: `${props.weatherData?.timezone}`,
            weatherCode: dailyWeather.weather[0].id,
            weatherDescription: dailyWeather.weather[0].description
        } as WeatherCardProps
    }));

    const weatherListData = weatherDetails
      || Array(8).fill(null).map((_, i) => (
          { key: i, props: { skeleton: true } as SkeletonProps }));

    return weatherListData.map((dailyWeather, idx) => {
        return (
            <Box
                component="li"
                key={dailyWeather.key}
                onClick={() => props.setActiveCard(props.activeCard === idx ? -1 : idx)}
                onMouseEnter={() => props.setHoverCard(idx)}
                sx={{
                    "& .MuiCard-root": {
                        ...(props.activeCard === idx && {
                            backgroundColor: "secondary.main"
                        })
                    },
                    "& .MuiCardActionArea-root:hover": {
                        backdropFilter: "hue-rotate(10deg)",
                        boxShadow: 5
                    },
                    "& .MuiChip-root": {
                        ...(props.activeCard === idx && {
                            backgroundColor: "secondary.dark"
                        })
                    }
                }}
                width="100%"
            >
                <WeatherCard {...dailyWeather.props} />
            </Box>
        );
    });
}
