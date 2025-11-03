import type { Every, Length } from "inferred-types/types";

/**
 * **IsRgbTuple**`<T>`
 *
 * Boolean operator which tests whether `T` is a valid `RgbTuple`:
 *
 * - must have three numeric parameters
 * - all parameters must be between 0 and 255
 */
export type IsRgbTuple<T> = T extends readonly number[]
    ? Length<T> extends 3
        ? Every<T, "greaterThanOrEqual", 0> extends true
            ? Every<T, "lessThanOrEqual", 255> extends true
                ? true
                : false
            : false
        : false
    : false;
