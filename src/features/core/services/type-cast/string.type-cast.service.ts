import { TypeCast } from "@src/features/core/types/interfaces/type-cast.interface";

export class StringTypeCastService implements TypeCast<string> {
    /**
     * Attempts to cast a string to string.
     *  @throws {InvalidCastException} if the input is invalid.
     */

    cast(value: string): string {
        return value;
    }
}
