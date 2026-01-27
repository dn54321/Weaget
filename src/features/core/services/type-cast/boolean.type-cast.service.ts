import { InvalidCastException } from "@src/features/core/errors/invalid-cast-exception.error";
import { TypeCast } from "@src/features/core/types/interfaces/type-cast.interface";

export class BooleanTypeCastService implements TypeCast<boolean> {
    /**
     * Attempts to cast a string to number
     *  @throws {InvalidCastException} if the input is invalid.
     */
    cast(value: string): boolean {
        // Note: Arrays are faster than maps for small array sizes.

        if (["1", "true", "True"].includes(value)) {
            return true;
        }

        else if (["0", "false", "False"].includes(value)) {
            return false;
        }

        throw new InvalidCastException(`Expected a boolean string but received '${value}'`);
    }
}
