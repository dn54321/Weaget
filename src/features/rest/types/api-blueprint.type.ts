import { HttpRequestMethod } from "./api.type";

export interface ApiBlueprint {
    cacheDuration?: number
    method: HttpRequestMethod
    path: string

}
