import type {
    And,
    AsArray,
    AsString,
    AsUnion,
    Extends,
    IsEqual,
    IsNull,
    IsSubstring,
    IsUndefined,
    IsWideType,
    Or,
    Some,
} from "inferred-types/types";

export type StringLiteralType = string | number | boolean;

type CompareTuple<
    TContent extends readonly unknown[],
    TComparator,
    TOp extends "auto" | "extends" | "equals"
> = Or<{
    [K in keyof TContent]: TOp extends "equals"
        ? Some<AsArray<TComparator>, "equals", TContent[K]>
        : TOp extends "extends"
            ? [TContent[K]] extends [TComparator]
                ? true
                : false
        : Or<[
            IsNull<TComparator>,
            IsNull<TContent[K]>,
            IsUndefined<TComparator>,
            IsUndefined<TContent[K]>
        ]> extends true
            ? IsEqual<TContent[K],TComparator>
            : [TContent[K]] extends [TComparator]
                ? true
                : false
}>;

/**
 * **Contains**`<TContent, TComparator, [TOp]>`
 *
 * Checks whether `TContent` _extends_ the type of `TComparator`:
 *
 * - when `TContent` is an array/tuple
 *      - each item is compared to `TComparator`
 *      - by default the comparison operator will "extends" except for `null` and `undefined`
 *      which we will use "equals" so that these two similar variants can be kept separate
 *      - if you would like to modify the comparison operator you can set `TOp`, values are:
 *          - `auto` - this is the default
 *          - `extends` - uses _extends_ including with "null" and "undefined"
 *          - `equals` - uses the _equals_ operator for all comparisons
 * - if `TContent` is a string or numeric type then it will report on whether `TComparator`
 * has been found as a string subset
 *
 * **Related:** `NarrowlyContains`
 */
export type Contains<
    TContent extends string | number | readonly unknown[],
    TComparator,
    TOp extends "auto" | "extends" | "equals" = "auto"
> = [TContent] extends [string | number]
    ? Or<[IsWideType<TContent>, IsWideType<TComparator>]> extends true
        ? boolean
        : IsSubstring<`${TContent}`, AsString<AsUnion<TComparator>>>

    : [TContent] extends [readonly unknown[]]
        ? CompareTuple<TContent, AsUnion<TComparator>, TOp>
        : never;
