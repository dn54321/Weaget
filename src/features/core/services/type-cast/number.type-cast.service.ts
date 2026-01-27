import { TypeCast } from "@src/features/core/types/interfaces/type-cast.interface";

export class NumberTypeCastService implements TypeCast<number> {
    /**
     * Attempts to cast a string to number
     *  @throws {InvalidCastException} if the input is invalid.
     */

    cast(value: string): number {
        const number = Number(value);

        if (isNaN(number)) {
            throw new InvalidCastException(`Expected a number but received '${value}'`);
        }

        return number;
    }
}
