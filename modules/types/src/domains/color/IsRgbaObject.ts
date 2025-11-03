import type { IsPercentage, Percentage } from "inferred-types/types";
import type {
    HasSameKeys,
    IsGreaterThanOrEqual,
    IsInteger,
    IsLessThanOrEqual
} from "types/boolean-logic";

type ValidColorValue<T extends number> = IsGreaterThanOrEqual<T, 0> extends true
    ? IsLessThanOrEqual<T, 255> extends true
        ? IsInteger<T>
        : false
    : false
;

/**
 * **IsRgbaObject**`<T>`
 *
 * Boolean operator which tests whether `T` is a valid RGBA object.
 *
 * - not only tests for object shape and that `r`, `g`, `b`, and `a` are numbers
 * - but also validate that those numbers are:
 *     - between 0-255 and integers for color values
 *     - alpha value between 0 and 1 (or between `0%` and `100%`)
 * - rejects objects with extra properties (like `a` for alpha, which would make it RGBA)
 */
export type IsRgbaObject<T> = T extends {
    r: infer Red extends number;
    g: infer Green extends number;
    b: infer Blue extends number;
    a: infer Alpha extends number | Percentage;
}
    ? HasSameKeys<T, { r: number; g: number; b: number; a: Percentage }> extends true
        ? ValidColorValue<Red> extends true
            ? ValidColorValue<Green> extends true
                ? ValidColorValue<Blue> extends true
                    ? IsPercentage<Alpha> extends true
                        ? true
                        : false
                    : false
                : false
            : false
        : false
    : false;
