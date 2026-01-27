import { HttpContentTypes, HttpHeaders } from "@src/apis/_v2/@core/types/enums/http-headers.enum";
import { ApiConnector } from "@src/apis/_v2/@core/types/interfaces/api-connector.interface";
import { toQueryString } from "@src/apis/_v2/@core/utils/to-query-string";
import { PollutionApiConnector } from "@src/apis/_v2/apicn/pollution.base.api-connector";
import { Duration } from "@src/types/math.types";
import { HttpMethods } from "msw";

import { ApicnPollutionGetModel, ApicnPollutionGetQueryParameter, apicnPollutionGetValidationSchema } from "./apicn-pollution.get.types";


export class ApicnPollutionApiConnector extends PollutionApiConnector implements ApiConnector<
    ApicnPollutionGetModel,
    ApicnPollutionGetQueryParameter
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
    queryTransformer = (params: ApicnPollutionGetQueryParameter) => toQueryString(params);
    responseTransformer = (dto: object) => apicnPollutionGetValidationSchema.parse(dto);
}