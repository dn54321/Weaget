import { CoreApiConnector } from "@src/apis/_v2/@core/core.api-connector";
import { HttpDataSources } from "@src/apis/_v2/@core/types/enums/http-data-sources.enum";
import { RateLimitTypes } from "@src/apis/_v2/@core/types/enums/rate-limit-types.enum";
import { ApiConnectorBase } from "@src/apis/_v2/@core/types/interfaces/api-connector.interface";
import { RateLimit } from "@src/apis/_v2/@core/types/interfaces/rate-limit.interface";
import { Configs } from "@src/features/config/types/enums/configs.enums";
import { Duration } from "@src/types/math.types";



export class GeonameApiConnector extends CoreApiConnector implements ApiConnectorBase {
    baseUrl = "http://api.geonames.org";
    rateLimits: Array<RateLimit> = [];
    secrets = [
        {
            key: "username",
            location: HttpDataSources.QUERY,
            value: Configs.APIKEY_GEONAMES
        }
    ];
    public constructor() {
        super();
        this.cacheTags.push("geonames");
        const rateLimitKeyPrefix = this.cacheTags.join(".");
        this.rateLimits.push(...[
            {
                duration: Duration.HOURLY,
                key: `${rateLimitKeyPrefix}.hourly`,
                limit: 10_000,
                rateBy: RateLimitTypes.ALL
            },
            {
                duration: Duration.DAILY,
                key: `${rateLimitKeyPrefix}.daily`,
                limit: 1000,
                rateBy: RateLimitTypes.ALL
            }
        ]);
    }
}