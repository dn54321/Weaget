import { plainToInstance } from "class-transformer";
import OneCallWeatherDetailsDto from "../types/dtos/openWeather/openCall.dto";
import { OneCallWeatherDetails } from "../types/models/openWeather/oneCall.model";
import { getLocationDetails } from "./geolocation.service";

// API ENDPOINTS
const URL_GET_ONE_WEATHER = (lat: number, lng: number) => `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${process.env.OPENWEATHER_API}`;

// CONFIGURATIONS
const WEATHER_CACHE_SECONDS = 30*60;


/**
 * Fetches weather information for a location specified by latitude and longitude.
 * @param lat The latitude of the location.
 * @param lng The longitude of the location.
 * @returns A promise that resolves to an instance of OneCallWeatherDetails.
 */
export async function getWeatherByCoords(lat: number, lng: number): Promise<OneCallWeatherDetails> {
    const oneWeatherUrl = URL_GET_ONE_WEATHER(lat, lng);
    const response = await fetch(oneWeatherUrl, { next: {revalidate: WEATHER_CACHE_SECONDS }});

    if (!response.ok) {
        throw new Error(`[Weather Service] Could not fetch weather by coords. (lat: ${lat}, lon: ${lng})`);
    }

    const data = await response.json();
    return plainToInstance(OneCallWeatherDetailsDto, data, { enableImplicitConversion: true });
}

/**
 * Fetches weather information for a location specified by region and returns it as an instance of OneCallWeatherDetails model.
 * @param location A string representing the location you want to search for.
 * @param region An optional string representing a specific country or administrative region to narrow down your search.
 * @returns A promise that resolves to an instance of OneCallWeatherDetails.
 */
export async function getWeatherByRegion(location: string, region?: string): Promise<OneCallWeatherDetails> {
    const regionData = await getLocationDetails(location, region);
    const regionCoords = regionData.results[0].geometry.location;
    return await getWeatherByCoords(regionCoords.lat, regionCoords.lng);
}