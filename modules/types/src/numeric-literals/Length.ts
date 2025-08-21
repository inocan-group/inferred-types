import type {
    As,
    Err,
    IsAny,
    IsFalse,
    IsNever,
    IsNumericLiteral,
    IsUnion,
    IsWideType,
    Max,
    Min,
    StringLength,
    StripChars,
    StripLeading,
    UnionToTuple,
} from "inferred-types/types";

type _Length<
    T extends string,
    TCount extends number[] = []
> = T extends `${string}${infer Tail}`
    ? _Length<Tail, [...TCount, 0]>
    : TCount["length"];

/**
 * Utility type which returns the length of:
 *
 * - an _array_ (provides the number of elements)
 * - an _object_ (provides the number of keys)
 * - a _string_ (provides the number of chars)
 * - a _number_ (it will provide the number of digits, excluding `-` and/or `.` if present)
 *
 * ```ts
 * type Three = Length<[ "a", "b", "c" ]>;
 * type AlsoThree = Length<"abc">;
 * ```
 *
 * #### Note:
 *
 * - any _wide type_ by default returns the wide `number` type
 * - if you'd prefer to an error returned, set `U` to true and
 * an error of the type/subtype `invalid-type/wide`
 */
export type Length<
    T extends readonly unknown[] | string | number,
    U extends boolean = false
> = [IsAny<T>] extends [true]
    ? IsFalse<U> extends true
        ? number
        : Err<`invalid-type/wide`>
: number extends T
    ? IsFalse<U> extends true
        ? number
        : Err<`invalid-type/wide`>
    : T extends number
        ? StripChars<`${T}`, "." | "-"> extends infer Numeric extends string
            ? Length<Numeric>
            : never
: T extends string
    ? string extends T
        ? IsFalse<U> extends true
            ? number
            : Err<`invalid-type/wide`>
        : StringLength<T>

: T extends readonly unknown[]
    ? number extends T["length"]
        ? IsFalse<U> extends true
            ? number
            : Err<`invalid-type/wide`>
        : T["length"] extends number
            ? T["length"]
            : IsFalse<U> extends true
            ? number
            : Err<`invalid-type/wide`>

: never;

type RequiredPrefixLength<T extends readonly unknown[], Count extends unknown[] = []>
    = T extends readonly [infer _First, ...infer Rest]
        ? RequiredPrefixLength<Rest, [...Count, 1]>
        : Count["length"];

/**
 * **MinLength**`<T>`
 *
 * Determines what the _minimum_ length a given type has.
 *
 * ```ts
 * // 0
 * type Zero = MinLength<[...readonly string[]]>;
 * // 1
 * type One = MinLength<[string, ...readonly string[]]>;
 * ```
 *
 * **Related:** `Length`, `MaxLength`, `TupleMeta`
 */
export type MinLength<T extends readonly unknown[]> = IsNumericLiteral<Length<T>> extends true
    ? As<
        IsUnion<Length<T>> extends true
            ? UnionToTuple<Length<T>> extends readonly number[]
                ? Min<UnionToTuple<Length<T>>>
                : never
            : Length<T>,
        number
    >

    : As<
        T extends readonly [...infer Head, ...infer Tail]
            ? Tail extends []
                ? Head["length"]
                : RequiredPrefixLength<T> // If it has a spread (rest), count how many required elements are in front
            : 0,
        number
    >;

type MaxUnion<
    T extends readonly unknown[]
> = T extends readonly number[]
    ? Max<T>
    : never;

/**
 * **MaxLength**`<T>`
 *
 * Determines the _maximum_ length that a given tuple can be at runtime.
 *
 * - when the tuple has a _variatic_ type in the last position it's length is
 * not known and this utility will report `number` instead of a numeric literal
 *
 * ```ts
 * // 1
 * type One = MaxLength<[string]>;
 * // 2
 * type Two = MaxLength<[string, number?]>;
 * // number
 * type Infinite = MaxLength<[string, ...string[]]>;
 * ```
 *
 * **Related:** `Length`, `MinLength`, `TupleMeta`
 */
export type MaxLength<T extends readonly unknown[]> = number extends T["length"]
    ? number
    : IsUnion<T["length"]> extends true
        ? MaxUnion<UnionToTuple<T["length"]>>
        : T["length"];
