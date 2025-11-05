import { StartsWith } from "inferred-types/types";
import { SortByLength } from "types/lists";
import { ToStringArray } from "types/type-conversion";

type FindMatch<
    T extends string,
    U extends readonly string[]
> = U extends [
    infer Head extends string,
    ...infer Rest extends readonly string[]
]
    ? StartsWith<T,Head> extends true
        ? Head
        : FindMatch<T, Rest>
: false;

/**
 * **LongestToStartWith**`<T>`
 *
 * Given some text `T`, this utility iterates over a set of strings
 * which _may_ match the start of `T`. If there are 1 or matches where
 * `U` _starts with_ `T` then the **longest** of these will be returned.
 *
 * If no matches are found then `false` is returned.
 */
export type LongestToStartWith<
    T extends string,
    U extends readonly (string|number)[]
> = ToStringArray<U> extends infer Arr extends readonly string[]
    ? SortByLength<Arr> extends infer Sorted extends readonly string[]
        ? FindMatch<T, Sorted>
        : never
    : never;
