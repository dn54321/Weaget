export interface LocationSuggestionOptional {
    location: string
    types: string
}

export interface NearbyLocation {
    country: string
    name: string
    state: string
}

export type NearbyLocations = Array<NearbyLocation>;
