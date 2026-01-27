import { withSkeleton } from "@components/with-skeleton";

import WeatherStatsCard from "./weather-stats-card.component";
import WeatherStatsCardSkeleton from "./weather-stats-card.skeleton";

const weatherStatsCardHOC = withSkeleton(WeatherStatsCard, WeatherStatsCardSkeleton);

export { weatherStatsCardHOC as WeatherStatsCard };
export { type WeatherStatsCardProps } from "./weather-stats-card.component";
export { default as WeatherStatsCardSkeleton } from "./weather-stats-card.skeleton";
