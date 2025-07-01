import type {
    AsString,
    AsUnion,
    IsSubstring,
    IsWideType,
    Narrowable,
    Or,
} from "inferred-types/types";

export type StringLiteralType = string | number | boolean;

type CompareTuple<
    TContent extends readonly unknown[],
    TComparator
> = Or<{
    [K in keyof TContent]: [TContent[K]] extends [TComparator]
        ? true
        : false
}>;

/**
 * **Contains**`<TContent, TComparator>`
 *
 * Checks whether `TContent` _extends_ the type of `TComparator`:
 *
 * - when `TContent` is an array/tuple then each item is compared to `TComparator`
 * - if `TContent` is a string or numeric type then it will report on whether `TComparator`
 * has been found as a string subset
 *
 * **Related:** `NarrowlyContains`
 */
export type Contains<
    TContent extends string | number | readonly unknown[],
    TComparator,
> = [TContent] extends [string | number]
    ? Or<[IsWideType<TContent>, IsWideType<TComparator>]> extends true
        ? boolean
        : IsSubstring<`${TContent}`, AsString<AsUnion<TComparator>>>

    : [TContent] extends [readonly unknown[]]
        ? CompareTuple<TContent, AsUnion<TComparator>>
        : never;
