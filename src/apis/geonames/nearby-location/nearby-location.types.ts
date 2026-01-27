export interface AdminCode {
    ISO3166_2?: string
}

export interface GeonamesNearbyLocation {
    geonames: Array<GeonamesNearbyLocationResult>
}

export interface GeonamesNearbyLocationResult {
    adminCode1: string
    adminCodes1?: AdminCode
    adminName1: string
    countryCode: string
    countryId: number
    countryName: string
    distance: number
    fcl: string
    fclName: string
    fcode: string
    fcodeName: string
    geonameId: number
    lat: string
    lng: number
    name: string
    population: number
    toponymName: string
}
