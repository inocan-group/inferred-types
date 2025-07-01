import type { IsBoolean, IsNever } from "inferred-types/types";

/**
 * **IsFalse**`<T>`
 *
 * Type utility which checks for the narrow type of `false`
 * ```ts
 * // true
 * type T = IsFalse<false>;
 * // false
 * type F1 = IsFalse<boolean>;
 * type F2 = IsFalse<"foobar">;
 * ```
 */
export type IsFalse<T> = [IsNever<T>] extends [true]
    ? false
    : [T] extends [null]
        ? false
    : [IsBoolean<T>] extends [true]
        ? [T] extends [false]
            ? true
            : false
        : false;



