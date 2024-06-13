

export interface AdminCode {
    ISO3166_2: string
}

export interface GeonamesGeocodeResult {
    adminCode1: string,
    lng: number,
    distance: number,
    geonameId: number,
    toponymName: string,
    countryId: number,
    fcl: string,
    population: number,
    countryCode: string,
    name: string,
    fclName: string,
    adminCodes1?: AdminCode,
    countryName: string,
    fcodeName: string,
    adminName1: string,
    lat: string,
    fcode: string
}

export interface GeonamesGeocode {
    geonames: Array<GeonamesGeocodeResult>
}