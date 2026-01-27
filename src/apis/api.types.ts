export enum CacheDuration {
    DAILY = 86400,
    HOURLY = 3600,
    MINUTELY = 60,
    MONTHLY = 2419200,
    WEEKLY = 604800
}

export enum ErrorTypes {
    INTERNAL_SERVER_ERROR = "internal_server_error",
    INVALID_REQUEST = "invalid_request",
    RATE_LIMIT = "rate_limit"
}

export enum HttpMethods {
    DELETE = "DELETE",
    GET = "GET",
    PATCH = "PATCH",
    POST = "POST",
    PUT = "PUT"
}

export enum HttpStatusCodes {
    ACCEPTED = 202,
    BAD_GATEWAY = 502,
    BAD_REQUEST = 400,
    CREATED = 201,
    FORBIDDEN = 403,
    GATEWAY_TIMEOUT = 504,
    INTERNAL_SERVER_ERROR = 500,
    METHOD_NOT_ALLOWED = 405,
    NO_CONTENT = 204,
    NOT_FOUND = 404,
    OK = 200,
    PARTIAL_CONTENT = 206,
    SERVICE_UNAVAILABLE = 503,
    TOO_MANY_REQUESTS = 429,
    UNAUTHORIZED = 401
}

export enum HttpStatuses {
    ACCEPTED = "Accepted",
    BAD_GATEWAY = "Bad Gateway",
    BAD_REQUEST = "Bad Request",
    CREATED = "Created",
    FORBIDDEN = "Forbidden",
    GATEWAY_TIMEOUT = "Gateway Timeout",
    INTERNAL_SERVER_ERROR = "Internal Server Error",
    METHOD_NOT_ALLOWED = "Method Not Allowed",
    NO_CONTENT = "No Content",
    NOT_FOUND = "Not Found",
    OK = "OK",
    PARTIAL_CONTENT = "Partial Content",
    SERVICE_UNAVAILABLE = "Service Unavailable",
    TOO_MANY_REQUESTS = "Too Many Requests",
    UNAUTHORIZED = "Unauthorized"
}
