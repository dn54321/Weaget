import { parseWeatherDetailStats } from "@components/cards/weather-stats-card/weather-stats-card.utils";
import { Widget } from "@components/containers/widget/widget";
import { WeatherStrip, type WeatherStripProps } from "@components/ui/weather-strip";
import { SkeletonProps } from "@components/with-skeleton";
import { Box, Pagination, SxProps } from "@mui/material";
import { OneCallWeatherDetails } from "@src/apis/open-weather-map/one-call/one-call.type";
import { useSystemTranslation } from "@src/hooks/use-system-translation";
import { ChangeEvent, useState } from "react";

export interface HourlyWeatherStripWidgetProps {
    sx?: SxProps
    weatherData?: OneCallWeatherDetails
}

export default function HourlyWeatherStripWidget(props: HourlyWeatherStripWidgetProps) {
    const { locale, t } = useSystemTranslation();
    const [page, setPage] = useState(1);
    const [activeStrip, setActiveStrip] = useState<number>(0);

    const hourlyWeatherData = props.weatherData && props.weatherData.hourly
        ? props.weatherData.hourly.map((hourlyWeather) => {
            const time = hourlyWeather.dt.getTime();
            return {
                key: time,
                props: {
                    date: hourlyWeather.dt,
                    expanded: activeStrip === time,
                    rainPercentage: hourlyWeather.pop,
                    setExpanded: () => { setActiveStrip((activeStrip === time) ? 0 : time); },
                    stats: parseWeatherDetailStats(hourlyWeather, props.weatherData!.timezone, t, locale),
                    temperature: hourlyWeather.temp,
                    timezone: props.weatherData!.timezone,
                    weatherCode: hourlyWeather.weather[0].id,
                    weatherDescription: hourlyWeather.weather[0].description
                } as WeatherStripProps
            };
        })
        : Array(48).fill(0).map((_, idx) => ({
            key: idx,
            props: {
                skeleton: true
            } as SkeletonProps
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
            disableChildrenPadding
            sx={props.sx}
            title={t("component.widget.hourlyWeatherStrip.title")}
        >
            <ol>{WeatherStrips}</ol>
            <Box display="flex" justifyContent="center" mt="10px" pb="7px">
                <Pagination
                    color="primary"
                    count={4}
                    onChange={handleChange}
                    page={page}
                />
            </Box>
        </Widget>
    );
}
