import type { Chars, IsEqual, IsStringLiteral, Join } from "inferred-types/types";

/**
 * **StripLeadingStringTemplate**`<T>`
 *
 * Strips any existing `${string}` type when it starts the type T.
 *
 * ```ts
 * // `FooBar${string}`
 * type Foobar = StripLeadingStringTemplate<`${string}Foobar${string}`>
 * ```
 */
export type StripLeadingStringTemplate<T extends string> = T extends `${infer First}${infer Rest}`
    ? IsEqual<First, string> extends true
        ? StripLeadingStringTemplate<Rest>
        : T
    : never;

/**
 * **StripTrailingStringTemplate**`<T>`
 *
 * Strips any existing `${string}` type when ity terminates the type T.
 *
 * ```ts
 * // `${string}FooBar`
 * type Foobar = StripTailingStringTemplate<`${string}Foobar${string}`>
 * ```
 */
export type StripTrailingStringTemplate<T extends string> = IsStringLiteral<T> extends true
    ? Join<Chars<T>>
    : never;

/**
 * **StripSurroundingStringTemplate**`<T>`
 *
 * Strips any existing `${string}` type when it _leads_ or _terminates_ the type T.
 *
 * ```ts
 * // `FooBar`
 * type Foobar = StripTailingStringTemplate<`${string}Foobar${string}`>
 * ```
 */
export type StripSurroundingStringTemplate<T extends string> = IsStringLiteral<T> extends true
    ? StripTrailingStringTemplate<
        StripLeadingStringTemplate<T>
    >
    : never;
