import { DateTime } from "luxon";
import type { OneCallWeatherDetails } from "@features/open-weather-map-one-call/oneCall.type";
import type { SxProps } from "@mui/material";
import { WeatherStatsCard } from "@components/cards/weather-stats-card";
import { Widget } from "@components/containers/widget/widget";
import { parseWeatherDetailStats } from "@components/cards/weather-stats-card/weather-stats-card.utils";
import { useSystemTranslation } from "@src/hooks/use-system-translation";
import { useWidgetStore } from "@src/hooks/stores/use-widget-store";
export interface WeatherStatWidgetProps {
    weatherData?: OneCallWeatherDetails;
    sx?: SxProps;
}

export default function WeatherStatWidget(props: WeatherStatWidgetProps) {
    const { t, locale } = useSystemTranslation();
    const focusedWeather = useWidgetStore(state => state.focusedWeather) ?? props.weatherData?.current;
    const timezone = props.weatherData?.timezone;
    const updatedTimestamp = DateTime
        .fromJSDate(focusedWeather?.dt ?? new Date(), { zone: timezone })
        .setLocale(locale);

    return (
        <Widget
            title={t("component.widget.weatherStat.title")}
            rightDecorum={updatedTimestamp.toLocaleString(DateTime.DATE_MED)}
            disableChildrenPadding
            sx={props.sx}
        >
            {
                focusedWeather
                    ? <WeatherStatsCard stats={parseWeatherDetailStats(focusedWeather, timezone!, t, locale)} />
                    : <WeatherStatsCard skeleton />
            }
        </Widget>
    );
}
