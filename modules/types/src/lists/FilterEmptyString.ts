import type {  Increment,  Reverse, Slice, Negative } from "inferred-types/types";

/**
 * **FilterEmptyStrings**`<T>`
 *
 * Filters out any empty strings found in the tuple `T`.
 *
 * **Related:** `FilterEmptyStringsInTerminalPosition`, `Filter`
 */
type FilterEmptyStringsImpl<
    T extends readonly unknown[],
    R extends readonly unknown[] = []
> = T extends [
    infer Head,
    ...infer Rest extends readonly unknown[]
]
    ? Head extends ""
        ? FilterEmptyStringsImpl<Rest, R>
        : FilterEmptyStringsImpl<Rest, [...R, Head]>
: R;

export type FilterEmptyStrings<
    T extends readonly unknown[]
> = FilterEmptyStringsImpl<[...T]>;

type EmptyTailCount<
    T extends readonly unknown[],
    R extends readonly unknown[] = Reverse<T>,
    C extends number = 0
> = R extends [
    infer Head,
    ...infer Rest extends readonly unknown[]
]
    ? Head extends ""
        ? EmptyTailCount<
            T,
            Rest,
            Increment<C>
        >
    : C
: C
;

/**
 * **FilterEmptyStringsInTerminalPosition**`<T>`
 *
 * Removes all _leading_ or _trailing_ empty strings found in `T`
 * while keeping empty strings that exist in the interior.
 *
 * ```ts
 * // [ 1,2,"",3 ]
 * type T = FilterEmptyStringsInTerminalPosition<["",1,2,"",3,"",""]>;
 * ```
 *
 * **Related:** `FilterEmptyStrings`, `Filter`
 */
type FilterEmptyStringsInTerminalPositionImpl<
    T extends readonly unknown[],
    R extends readonly unknown[] =[]
> = T extends [
    infer Head,
    ...infer Rest extends readonly unknown[]
]
    ? Head extends ""
        ? R extends []
            ? FilterEmptyStringsInTerminalPositionImpl<Rest, R>
            : FilterEmptyStringsInTerminalPositionImpl<Rest, [...R, Head]>
        : FilterEmptyStringsInTerminalPositionImpl<Rest, [...R, Head]>
: Slice<R, 0, Negative<EmptyTailCount<R>>>;

export type FilterEmptyStringsInTerminalPosition<
    T extends readonly unknown[]
> = FilterEmptyStringsInTerminalPositionImpl<[...T]>;

