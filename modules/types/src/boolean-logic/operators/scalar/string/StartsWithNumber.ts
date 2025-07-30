import type { FirstChar, NumericChar } from "inferred-types/types";

/**
 * **StartsWithNumber**`<T>`
 *
 * Boolean operator which tests whether `T` is a string and _starts with_
 * a numeric character.
 */
export type StartsWithNumber<T> = T extends string
    ? string extends T
        ? boolean
        : T extends ""
            ? false
            : FirstChar<T> extends NumericChar
                ? true
                : false
    : false;
