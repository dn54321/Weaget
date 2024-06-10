import { Expose, Type } from "class-transformer";
import type { AdminCode, GeonamesGeocode, GeonamesGeocodeResult } from "../../models/geonames/geocode.model";

export class GeonamesGeocodeResultDto implements GeonamesGeocodeResult {
    @Expose() @Type(() => Number) lng: number;
    @Expose() @Type(() => Number) distance: number;
    @Expose() @Type(() => Number) countryId: number;
    @Expose() @Type(() => Number) lat: string;
    @Expose() adminCode1: string;
    @Expose() geonameId: number;
    @Expose() toponymName: string;
    @Expose() fcl: string;
    @Expose() population: number;
    @Expose() countryCode: number;
    @Expose() name: string;
    @Expose() fclName: string;
    @Expose() adminCodes1: AdminCode;
    @Expose() countryName: string;
    @Expose() fcodeName: string;
    @Expose() adminName1: string;
    @Expose() fcode: string;
}

export class GeonamesGeocodeDto implements GeonamesGeocode {
    @Expose() @Type(() => GeonamesGeocodeResultDto) geonames: GeonamesGeocodeResult[];
    
}