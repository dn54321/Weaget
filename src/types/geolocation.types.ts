export interface LocationSuggestionOptional {
    location: string,
    types: string, 
}

export interface NearbyLocation {
    name: string,
    state: string,
    country: string
}

export type NearbyLocations = Array<NearbyLocation>