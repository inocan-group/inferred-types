import type { FixedLengthArray, IsEqual, IsNotEqual, Mutable,  Slice, Subtract } from "inferred-types/types";

/** Does T have at least one fixed (non-variadic) element? */
type HasFixedHead<T extends readonly unknown[]>
  = Exclude<keyof T, keyof any[]> extends never ? false : true;

/**
 * **HasVariadicTail**`<T>`
 *
 * Boolean operator which tests whether the tuple `T` concludes with
 * a _variadic_ type.
 *
 * - **Note**: while all wide type arrays like `number[]` or even `[...number[]]` (
 * which are the same type) are by nature _variadic_ this utility will return `false`
 * for wide types so we can isolate only literal types that have variadic tails.
 *
 * **Related:**
 * - `GetNonVariadicLength`, `NonVariadic`, `VariadicType`
 * - `IsWideArray`, `IsLiteralArray`
 */
export type HasVariadicTail<T extends readonly unknown[]>
  = number extends T["length"] // tuple-with-rest OR wide array
      ? HasFixedHead<T> extends true // exclude wide arrays (no fixed head)
          ? (T extends readonly [...infer _H, ...infer R]
              ? number extends R["length"] // the tail is variadic
                  ? true
                  : false
              : false)
          : false
      : false;

/**
 * **HasOptionalElements**
 *
 * Boolean operator which detects whether `T` has optional elements (e.g., marked with the
 * `?` modifier) within it's set of elements.
 *
 * **Related:** `AllOptionalElements`
 */
export type HasOptionalElements<T extends readonly unknown[]> = IsNotEqual<Required<T>, T>;

/**
 * **AllOptionalElements**
 *
 * Boolean operator which detects whether `T`'s elements are ALL designed as optional (e.g., marked with the
 * `?` modifier).
 *
 * **Related:** `HasOptionalElements`
 */
export type AllOptionalElements<T extends readonly unknown[]> = IsEqual<Partial<T>, T>

/**
 * **GetNonVariadicLength**`<T>`
 *
 * Determines the length of the tuple when the variadic tail has been stripped off.
 *
 * - if `T` is not variadic then this will simply report the length of the tuple`
 * - _optional_ elements (e.g., marked with the `?` modifier) are always included in the length
 */
export type GetNonVariadicLength<
    T extends readonly unknown[],
    F extends readonly unknown[] = [],
> = [] extends Required<T>
    ? F["length"]
    : Required<Mutable<T>> extends [infer Explicit, ...infer REST]
        ? GetNonVariadicLength<
            REST,
            [...F, Explicit]
        >
        : F["length"];

type GTA<
    T extends readonly unknown[],
    F extends readonly unknown[] = [],
> = [] extends T
    ? F["length"]
    : Mutable<T> extends [infer Explicit, ...infer REST]
        ? GTA<
            REST,
            [...F, Explicit]
        >
        : F["length"];

/** Split `T` into its fixed prefix; for wide arrays it’s `[]`. */
type FixedPrefix<T extends readonly unknown[]>
  = T extends readonly [...infer F, ...infer R]
      ? number extends R["length"] ? F : T
      : T;

/** Count the optional (`undefined`-including) elements in a tuple `F`. */
type _CountOptional<
    T extends readonly unknown[],
    Acc extends unknown[] = []
> = T extends readonly [infer H, ...infer R]
    ? _CountOptional<
        R,
        undefined extends H ? [...Acc, 1] : Acc
    >
    : Acc["length"];

export type GetRequiredElementCount<T extends readonly unknown[]> = GTA<T>;

export type SuperBad<T extends readonly unknown[]> = Required<{
    [K in keyof T]: {} extends Pick<T, K>
        ? true
        : false
}>;

/**
 * **GetOptionalElementCount**`<T>`
 *
 * Counts how many elements in the **fixed (non-variadic) prefix** of `T`
 * are marked optional (`?`). Variadic tails (`...X[]`) are ignored.
 * Wide arrays (`string[]`, `[...T[]]`, etc.) return `0`.
 */
export type GetOptionalElementCount<T extends readonly unknown[]>
  = Subtract<
      GetNonVariadicLength<T>,
      GetRequiredElementCount<T>
  >;

export type ExtractOptionalElements<T extends readonly unknown[]> = Slice<Required<T>,3>

/**
 * **ExcludeVariadicTail**`<T>`
 */
export type ExcludeVariadicTail<
    T extends readonly unknown[]
> = T extends [
    ...FixedLengthArray<
        unknown,
        GetRequiredElementCount<T>
    >,
    ...infer Rest
]
    ? [GetNonVariadicLength<T>, ...Rest]
    : [];

type X = GTA<[string, boolean?, ...number[]]>;
//   ^?

/**
 * **VariadicType**`<T>`
 *
 * Returns the element type of a tuple's variadic tail.
 *
 * - Returns `never` if the tuple has no variadic tail
 * - For tuples with variadic tails like `[1, 2, ...number[]]`, returns the element type (`number`)
 * - Empty tuples and tuples with only optional elements return `never`
 *
 * **Related:** `GetNonVariadicLength`, `NonVariadic`, `VariadicType`
 */
export type VariadicType<
    T extends readonly unknown[],
    R extends readonly unknown[] = Required<T>
>
    = HasVariadicTail<Required<T>> extends true
        ? Slice<
            T,
            ExcludeVariadicTail<R>["length"]
        >
        : never;
