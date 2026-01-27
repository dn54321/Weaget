import { withSkeleton } from "@components/with-skeleton";

import WeatherStrip from "./weather-strip.component";
import { WeatherStripSkeleton } from "./weather-strip.skeleton";

const weatherStripHOC = withSkeleton(WeatherStrip, WeatherStripSkeleton);
export { weatherStripHOC as WeatherStrip };
export { type WeatherStripProps } from "./weather-strip.component";
