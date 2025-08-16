import type { DoesExtend, IsNever, IsNumber } from "inferred-types/types";

/**
 * **IsNumberLike**`<T>`
 *
 * Boolean operator which validates that `T` is a number or `${number}`
 */
export type IsNumberLike<T> = IsNever<T> extends true
    ? false
    : IsNumber<T> extends true
        ? true
        : DoesExtend<T, `${number}`> extends true
            ? true
            : false;
