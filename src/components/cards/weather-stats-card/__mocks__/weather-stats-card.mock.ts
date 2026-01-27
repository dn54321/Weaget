import { parseWeatherDetailStats } from "@components/cards/weather-stats-card/weather-stats-card.utils";
import { faker } from "@faker-js/faker";
import { createWeatherDailyMockData } from "@src/apis/weaget/weather/__mocks__/weather.mock";
import i18n from "@src/i18n/i18n";
import { SystemLocale } from "@src/types/system.types";

export function createWeatherStatsCardStatMockData() {
    const dailyWeather = createWeatherDailyMockData();
    return parseWeatherDetailStats(
        dailyWeather,
        faker.location.timeZone(),
        i18n.t,
        SystemLocale.ENGLISH
    );
}
