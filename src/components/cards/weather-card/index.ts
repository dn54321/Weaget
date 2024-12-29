import WeatherCard from "./weather-card.component";
import WeatherCardSkeleton from "./weather-card.skeleton";
import { withSkeleton } from "@components/with-skeleton";

const weatherCardHOC = withSkeleton(WeatherCard, WeatherCardSkeleton);

export { weatherCardHOC as WeatherCard };
export { type WeatherCardProps } from "./weather-card.component";
export { default as WeatherCardSkeleton } from "./weather-card.skeleton";
