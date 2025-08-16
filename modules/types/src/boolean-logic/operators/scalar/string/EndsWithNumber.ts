import type { LastChar, NumericChar } from "inferred-types/types";

/**
 * **EndsWithNumber**`<T>`
 *
 * Boolean operator which tests whether `T` is a string and _ends with_
 * a numeric character.
 */
export type EndsWithNumber<T> = T extends string
    ? string extends T
        ? boolean
        : T extends ""
            ? false
            : LastChar<T> extends NumericChar
                ? true
                : false
    : false;
