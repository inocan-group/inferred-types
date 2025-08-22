import type { AlphanumericChar, IsNull } from "inferred-types/types";

type Combine<T extends string, U extends string | null> = IsNull<U> extends true
    ? T
    : T | U;

type TestAlphanumeric<
    T extends string,
    U extends string | null
> = T extends `${infer Head extends string}${infer Rest}`
    ? Head extends Combine<AlphanumericChar, U>
        ? TestAlphanumeric<Rest, U>
        : false
    : true;

/**
 * **IsAlphanumeric**`<T,[U]>`
 *
 * Boolean operator which tests that all characters in `T` are alpha-numeric.
 *
 * - if you want to add some additional characters which pass validation you can add
 * a string or _string union_ type as `U`.
 *
 * **Related:**
 * - `AlphaNumericChar`
 * - `ValidateAlphanumeric`
 */
export type IsAlphanumeric<
    T extends string,
    U extends string | null = null
> = string extends T
    ? boolean
    : string extends U
        ? IsAlphanumeric<T> extends true
            ? true
            : boolean
        : TestAlphanumeric<T, U>;
