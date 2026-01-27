import { HttpMethods } from "msw";

import { HttpSecret } from "./http-secret.interface";
import { RateLimit } from "./rate-limit.interface";


export interface ApiConnector<M extends object,Q extends object> extends ApiConnectorBase<M,Q> {
    baseUrl: string;
    method: HttpMethods;
    path: string;
}

export interface ApiConnectorBase<M extends object = object, Q extends object = object> {
    baseUrl?: string;
    // How long that the data should be stored for in seconds
    cache?: number;
    cacheTags?: string[];
    headers?: Record<string, string>;
    method?: HttpMethods;
    path?: string;
    queryTransformer?: (params: Q) => string;
    rateLimits?: RateLimit[];
    // Validates the DTO and transforms it into the model
    responseTransformer?: (dto: object) => M;
    secrets?: HttpSecret[];
}