import { createWeatherDailyMockData } from "@features/weaget/__mocks__/weather.mock";
import { faker } from "@faker-js/faker";
import { parseWeatherDetailStats } from "@components/cards/weather-stats-card/weather-stats-card.utils";

export function createWeatherStatsCardStatMockData() {
    const dailyWeather = createWeatherDailyMockData();
    return parseWeatherDetailStats(dailyWeather, faker.location.timeZone());
}
