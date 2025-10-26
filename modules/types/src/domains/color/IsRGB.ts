import type { IsGreaterThanOrEqual, IsInteger, IsLessThanOrEqual } from "types/boolean-logic";

type ValidValue<T extends number> = IsGreaterThanOrEqual<T, 0> extends true
    ? IsLessThanOrEqual<T, 255> extends true
        ? IsInteger<T>
        : false
    : false
;

/**
 * **IsRGB**`<T>`
 *
 * Boolean operator which tests whether `T` is a valid RGB object.
 *
 * - not only tests for object shape and that `r`, `g`, and `b` are numbers
 * - but also validate that those number are between 0-255 and integers
 */
export type IsRGB<T> = T extends {
    r: number;
    g: number;
    b: number;
}
    ? ValidValue<T["r"]> extends true
        ? ValidValue<T["g"]> extends true
            ? ValidValue<T["b"]> extends true
                ? true
                : false
            : false
        : false
    : false;
