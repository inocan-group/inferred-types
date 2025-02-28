import type { AfterFirst, Compare, First, If, IsEqual, NumberLike, Or } from "inferred-types/types";

type FindAcc<
    TList extends readonly unknown[],
    TOp extends "extends" | "equals" | "startsWith" | "endsWith" | "lessThan" | "greaterThan",
    TComparator,
    TDeref extends string | number | null,
> = [] extends TList
    ? undefined
    : TDeref extends keyof First<TList>
        ? If<
            Compare<First<TList>[TDeref], TOp, TComparator>,
            First<TList>,
            FindAcc<AfterFirst<TList>, TOp, TComparator, TDeref>
        >
        : If<
            Compare<First<TList>, TOp, TComparator>,
            First<TList>,
            FindAcc<AfterFirst<TList>, TOp, TComparator, TDeref>
        >;

/**
 * **Find**`<TList,TOp,TComparator,[TDeref]>`
 *
 * Type utility used to find the first value in `TList` which _equals_ `TValue`.
 * Will return _undefined_ if no matches found.
 *
 * - use **FindExtends** if you want a more permissive match
 * - by default, values in `TList` will be compared directly but you can _dereference_
 * array and object properties with `TIndex` if you want to compare on a child property
 *
 * ```ts
 * type List = [ { id: 1, value: "hi" }, { id: 2, value: "bye" } ]
 * // { id: 1; value: "hi" }
 * type T = Find<List, 1, "id">
 * ```
 *
 * **Related**: `FindExtends`
 */
export type Find<
    TList extends readonly unknown[],
    TOp extends "extends" | "equals" | "startsWith" | "endsWith" | "lessThan" | "greaterThan",
    TComparator extends Or<[
        IsEqual<TOp, "startsWith">,
        IsEqual<TOp, "endsWith">,
    ]> extends true
        ? string
        : Or<[IsEqual<TOp, "lessThan">, IsEqual<TOp, "greaterThan">]> extends true
            ? NumberLike
            : unknown,
    TDeref extends string | number | null = null,
> = FindAcc<TList, TOp, TComparator, TDeref>;
