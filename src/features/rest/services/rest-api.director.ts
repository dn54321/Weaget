import { ZodRawShape } from "zod";

import { RestApiBuilder } from "./rest-api.builder";

export class RestRecipeDirector<T extends ZodRawShape> {
    constructor() {

    }

    make(builder: RestApiBuilder<T>, blueprint: RestRecipeDirector<T>) {
        return;
    }
}
