import { LastChar } from "inferred-types/types";
import { asChars } from "inferred-types/runtime";
import { FirstChar } from "inferred-types";

export function lastChar<T extends string>(str: T) {
    const char = asChars(str).at(-1);

    return char as LastChar<T>;
}

export function firstChar<T extends string>(str: T) {
    const char = asChars(str).at(0);

    return char as FirstChar<T>;
}
