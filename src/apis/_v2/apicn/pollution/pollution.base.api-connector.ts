import { CoreApiConnector } from "@src/apis/_v2/@core/core.api-connector";
import { HttpDataSources } from "@src/apis/_v2/@core/types/enums/http-data-sources.enum";
import { RateLimitDuration } from "@src/apis/_v2/@core/types/enums/rate-limit-duration.enum";
import { RateLimitTypes } from "@src/apis/_v2/@core/types/enums/rate-limit-types.enum";
import { ApiConnectorBase } from "@src/apis/_v2/@core/types/interfaces/api-connector.interface";
import { RateLimit } from "@src/apis/_v2/@core/types/interfaces/rate-limit.interface";
import { Configs } from "@src/features/config/types/enums/configs.enums";


export class PollutionApiConnector extends CoreApiConnector implements ApiConnectorBase {
    baseUrl = "https://api.waqi.info";
    public rateLimits: Array<RateLimit> = [];
    secrets = [
        {
            key: "token",
            location: HttpDataSources.QUERY,
            value: Configs.APIKEY_GEONAMES
        }
    ];
    public constructor() {
        super();
        this.rateLimits.push(
            { 
                duration: RateLimitDuration.SECONDLY,
                key: "apicn.pollution.secondly",
                limit: 1000,
                rateBy: RateLimitTypes.ALL
            },
            {
                duration: RateLimitDuration.HOURLY,
                key: "apicn.pollution.hourly.client",
                limit: 1000,
                rateBy: [RateLimitTypes.USER, RateLimitTypes.IP_ADDRESS]
            },
            {
                duration: RateLimitDuration.SECONDLY,
                key: "apicn.pollution.secondly.client",
                limit: 10,
                rateBy: [RateLimitTypes.USER, RateLimitTypes.IP_ADDRESS]
            }
        );
    }
}