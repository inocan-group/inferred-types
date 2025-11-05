import type {
    AsString,
    AsUnion,
    DoesExtend,
    IsEqual,
    IsNull,
    IsSubstring,
    IsUndefined,
    IsUnion,
    IsWideType,
} from "inferred-types/types";

export type StringLiteralType = string | number | boolean;

type Cmp<
    TContent extends readonly unknown[],
    TComparator,
    TOp extends "auto" | "extends" | "equals",
> = TContent extends [
    infer Head,
    ...infer Rest
]
    ? [TOp] extends[ "equals"]
        ? [IsEqual<Head, TComparator>] extends [true]
            ? true
            : [IsWideType<Head>] extends [true]
                ? Cmp<Rest, TComparator, TOp> // Skip bidirectional check for wide types
                : [IsUnion<Head>] extends [true]
                    // When Head is a union, TComparator extending Head means it's a member
                    ? [TComparator] extends [Head]
                        ? [Head] extends [TComparator]
                            ? Cmp<Rest, TComparator, TOp>  // Bidirectional - Head collapses to TComparator (not a union member match)
                            : true  // Unidirectional - TComparator is a member of the union
                        : Cmp<Rest, TComparator, TOp>
                    // When Head is not a union, use bidirectional extends for equality
                    : [TComparator] extends [Head]
                        ? [Head] extends [TComparator]
                            ? true  // Both directions extend - types are equal, found it!
                            : Cmp<Rest, TComparator, TOp>  // Only one direction - not equal, continue
                        : Cmp<Rest, TComparator, TOp>
        : [TOp] extends ["extends"]
            ? [DoesExtend<Head, TComparator>] extends [true]
                ? true
                : Cmp<Rest, TComparator, TOp>
            : [TOp] extends ["auto"]
                ? [IsNull<TComparator>] extends [true]
                    ? [IsNull<Head>] extends [true]
                        ? true
                        : Cmp<Rest, TComparator, TOp>
                    : [IsUndefined<TComparator>] extends [true]
                        ? IsUndefined<Head> extends true
                            ? true
                            : Cmp<Rest, TComparator, TOp>
                        : [DoesExtend<Head, TComparator>] extends [true]
                            ? true
                            : Cmp<Rest, TComparator, TOp>
                : never
    : false;

/**
 * **Contains**`<TContent, TComparator, [TOp]>`
 *
 * Checks whether `TContent` _extends_ (or _equals_) the type of `TComparator`:
 *
 * - when `TContent` is an array/tuple
 *      - each item is compared to `TComparator`
 *      - by default the comparison operator will "extends" except for `null` and `undefined`
 *      which we will use "equals" so that these two similar variants can be kept separate
 *      - if you would like to modify the comparison operator you can set `TOp`, values are:
 *          - `auto` (_the default_) - primarily uses an _extends_ comparison but with
 *            `null` and `undefined` it will use strict equality.
 *          - `extends` - uses _extends_ including with "null" and "undefined"
 *          - `equals` - uses the _equals_ operator for all comparisons
 * - if `TContent` is a string or numeric type then it will report on whether `TComparator`
 * has been found as a string subset
 *
 * **Related:**
 * - `NarrowlyContains`,
 * - `ContainsSome`, `ContainsAll`
 */
export type Contains<
    TContent extends string | number | readonly unknown[],
    TComparator,
    TOp extends "auto" | "extends" | "equals" = "auto"
> = [string] extends [TContent]
    ? boolean
    : [number] extends [TContent]
        ? boolean
        : [TContent] extends [string | number]
            ? [IsWideType<TComparator>] extends [true]
                ? boolean
                : IsSubstring<`${TContent}`, AsString<AsUnion<TComparator>>>
            : [TContent] extends [readonly unknown[]]
                ? Cmp<TContent, TComparator, TOp>
                : never;
