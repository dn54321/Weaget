export default interface IpinfoGeocode {
    ip: string,
    hostname?: string,
    city: string,
    region: string,
    country: string,
    loc: string,
    lat: number,
    lng: number,
    org: string,
    postal?: string,
    timezone: string,
    bogon?: boolean,
}