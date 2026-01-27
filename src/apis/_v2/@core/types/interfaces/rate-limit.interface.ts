import { RateLimitTypes } from "@src/apis/_v2/@core/types/enums/rate-limit-types.enum";

export interface RateLimit {
    duration: number;
    key: string;
    limit: number;
    rateBy: RateLimitTypes | RateLimitTypes[];
}