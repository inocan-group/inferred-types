import { InputToken } from "inferred-types/types";
import { isObject, isString } from "src/type-guards";

export function toOutputToken<T extends InputToken>(input: T) {
    return isString(input)
        ? `<<'${input}'>>`
        : isObject(input)
        ?
}
