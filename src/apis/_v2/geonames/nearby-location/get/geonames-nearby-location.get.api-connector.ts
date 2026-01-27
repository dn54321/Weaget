import { HttpContentTypes, HttpHeaders } from "@src/apis/_v2/@core/types/enums/http-headers.enum";
import { ApiConnector } from "@src/apis/_v2/@core/types/interfaces/api-connector.interface";
import { toQueryString } from "@src/apis/_v2/@core/utils/to-query-string";
import { GeonameApiConnector } from "@src/apis/_v2/geonames/geoname.base.api-connector";
import { Duration } from "@src/types/math.types";
import { HttpMethods } from "msw";

import { GeonamesNearbyLocationModel, GeonamesNearbyLocationQueryParameter, geonamesNearbyLocationValidationSchema } from "./geonames-nearby-location.types";

export class GeonameNearbyLocationApiConnector extends GeonameApiConnector implements ApiConnector<
    GeonamesNearbyLocationModel,
    GeonamesNearbyLocationQueryParameter
>{
    cache = Duration.WEEKLY;
    headers = {
        [HttpHeaders.CONTENT_TYPE]: HttpContentTypes.APPLICATION_JSON
    };
    method = HttpMethods.GET;
    path = "/findNearbyJSON";
    constructor() {
        super();
        this.cacheTags.push("geonames-nearby-location");
    }
    queryTransformer = (params: GeonamesNearbyLocationQueryParameter) => toQueryString(params);
    responseTransformer = (dto: object) => geonamesNearbyLocationValidationSchema.parse(dto);
}