import { Expose, Transform } from "class-transformer";
import IpinfoGeocode from "../../models/ipinfo/geocode.model";

export default class IpinfoGeocodeDto implements IpinfoGeocode {
    @Expose() ip: string;
    @Expose() hostname: string;
    @Expose() city: string;
    @Expose() region: string;
    @Expose() country: string;
    @Expose() loc: string;
    @Expose() org: string;
    @Expose() postal: string;
    @Expose() timezone: string;
    @Expose() bogon?: boolean;

    @Transform(({obj}) => Number(obj.loc?.split(",")[0]))
    @Expose() lat: number

    @Transform(({obj}) => Number(obj.loc?.split(",")[1]))
    @Expose() lng: number
}