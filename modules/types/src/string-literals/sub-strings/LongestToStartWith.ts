import type { StartsWith } from "inferred-types/types";
import type { SortByLength } from "types/lists";
import type { ToStringArray } from "types/type-conversion";

type FindMatch<
    T extends string,
    U extends readonly string[]
> = U extends [
    infer Head extends string,
    ...infer Rest extends readonly string[]
]
    ? StartsWith<T, Head> extends true
        ? Head
        : FindMatch<T, Rest>
    : false;

/**
 * **LongestToStartWith**`<T, U>`
 *
 * Given some text `T`, this utility iterates over a set of candidate strings `U`
 * which _may_ match the start of `T`. If there are 1 or more matches where
 * `T` _starts with_ any element in `U`, then the **longest** of these will be returned.
 *
 * If no matches are found then `false` is returned.
 *
 * @example
 * ```ts
 * // Returns "Foo" (longest match)
 * type Result = LongestToStartWith<"FooBar", ["F", "Fo", "Foo"]>;
 *
 * // Returns never (no match)
 * type NoMatch = LongestToStartWith<"FooBar", ["X", "Y", "Z"]>;
 * ```
 */
export type LongestToStartWith<
    T extends string,
    U extends readonly (string | number)[]
> = ToStringArray<U> extends infer Arr extends readonly string[]
    ? SortByLength<Arr> extends infer Sorted extends readonly string[]
        ? FindMatch<T, Sorted>
        : never
    : never;
