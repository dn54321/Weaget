import CompactWeatherCard from "./compact-weather-card.component";
import CompactWeatherCardSkeleton from "./compact-weather-card.skeleton";
import { withSkeleton } from "@components/with-skeleton";

const compactWeatherCardHOC = withSkeleton(CompactWeatherCard, CompactWeatherCardSkeleton);

export { compactWeatherCardHOC as CompactWeatherCard };
export { type CompactWeatherCardProps } from "./compact-weather-card.component";
export { default as CompactWeatherCardSkeleton } from "./compact-weather-card.skeleton";
