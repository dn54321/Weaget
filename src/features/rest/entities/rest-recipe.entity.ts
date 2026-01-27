import { HttpRequestMethod } from "@src/features/rest/types/api.type";
import { ZodObject, ZodRawShape } from "zod";

// Please use the builder instead of initialising this entity with properties.
export class RestRecipe<T extends ZodRawShape> {
    public baseUrl?: string;
    public body?: object;
    public cacheDurationSeconds?: number;
    public cacheTags: Array<string>;
    public errorResponseHandler?: (response: Response) => void;
    public headers: Array<{ key: string, value: number | string }>;
    public method?: HttpRequestMethod;
    public pathPrefix?: string;
    public queryParams: Array<{ key: string, value: number | string }>;
    public zodParse?: ZodObject<T>;

    constructor(payload?: Partial<RestRecipe<T>>) {
        this.queryParams = [];
        this.headers = [];
        this.cacheTags = [];
        Object.assign(this, payload);
    }
}
