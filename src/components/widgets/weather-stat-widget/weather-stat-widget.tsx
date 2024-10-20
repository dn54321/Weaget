import { SxProps } from "@mui/material";
import { DateTime } from "luxon";
import { useWidgetStore } from "@src/hooks/stores/use-widget-store";
import { OneCallWeatherDetails } from "@features/open-weather-map-one-call/oneCall.type";
import { WeatherStatsCard } from "@components/cards/weather-stats-card";
import { parseWeatherDetailStats } from "@components/cards/weather-stats-card/weather-stats-card.utils";
import { Widget } from "@components/containers/widget/widget";
import { useSystemTranslation } from "@src/hooks/use-system-translation";
import { useSystemSettings } from "@src/hooks/use-system-settings";
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
