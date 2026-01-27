import { TypeStrings } from "./enums/type-strings.enum";

export type TypeMap = {
    [TypeStrings.BOOLEAN]: boolean
    [TypeStrings.NUMBER]: number
    [TypeStrings.STRING]: string
};
