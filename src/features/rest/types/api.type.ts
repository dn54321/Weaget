export enum FieldLocation {
    BODY = "body",
    HEADER = "header",
    QUERY_PARAMETER = "queryParameter"
}

export enum HttpRequestMethod {
    DELETE = "DELETE",
    GET = "get",
    PATCH = "PATCH",
    POST = "post",
    PUT = "PUT"
}

export interface RestField {
    location: Location
    name: string
    value: number | string
}
