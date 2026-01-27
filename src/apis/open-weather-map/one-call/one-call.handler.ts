import { oneCallWeatherDetailsSchema } from "./one-call.schema";
import { OneCallWeatherDetails } from "./one-call.type";

// API ENDPOINTS
const URL_GET_ONE_WEATHER = (lat: number, lng: number, lang?: string) => `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&lang=${lang}&appid=${process.env.OPENWEATHER_API}`;

// CONFIGURATIONS
const WEATHER_CACHE_SECONDS = 30 * 60;

/**
 * Fetches weather information for a location specified by latitude and longitude.
 * @param lat The latitude of the location.
 * @param lng The longitude of the location.
 * @returns A promise that resolves to an instance of OneCallWeatherDetails.
 */
export async function getWeatherByCoords(lat: number, lng: number, lang?: string): Promise<OneCallWeatherDetails> {
    const oneWeatherUrl = URL_GET_ONE_WEATHER(lat, lng, lang);
    const response = await fetch(oneWeatherUrl, { next: { revalidate: WEATHER_CACHE_SECONDS } });

    if (!response.ok) {
        throw new Error(`[Weather Service] Could not fetch weather by coords. (lat: ${lat}, lon: ${lng})`);
    }

    const data = await response.json();
    return oneCallWeatherDetailsSchema.parse(data);
}
