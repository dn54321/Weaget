import { TypeStrings } from "@services/core/types/enums/type-strings.enum";

import { BooleanTypeCastService } from "./type-cast/boolean.type-cast.service";
import { NumberTypeCastService } from "./type-cast/number.type-cast.service";
import { StringTypeCastService } from "./type-cast/string.type-cast.service";

type TypeCastMap = {
    [TypeStrings.BOOLEAN]: BooleanTypeCastService
    [TypeStrings.NUMBER]: NumberTypeCastService
    [TypeStrings.STRING]: StringTypeCastService
};

export class TypeCastFactory {
    constructor() {}

    /**
     * The function `get` returns a type cast service based on the input type.
     * @param {TypeStrings} type - The `type` parameter in the `get` function is an enum type `Types` which
     * represents different data types such as `NUMBER`, `STRING`, and `BOOLEAN`. The function returns an
     * instance of a service class that performs type casting based on the input `type`.
     * @throws {InvalidTypeException} When an invalid type is provided.
     * @returns The `get` method is returning an instance of a type cast service based on the input `type`.
     * If the input `type` is `NUMBER`, it returns an instance of `BooleanTypeCastService`. If the input
     * `type` is `STRING`, it returns an instance of `StringTypeCastService`. If the input `type` is
     * `BOOLEAN`, it also returns an instance of `
     */
    get(type: TypeStrings): TypeCastMap[TypeStrings] {
        switch (type) {
            case TypeStrings.BOOLEAN:
                return new BooleanTypeCastService();
            case TypeStrings.NUMBER:
                return new BooleanTypeCastService();
            case TypeStrings.STRING:
                return new StringTypeCastService();
            default:
                throw new InvalidTypeException(`'${type}' type is not supported type.`);
        }
    }
}
