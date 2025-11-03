import type { HasSameKeys, IsGreaterThanOrEqual, IsInteger, IsLessThanOrEqual } from "types/boolean-logic";

type ValidValue<T extends number> = IsGreaterThanOrEqual<T, 0> extends true
    ? IsLessThanOrEqual<T, 255> extends true
        ? IsInteger<T>
        : false
    : false
;

/**
 * **IsRgbObject**`<T>`
 *
 * Boolean operator which tests whether `T` is a valid RGB object.
 *
 * - not only tests for object shape and that `r`, `g`, and `b` are numbers
 * - but also validate that those numbers are between 0-255 and integers
 * - rejects objects with extra properties (like `a` for alpha, which would make it RGBA)
 */
export type IsRgbObject<T> = T extends {
    r: number;
    g: number;
    b: number;
}
    ? HasSameKeys<T, { r: number; g: number; b: number }> extends true
        ? ValidValue<T["r"]> extends true
            ? ValidValue<T["g"]> extends true
                ? ValidValue<T["b"]> extends true
                    ? true
                    : false
                : false
            : false
        : false
    : false;
