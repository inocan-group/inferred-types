import type { InputToken } from "inferred-types/types";
import { toJSON, toJsonArray } from "src/type-conversion";
import { isArray, isObject, isString } from "src/type-guards";

export function toOutputToken<T extends InputToken>(input: T) {
    return isString(input)
        ? `<<'${input}'>>`
        : isObject(input)
            ? toJSON(input)
            : isArray(input)
                ? toJsonArray(input)
                : "";
}
