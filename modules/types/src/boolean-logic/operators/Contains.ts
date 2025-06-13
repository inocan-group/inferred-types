import type {
    AsString,
    AsUnion,
    IsWideType,
    Or,
    TupleToUnion,
} from "inferred-types/types";

export type StringLiteralType = string | number | boolean;

type ProcessStr<
    TContent extends string,
    TComparator,
> = IsWideType<TComparator> extends true
    ? boolean
    : TComparator extends readonly StringLiteralType[]
        ? ProcessStr<TContent, TupleToUnion<TComparator>>
        : TComparator extends StringLiteralType
            ? TContent extends `${string}${TComparator}${string}`
                ? true
                : false
            : false;

/**
 * Processes each node of the tuple
 * and then `or` the result to reach
 * single consensus
 */
type ProcessTuple<
    TContent extends readonly unknown[],
    TComparator,
> = Or<{
    [K in keyof TContent]: [TContent[K]] extends [TComparator]
        ? true
        : false
}>;

type PreProcess<
    TContent,
    TComparator,
> = TContent extends readonly unknown[]
    ? TComparator extends readonly unknown[]
        ? ProcessTuple<TContent, TupleToUnion<TComparator>>
        : ProcessTuple<TContent, TComparator>
    : TContent extends StringLiteralType
        ? TComparator extends readonly (string | number | boolean)[]
            ? ProcessStr<`${TContent}`, TupleToUnion<TComparator>>
            : ProcessStr<`${TContent}`, TComparator>
        : never;

/**
 * **Contains**`<TContent, TComparator>`
 *
 * Checks whether `TContent` _contains_ a value of `TComparator`:
 *
 * - when `TContent` is an array/tuple type then each item is compared to `TComparator`
 * - if `TContent` is a string or numeric type then it will report on whether `TComparator`
 * has been found as a string subset
 *
 * **Related:** `NarrowlyContains`
 */
export type Contains<
    TContent extends string | number | readonly unknown[],
    TComparator,
> = Or<[IsWideType<TContent>, IsWideType<TComparator>]> extends true
    ? boolean
    : TContent extends string | number
        ? IsSubstring<AsString<TContent>, AsString<AsUnion<TComparator>>>
        : PreProcess<TContent, TComparator>;

export type IsSubstring<
    TContent extends string,
    TFind extends string
> = TContent extends `${string}${TFind}${string}`
    ? true
    : false;
