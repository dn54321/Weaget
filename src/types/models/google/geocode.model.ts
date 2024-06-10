export enum AddressTypes {
    STREET_NUMBER = "street_number",
    NEIGHBOURHOOD = "neighborhood",
    POLITICAL = "political",
    PREMISE = "premise",
    SUB_PREMISE = "subpremise",
    PLUS_CODE = "plus_code",
    NATURAL_FEATURE = "natural_feature",
    AIRPORT = "airport",
    PARK = "park",
    POINT_OF_INTEREST = "point_of_interest",
    SUBLOCALITY = "sublocality",
    SUBLOCALITY_1 = "sublocality_level_1",
    SUBLOCALITY_2 = "sublocality_level_2",
    SUBLOCALITY_3 = "sublocality_level_3",
    SUBLOCALITY_4 = "sublocality_level_4",
    SUBLOCALITY_5 = "sublocality_level_5",
    ADMINISTRATIVE_AREA_1 = "administrative_area_level_1",
    ADMINISTRATIVE_AREA_2 = "administrative_area_level_2",
    ADMINISTRATIVE_AREA_3 = "administrative_area_level_3",
    ADMINISTRATIVE_AREA_4 = "administrative_area_level_4",
    ADMINISTRATIVE_AREA_5 = "administrative_area_level_5",
    ADMINISTRATIVE_AREA_6 = "administrative_area_level_6",
    ADMINISTRATIVE_AREA_7 = "administrative_area_level_7",
    COLLOQUIAL_AREA = "colloquial_area",
    LOCALITY = "locality",
    COUNTRY = "country",
    ROUTE = "route",
    POSTAL_CODE = "postal_code",
    INTERSECTION = "intersection",
}

export enum GeocodeType {
    FLOOR = "floor",
    ESTABLISHMENT = "establishment",
    LANDMARK = "landmark",
    POINT_OF_INTEREST = "point_of_interest",
    PARKING = "parking",
    POST_BOX = "post_box",
    POSTAL_TOWN = "postal_town",
    ROOM = "room",
    STREET_NUMBER = "street_number",
    BUS_STATION = "bus_station",
    TRAIN_STATION = "train_station",
    TRANSIT_STATION = "transit_station",
}

export interface Coords {
    lat: number,
    lng: number
}

export interface AddressComponent {
    longName: string,
    shortName: string,
    types: Array<AddressTypes>,
}

export interface Geometry {
    location: Coords
    viewport: Bounds,
    locationType: string,
    bounds: Bounds
}

export interface Bounds {
    northeast: Coords,
    southwest: Coords
}

export interface PlusCode {
    compoundCode: string,
    globalCode: string
}

export interface GoogleGeocodeResult {
    addressComponents: Array<AddressComponent>,
    formattedAddress: string,
    geometry: Geometry
    placeId: string,
    plusCode: PlusCode,
    types: Array<GeocodeType>,
}

export interface GoogleGeocode {
    results: Array<GoogleGeocodeResult>,
    status: string,
}