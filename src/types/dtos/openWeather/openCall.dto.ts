import { Expose, Transform, Type } from "class-transformer"
import type { CurrentWeatherDetails, DailyWeatherDetails, HourlyDownpourWeatherDetails, HourlyWeatherDetails, MinutelyWeatherDetails, OneCallWeatherDetails, WeatherAlert, WeatherDetails } from "../../models/openWeather/oneCall.model"

export class WeatherDetailsDto {
    @Expose() id: number;
    @Expose() main: string;
    @Expose() description: string;
    @Expose() icon: string;
}

export class WeatherAlertDto implements WeatherAlert {
    @Expose({name: 'sender_name'}) senderName: string;
    @Expose() event: string;
    @Expose() start: string;
    @Expose() end: string;
    @Expose() description: string;
    @Expose() tags: string
}


export class CurrentWeatherDetailsDto implements CurrentWeatherDetails {
    @Expose({name: 'feels_like'}) feelsLike: number;
    @Expose({name: 'dew_point'}) dewPoint: number;
    @Expose({name: 'wind_speed'}) windSpeed: number;
    @Expose({name: 'wind_deg'}) windDeg: number;
    @Expose({name: 'wind_gust'}) windGust: number;
    @Expose() @Type(() => WeatherDetailsDto) weather: Array<WeatherDetailsDto>;
    @Expose() @Type(() => Date) @Transform(({ value }) => new Date(value*1000), { groups: ['client'] }) dt: Date;
    @Expose() @Type(() => Date) @Transform(({ value }) => value ? new Date(value*1000) : undefined, { groups: ['client'] }) sunrise?: Date;
    @Expose() @Type(() => Date) @Transform(({ value }) => value ? new Date(value*1000) : undefined, { groups: ['client'] }) sunset?: Date;
    @Expose() temp: number;
    @Expose() pressure: number;
    @Expose() humidity: number;
    @Expose() uvi: number;
    @Expose() clouds: number;
    @Expose() visibility: number;
    @Expose() rain?: HourlyDownpourWeatherDetails;
    @Expose() snow?: HourlyDownpourWeatherDetails;
}

export class HourlyWeatherDetailsDto implements HourlyWeatherDetails {
    @Expose({name: 'feels_like'}) feelsLike: number;
    @Expose({name: 'dew_point'}) dewPoint: number;
    @Expose({name: 'wind_speed'}) windSpeed: number;
    @Expose({name: 'wind_deg'}) windDeg: number;
    @Expose({name: 'wind_gust'}) windGust: number;
    @Expose() @Type(() => WeatherDetailsDto) weather: Array<WeatherDetailsDto>;
    @Expose() @Type(() => Date) @Transform(({ value }) => new Date(value*1000), { groups: ['client'] }) dt: Date;
    @Expose() temp: number;
    @Expose() pressure: number;
    @Expose() humidity: number;
    @Expose() uvi: number;
    @Expose() clouds: number;
    @Expose() visibility: number;
    @Expose() pop: number;
    @Expose() rain?: HourlyDownpourWeatherDetails;
    @Expose() snow?: HourlyDownpourWeatherDetails;
}

export class MinutelyWeatherDetailsDto implements MinutelyWeatherDetails {
    @Expose() @Type(() => Date) @Transform(({ value }) => new Date(value*1000), { groups: ['client'] }) dt: Date;
    @Expose() precipitation: number;
}

export class DailyWeatherDetailsDto implements DailyWeatherDetails {
    @Expose({name: 'moon_phase'}) moonPhase: number;
    @Expose({name: 'feels_like'}) feelsLike: { morn: number; day: number; eve: number; night: number; };
    @Expose({name: 'dew_point'}) dewPoint: number;
    @Expose({name: 'windSpeed'}) windSpeed: number;
    @Expose({name: 'windDeg'}) windDeg: number;
    @Expose({name: 'windDust'}) windDust: number;
    @Expose() @Type(() => WeatherDetailsDto) weather: Array<WeatherDetailsDto>;
    @Expose() @Type(() => Date) @Transform(({ value }) => new Date(value*1000), { groups: ['client'] }) dt: Date;
    @Expose() @Type(() => Date) @Transform(({ value }) => new Date(value*1000), { groups: ['client'] }) sunrise: Date;
    @Expose() @Type(() => Date) @Transform(({ value }) => new Date(value*1000), { groups: ['client'] }) sunset: Date;
    @Expose() @Type(() => Date) @Transform(({ value }) => new Date(value*1000), { groups: ['client'] }) moonrise: Date;
    @Expose() @Type(() => Date) @Transform(({ value }) => new Date(value*1000), { groups: ['client'] }) moonset: Date;
    @Expose() temp: { morn: number; day: number; eve: number; night: number; min: number; max: number; };
    @Expose() pressure: number;
    @Expose() humidity: number;
    @Expose() uvi: number;
    @Expose() clouds: number;
    @Expose() visibility: number;
    @Expose() pop: number;
    @Expose() rain?: number;
    @Expose() snow?: number;
}

export default class OneCallWeatherDetailsDto implements OneCallWeatherDetails {
    @Expose() @Type(() => CurrentWeatherDetailsDto) current: CurrentWeatherDetailsDto;
    @Expose() @Type(() => HourlyWeatherDetailsDto) hourly: Array<HourlyWeatherDetailsDto>;
    @Expose() @Type(() => WeatherAlertDto) alerts: WeatherAlertDto
    @Expose() @Type(() => MinutelyWeatherDetailsDto) minutely: Array<MinutelyWeatherDetailsDto>;
    @Expose() @Type(() => DailyWeatherDetailsDto) daily: Array<DailyWeatherDetailsDto>;
    @Expose() @Type(() => WeatherDetailsDto) weather: Array<WeatherDetailsDto>;
    @Expose({name: 'timezone_offset'}) timezoneOffset: number;
    @Expose() lat: number;
    @Expose() lon: number;
    @Expose() timezone: string;

}