import type {
    FixedLengthArray,
    IsAny,
    IsEqual,
    IsNever,
    IsNotEqual,
    Mutable,
    Not,
    NumericRange,
    Or,
    Slice,
    Subtract
} from "inferred-types/types";

/** Does T have at least one fixed (non-variadic) element? */
type HasFixedHead<T extends readonly unknown[]>
  = Exclude<keyof T, keyof any[]> extends never ? false : true;

/**
 * **SplitAtVariadic**`<T>`
 *
 * Split T into:
 *  - Prefix: whatever remains after removing the maximal fixed suffix
 *  - Suffix: the maximal fixed suffix (elements guaranteed to be present at the end)
 *
 * For example:
 *  - SplitAtVariadic<[...string[], 1, 2]>  ->  [[...string[]], [1, 2]]
 *  - SplitAtVariadic<[1, ...string[], 2]>  ->  [[1, ...string[]], [2]]
 *  - SplitAtVariadic<[1, 2]>               ->  [[], [1, 2]]
 *  - SplitAtVariadic<string[]>             ->  [string[], []]
 */
export type SplitAtVariadic<
    T extends readonly unknown[],
    Acc extends readonly unknown[] = [],
    Depth extends readonly unknown[] = []
>
  = Depth["length"] extends 30 // Add depth limit to prevent unbounded recursion
      ? [T, Acc] // Fallback when depth exceeded
      : T extends readonly [...infer P, infer L]
          ? SplitAtVariadic<P, [L, ...Acc], [...Depth, unknown]>
          : [T, Acc];

/**
 * **HasVariadicTail**`<T>`
 *
 * Boolean operator which tests whether the tuple `T` concludes with
 * a _variadic_ type.
 *
 * - **Note**: while all wide type arrays like `number[]` or even `[...number[]]` (
 * which coincidentally are the same type) are by nature _variadic_. This utility,
 * however, will return `false` for wide types so we can isolate only literal types
 * that have variadic tails.
 *
 * **Related:**
 * - `HasVariadicHead`, `HasVariadicInterior`, `IsVariadicArray`
 * - `VariadicType`, `GetNonVariadicLength`
 */
export type HasVariadicTail<
    T extends readonly unknown[],
    R extends readonly unknown[] = [...T]
> = [IsAny<T>] extends [true]
    ? false
    : [IsNever<T>] extends [true]
        ? false
        : IsVariadicArray<R> extends true
            ? HasFixedHead<R> extends true
                ? SplitAtVariadic<R> extends [...any[], []]
                    ? true
                    : false
                : false
            : false;

/**
 * **HasVariadicHead**`<T>`
 *
 * Tests whether if `T` starts with a variadic type with a fixed
 * type at the end.
 *
 * - **Note**: while all wide type arrays like `number[]` or even `[...number[]]` (
 * which coincidentally are the same type) are by nature _variadic_. This utility,
 * however, will return `false` for wide types so we can isolate only literal types
 * that have variadic tails.
 *
 * **Related:**
 * - `HasVariadicTail`, `HasVariadicInterior`, `IsVariadicArray`
 * - `VariadicType`, `GetNonVariadicLength`
 */
export type HasVariadicHead<
    T extends readonly unknown[],
    R extends readonly unknown[] = [...T]
> = [IsAny<T>] extends [true]
    ? false
    : [IsNever<T>] extends [true]
        ? false
        : IsVariadicArray<R> extends true
            ? HasFixedHead<R> extends true
                ? false
                : SplitAtVariadic<R> extends [...unknown[], []]
                    ? false
                    : true
            : false;

/**
 * **HasVariadicInterior**`<T>`
 *
 * tests whether `T` has a _variadic_ element in the _interior_ of
 * the array.
 *
 * **Related:** `HasVariadicHead`, `HasVariadicTail`, `IsVariadicArray`
 */
export type HasVariadicInterior<
    T extends readonly unknown[],
    R extends readonly unknown[] = [...T]
> = [IsAny<T>] extends [true]
    ? false
    : [IsNever<T>] extends [true]
        ? false
        : IsVariadicArray<R> extends true
            ? Not<Or<[
                HasVariadicHead<R>,
                HasVariadicTail<R>,
            ]>> extends true
                ? SplitAtVariadic<R> extends [...unknown[], []]
                    ? false
                    : true
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
export type HasOptionalElements<T extends readonly unknown[]> = GetOptionalElementCount<T> extends 0
? false
: number extends GetOptionalElementCount<T>
    ? boolean
    : true;
// IsNotEqual<Required<T>, T>;

/**
 * **AllOptionalElements**
 *
 * Boolean operator which detects whether `T`'s elements are ALL designed as optional (e.g., marked with the
 * `?` modifier).
 *
 * **Related:** `HasOptionalElements`
 */
export type AllOptionalElements<T extends readonly unknown[]> = IsEqual<Partial<T>, T>;

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
    Depth extends readonly unknown[] = []
> = Depth["length"] extends 25 // Add depth limit to prevent unbounded recursion
    ? F["length"] // Fallback when depth exceeded
    : [] extends Required<T>
        ? F["length"]
        : Required<Mutable<T>> extends [infer Explicit, ...infer REST]
            ? GetNonVariadicLength<
                REST,
                [...F, Explicit],
                [...Depth, unknown]
            >
            : F["length"];

// gets non-variadic length but ignores optional props
type NonVariadicRequired<
    T extends readonly unknown[],
    F extends readonly unknown[] = [],
    Depth extends readonly unknown[] = []
> = Depth["length"] extends 25 // Add depth limit to prevent unbounded recursion
    ? F["length"] // Fallback when depth exceeded
    : [] extends T
        ? F["length"]
        : Mutable<T> extends [infer Explicit, ...infer REST]
            ? NonVariadicRequired<
                REST,
                [...F, Explicit],
                [...Depth, unknown]
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

/**
 * **GetOptionalElementCount**`<T>`
 *
 * counts only the **optional** elements of `T` (e.g., those with the `?` modifier).
 *
 * **Related:** `GetRequiredElementCount`, `TupleMeta`, `MakeOptional`
 */
export type GetOptionalElementCount<T extends readonly unknown[]>
  = T extends readonly unknown[]
      ? T["length"] extends number
          ? GetNonVariadicLength<T> extends infer NonVarLen extends number
              ? GetRequiredElementCount<T> extends infer ReqLen extends number
                  ? Subtract<NonVarLen, ReqLen>
                  : 0 // fallback when required count computation fails
              : 0 // fallback when non-variadic length computation fails
          : 0 // fallback for infinite length arrays
      : never;

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
 * **Related:** `ExtractRequiredElements`, `ExtractOptionalKeys`
 */
export type ExtractOptionalElements<
    T extends readonly unknown[],
    R extends readonly unknown[] = Required<DropVariadicTail<T>>
> = R extends readonly [
    ...FixedLengthArray<unknown, GetRequiredElementCount<T>>,
    ...infer Rest
]
    ? Partial<Rest>
    : [];

export type ExtractOptionalKeys<
    T extends readonly unknown[],
    R extends readonly unknown[] = Required<DropVariadicTail<T>>
> = NumericRange<
    Subtract<R["length"], GetOptionalElementCount<R>>,
    R["length"]
>;

export type ExtractRequiredElements<
    T extends readonly unknown[],
    R extends readonly unknown[] = Required<DropVariadicTail<T>>
> = R extends readonly [
    ...infer Leading,
    ...FixedLengthArray<unknown, GetOptionalElementCount<T>>,
]
    ? Leading
    : [];

/**
 * **DropVariadicTail**`<T>`
 *
 * Removes the variadic tail found on the tuple `T`.
 *
 * - if no variadic tuple is found on `T` then it is just passed through
 * as is
 *
 * ```ts
 * // [ string, number? ]
 * type Test = ExcludeVariadicTail<[string, number?, ...string[]]>;
 * ```
 */
export type DropVariadicTail<
    T extends readonly unknown[]
> = HasVariadicTail<T> extends true
    ? Slice<T, 0, GetNonVariadicLength<T>>
    : T;

/**
 * **IsVariadicArray**`<T>`
 *
 * Boolean operator which determines if this tuple/array is variadic.
 *
 * - unlike some other utilities, this does not distinguish between
 * variadic arrays with fixed type elements versus **wide** array types;
 * both will return `true`
 */
export type IsVariadicArray<T extends readonly unknown[]>
  = number extends T["length"]
      ? true
      : false;

/**
 * **DropVariadicHead**`<T>`
 *
 * Removes the variadic head found on the tuple `T`.
 *
 * - if no variadic head is found on `T` then it is just passed through
 *
 * ```ts
 * // [ string, number? ]
 * type Test = ExcludeVariadicHead<[...string[], string, number?]>;
 * ```
 */
export type DropVariadicHead<T extends readonly unknown[]>
= SplitAtVariadic<T> extends [infer Prefix extends readonly unknown[], infer Suffix extends readonly unknown[]]
    ? IsVariadicArray<Prefix> extends true
        ? HasFixedHead<Prefix> extends false
            ? Suffix
            : T
        : T
    : never;

/**
 * **DropVariadic**`<T>`
 *
 * Drops any variadic element found in `T` while retaining all the fixed length
 * elements.
 *
 * - if `T` has no variadic elements then it will be returned "as is"
 *
 * ```ts
 * // [1,2,3]
 * type Test = DropVariadic<[1,2,3, ...string[]]>;
 * ```
 *
 * **Related:** `DropVariadicHead`, `DropVariadicTail`, `IsVariadicArray`
 */
export type DropVariadic<T extends readonly unknown[]>
= IsVariadicArray<T> extends false
    ? T // Early return for non-variadic arrays
    : HasVariadicHead<T> extends true
        ? DropVariadicHead<T>
        : HasVariadicTail<T> extends true
            ? DropVariadicTail<T>
            : HasVariadicInterior<T> extends true
                ? SplitAtVariadic<T> extends [ ...infer Head, ...infer Tail ]
                    ? IsVariadicArray<Head> extends true
                        ? Tail extends readonly unknown[] ? Tail : never
                        : IsVariadicArray<Tail> extends true
                            ? Head extends readonly unknown[] ? Head : never
                            : T
                    : T
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
> = IsVariadicArray<R> extends true
    ? HasVariadicHead<R> extends true
        ? DropVariadicHead<R> extends infer DroppedHead extends readonly unknown[]
            ? R extends [...infer Head, ...DroppedHead]
                ? Head
                : never
            : never
        : HasVariadicTail<R> extends true
            ? DropVariadicTail<R> extends infer DroppedTail extends readonly unknown[]
                ? R extends [...DroppedTail, ...infer Tail]
                    ? Tail
                    : never
                : never
            : never
    : never;
