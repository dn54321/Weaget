import { SystemLocale } from "@project/src/types/system.types";
import { createWeatherDailyMockData } from "@features/weaget/__mocks__/weather.mock";
import { faker } from "@faker-js/faker";
import i18n from "@project/src/i18n/i18n";
import { parseWeatherDetailStats } from "@components/cards/weather-stats-card/weather-stats-card.utils";

export function createWeatherStatsCardStatMockData() {
    const dailyWeather = createWeatherDailyMockData();
    return parseWeatherDetailStats(
        dailyWeather,
        faker.location.timeZone(),
        i18n.t,
        SystemLocale.ENGLISH,
    );
}
