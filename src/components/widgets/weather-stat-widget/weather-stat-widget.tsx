import { WeatherStatsCard } from "@components/cards/weather-stats-card";
import { parseWeatherDetailStats } from "@components/cards/weather-stats-card/weather-stats-card.utils";
import { Widget } from "@components/containers/widget/widget";
import { SxProps } from "@mui/material";
import { OneCallWeatherDetails } from "@src/apis/open-weather-map/one-call/one-call.type";
import { useWidgetStore } from "@src/hooks/stores/use-widget-store";
import { useSystemTranslation } from "@src/hooks/use-system-translation";
import { DateTime } from "luxon";
export interface WeatherStatWidgetProps {
    sx?: SxProps
    weatherData?: OneCallWeatherDetails
}

export default function WeatherStatWidget(props: WeatherStatWidgetProps) {
    const { locale, t } = useSystemTranslation();
    const focusedWeather = useWidgetStore(state => state.focusedWeather) ?? props.weatherData?.current;
    const timezone = props.weatherData?.timezone;
    const updatedTimestamp = DateTime
        .fromJSDate(focusedWeather?.dt ?? new Date(), { zone: timezone })
        .setLocale(locale);

    return (
        <Widget
            disableChildrenPadding
            rightDecorum={updatedTimestamp.toLocaleString(DateTime.DATE_MED)}
            sx={props.sx}
            title={t("component.widget.weatherStat.title")}
        >
            {
                focusedWeather
                    ? <WeatherStatsCard stats={parseWeatherDetailStats(focusedWeather, timezone!, t, locale)} />
                    : <WeatherStatsCard skeleton />
            }
        </Widget>
    );
}
