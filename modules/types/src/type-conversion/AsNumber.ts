import { StripWhile } from "inferred-types/types";

/**
 * **ParseInt**`<T>`
 *
 * Converts a known string literal representation of a number
 * to an actual number.
 */
export type ParseInt<T> = T extends `${infer N extends number}`
    ? N
    : never;

/**
 * **AsNumber**`<T>`
 *
 * Returns a _number_ for `T` where `T` extends a _number_ or `${number}` type; otherwise
 * return _never_. Literal types are preserved.
 *
 * ```ts
 * // 4
 * type Num = AsNumber<"4">;
 * ```
 * **Related:** `ToNumber`
 */
export type AsNumber<T> = T extends number
    ? T
    : T extends `${number}`
        ? T extends `-${infer Numeric}`
            ? ParseInt<
                `-${StripWhile<Numeric, "0">}`
            >
            : ParseInt<
                StripWhile<T, "0">
            >
        : never;

