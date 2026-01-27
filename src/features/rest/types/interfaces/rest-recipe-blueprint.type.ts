import { RestApiBuilder } from "@services/rest/services/rest-api.builder";
import { ZodRawShape } from "zod";

export interface RestApiBuilderBase<T extends ZodRawShape = ZodRawShape> {
    make(builder: RestApiBuilder<T>): RestApiBuilder<T>
}
