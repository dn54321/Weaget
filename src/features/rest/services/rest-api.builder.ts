import { RestRecipe } from "@src/features/rest/entities/rest-recipe.entity";
import { z, ZodRawShape } from "zod";

export class RestApiBuilder<T extends ZodRawShape> {
    private restClient: RestRecipe<T>;
    constructor() {
        this.restClient = new RestRecipe();
    }

    addHeader(key: string, value: number | string) {
        this.restClient.headers.push({ key, value });
        return this;
    }

    addQueryParameter(key: string, value: number | string) {
        this.restClient.queryParams.push({ key, value });
        return this;
    }


    make() {
        const client = this.restClient;
        this.restClient = new RestRecipe();
        return client;
    }

    onErrorResponse(fn: (response: Response) => void) {
        this.restClient.errorResponseHandler = fn;
        return this;
    }

    parse(schema: z.ZodObject<T>) {
        this.restClient.zodParse = schema;
    }

    reset() {
        this.restClient = new RestRecipe();
    }

    setBaseUrl(url: string) {
        this.restClient.baseUrl = url;
        return this;
    }

    setCacheDuration(seconds: number) {
        this.restClient.cacheDurationSeconds = seconds;
        return this;
    }


    // call(path: string, method: HttpRequestMethod) {
    //     const url = this.baseUrl + path;
    //     try {

    //     }
    // }
}
