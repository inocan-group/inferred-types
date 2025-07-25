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

// gets non-variadic length but ignores optional props
type NonVariadicRequired<
    T extends readonly unknown[],
    F extends readonly unknown[] = [],
> = [] extends T
    ? F["length"]
    : Mutable<T> extends [infer Explicit, ...infer REST]
        ? NonVariadicRequired<
            REST,
            [...F, Explicit]
        >
        : F["length"];


/**
 * **GetRequiredElementCount**`<T>`
 *
 * counts only the **required** elements of `T`
 *
 * **Related:** `GetOptionalElementCount`, `TupleMeta`
 */
export type GetRequiredElementCount<T extends readonly unknown[]> = NonVariadicRequired<T>;

export type SuperBad<T extends readonly unknown[]> = Required<{
    [K in keyof T]: {} extends Pick<T, K>
        ? true
        : false
}>;

/**
 * **GetOptionalElementCount**`<T>`
 *
 * counts only the **optional** elements of `T` (e.g., those with the `?` modifier).
 *
 * **Related:** `GetRequiredElementCount`, `TupleMeta`, `MakeOptional`
 */
export type GetOptionalElementCount<T extends readonly unknown[]>
  = Subtract<
      GetNonVariadicLength<T>,
      GetRequiredElementCount<T>
  >;


/**
 * **ExtractOptionalElements**`<T>`
 *
 * returns a tuple of the **optional** elements found in `T`
 *
 * ```ts
 * // [ string?, number? ]
 * type Test = ExtractOptionalElements<[1,42, string?, number?]>;
 * ```
 *
 * **Related:** `ExtractRequiredElements`
 */
export type ExtractOptionalElements<
    T extends readonly unknown[],
    R extends readonly unknown[] = Required<ExcludeVariadicTail<T>>
> = R extends readonly [
    ...FixedLengthArray<unknown, GetRequiredElementCount<T>>,
    ...infer Rest
]
    ? Partial<Rest>
    : [];


export type ExtractRequiredElements<
    T extends readonly unknown[],
    R extends readonly unknown[] = Required<ExcludeVariadicTail<T>>
> = R extends readonly [
    ...infer Leading,
    ...FixedLengthArray<unknown, GetOptionalElementCount<T>>,
]
    ? Leading
    : [];

/**
 * **ExcludeVariadicTail**`<T>`
 *
 * Removes the variadic tail found on the tuple `T`.
 *
 * - if no variadic tuple is found on `T` then it is just passed through
 *
 * ```ts
 * // [ string, number? ]
 * type Test = ExcludeVariadicTail<[string, number?, ...string[]]>;
 * ```
 */
export type ExcludeVariadicTail<
    T extends readonly unknown[]
> = HasVariadicTail<T> extends true
? Slice<T, 0, GetNonVariadicLength<T>>
: T;

/**
 * **VariadicType**`<T>`
 *
 * Returns the element type of a tuple's variadic tail.
 *
 * - Returns `never` if the tuple has no variadic tail
 * - For tuples with variadic tails like `[1, 2, ...number[]]`, returns the element type (`number`)
 * - Empty tuples and tuples with only optional elements return `never`
 * - Wide array types like `string[]`, or `number[]` -- _which are innately variadic types_ -- will correctly
 * report their variadic type as `string`, `number`, etc.
 *
 * **Related:** `GetNonVariadicLength`, `NonVariadic`, `VariadicType`
 */
export type VariadicType<
    T extends readonly unknown[],
    R extends readonly unknown[] = [...T]
> = HasVariadicTail<R> extends true
        ? R extends readonly [
            ...ExcludeVariadicTail<R>,
            ...infer Rest
        ]
            ? Rest extends (infer Type)[]
                ? Type
                : never
            : unknown
        : R extends (infer Type)[]
            ? any[] extends R
                ? Type
                : never
            : never;
