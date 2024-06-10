
import { Expose, Type } from "class-transformer";
import type { AddressComponent, AddressTypes, GoogleGeocodeResult, Geometry, Coords, GeocodeType, PlusCode, GoogleGeocode, Bounds } from "../../models/google/geocode.model";

export class AddressComponentDto implements AddressComponent {
    @Expose({name: "long_name"}) longName: string;
    @Expose({name: "short_name"}) shortName: string;
    @Expose() types: Array<AddressTypes>;
}

export class PlusCodeDto implements PlusCode {
    @Expose({name: "compound_code"}) compoundCode: string;
    @Expose({name: "global_code"}) globalCode: string;
}

export class CoordsDto implements Coords {
    @Expose() @Type(() => Number) lat: number;
    @Expose() @Type(() => Number) lng: number;
}

export class BoundsDto implements Bounds {
    @Expose() @Type(() => CoordsDto) northeast: CoordsDto;
    @Expose() @Type(() => CoordsDto) southwest: CoordsDto;
}

export class GeometryCoordinatesDto implements Geometry {
    @Expose() @Type(() => CoordsDto) location: CoordsDto;
    @Expose({name: 'location_type'}) locationType: string;
    @Expose() @Type(() => BoundsDto) viewport: BoundsDto;
    @Expose() @Type(() => BoundsDto) bounds: BoundsDto;
}

export class GoogleGeocodeResultDto implements GoogleGeocodeResult {
    @Expose({name: 'address_components'}) @Type(() => AddressComponentDto) addressComponents: Array<AddressComponentDto>;
    @Expose() @Type(() => GeometryCoordinatesDto) geometry: GeometryCoordinatesDto;
    @Expose({name: 'formatted_address'}) formattedAddress: string;
    @Expose({name: 'place_id'}) placeId: string;
    @Expose({name: 'plus_code'}) @Type(() => PlusCodeDto) plusCode: PlusCodeDto;
    @Expose() types: Array<GeocodeType>;
}

export class GoogleGeocodeDto {
    @Expose() @Type(() => GoogleGeocodeResultDto) results: Array<GoogleGeocodeResultDto>;
    @Expose() status: string;
}

