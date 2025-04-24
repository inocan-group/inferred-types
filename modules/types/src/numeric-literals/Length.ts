import type {
    IsUnion,
    IsWideType,
    Max,
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
 * - a _number_ (it will provide the number of digits, excluding `-` if present)
 *
 * ```ts
 * type Three = Length<[ "a", "b", "c" ]>;
 * ```
 */
export type Length<
    T extends readonly any[] | string | number,
> = T extends readonly any[]
    ? T["length"]
    : IsWideType<T> extends true
    ? number
    : T extends number
    ? _Length<StripLeading<`${T}`, "-">>
    : T extends string
    ? _Length<T>
    : never;

type RequiredPrefixLength<T extends readonly unknown[], Count extends unknown[] = []> =
    T extends readonly [infer First, ...infer Rest]
    ? undefined extends First // handle optional
    ? Count['length']
    : RequiredPrefixLength<Rest, [...Count, 1]>
    : Count['length'];


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
export type MinLength<T extends readonly unknown[]> =
    T extends readonly [...infer Head, ...infer Tail]
    ? Tail extends []
    ? Head['length']
    : // If it has a spread (rest), count how many required elements are in front
    RequiredPrefixLength<T>
    : 0;

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
export type MaxLength<T extends readonly unknown[]> = number extends T['length']
    ? number
    : IsUnion<T['length']> extends true
        ? MaxUnion<UnionToTuple<T['length']>>
        : T['length'];



