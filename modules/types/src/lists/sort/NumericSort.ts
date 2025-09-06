import type {
    As,
    AsNumericArray,
    Container,
    Get,
    IsEqual,
    IsStringLiteral,
    Reverse
} from "inferred-types/types";

/**
 * Optimized comparison using string representation to avoid Iterator recursion
 * This is more efficient than creating tuple arrays for comparison
 */
type NumLessThanOrEqual<A extends number, B extends number>
    = `${A}` extends `-${string}`
        ? `${B}` extends `-${string}`
            ? StringNumCompare<`${A}`, `${B}`> extends true | "equal" ? true : false
            : true // A is negative, B is positive, so A <= B
        : `${B}` extends `-${string}`
            ? false // A is positive, B is negative, so A > B
            : StringNumCompare<`${A}`, `${B}`> extends true | "equal" ? true : false;

type NumGreaterThan<A extends number, B extends number>
    = NumLessThanOrEqual<A, B> extends true
        ? false
        : true;

/**
 * String-based numeric comparison that's more efficient than Iterator approach
 */
type StringNumCompare<A extends string, B extends string>
    = A extends B ? "equal"
        : A extends `-${infer ANeg}`
            ? B extends `-${infer BNeg}`
                ? StringNumCompare<BNeg, ANeg> // Reverse comparison for negatives
                : true // A negative, B positive
            : B extends `-${string}`
                ? false // A positive, B negative
                : ComparePositive<A, B>;

type ComparePositive<A extends string, B extends string>
    = A extends `${infer _A1}${infer _A2}${infer _A3}${infer _A4}${infer ARest}`
        ? B extends `${infer _B1}${infer _B2}${infer _B3}${infer _B4}${infer BRest}`
            ? ComparePositive<ARest, BRest> // Continue comparing rest
            : false // A is longer, so A > B
        : B extends `${infer _B1}${infer _B2}${infer _B3}${infer _B4}${infer _BRest}`
            ? true // B is longer, so A < B
            : A extends `${infer A1}${infer A2}${infer A3}`
                ? B extends `${infer B1}${infer B2}${infer B3}`
                    ? CompareByDigits<`${A1}${A2}${A3}`, `${B1}${B2}${B3}`>
                    : false // A is longer
                : B extends `${infer _B1}${infer _B2}${infer _B3}`
                    ? true // B is longer
                    : A extends `${infer A1}${infer A2}`
                        ? B extends `${infer B1}${infer B2}`
                            ? CompareByDigits<`${A1}${A2}`, `${B1}${B2}`>
                            : false // A is longer
                        : B extends `${infer _B1}${infer _B2}`
                            ? true // B is longer
                            : CompareByDigits<A, B>; // Both single digit

type CompareByDigits<A extends string, B extends string>
    = A extends B ? "equal"
        : A extends `${infer AH}${infer AT}`
            ? B extends `${infer BH}${infer BT}`
                ? AH extends BH
                    ? CompareByDigits<AT, BT>
                    : CompareDigit<AH, BH>
                : false
            : true;

type CompareDigit<A extends string, B extends string>
    = A extends "0" ? true
        : A extends "1" ? B extends "0" ? false : true
            : A extends "2" ? B extends "0" | "1" ? false : true
                : A extends "3" ? B extends "0" | "1" | "2" ? false : true
                    : A extends "4" ? B extends "0" | "1" | "2" | "3" ? false : true
                        : A extends "5" ? B extends "0" | "1" | "2" | "3" | "4" ? false : true
                            : A extends "6" ? B extends "0" | "1" | "2" | "3" | "4" | "5" ? false : true
                                : A extends "7" ? B extends "0" | "1" | "2" | "3" | "4" | "5" | "6" ? false : true
                                    : A extends "8" ? B extends "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" ? false : true
                                        : A extends "9" ? B extends "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" ? false : true
                                            : false;

/**
 * Optimized filter that uses simpler comparison
 */
type FilterLessThanOrEqual<
    TVal extends number,
    TValues extends readonly number[],
    TOut extends readonly number[] = [],
>
    = TValues extends readonly [infer head extends number, ...infer tail extends readonly number[]]
        ? NumLessThanOrEqual<head, TVal> extends true
            ? FilterLessThanOrEqual<TVal, tail, [...TOut, head]>
            : FilterLessThanOrEqual<TVal, tail, TOut>
        : TOut;

type FilterGreaterThan<
    TVal extends number,
    TValues extends readonly number[],
    TOut extends readonly number[] = [],
>
    = TValues extends readonly [infer head extends number, ...infer tail extends readonly number[]]
        ? NumGreaterThan<head, TVal> extends true
            ? FilterGreaterThan<TVal, tail, [...TOut, head]>
            : FilterGreaterThan<TVal, tail, TOut>
        : TOut;

/**
 * Optimized quicksort that uses string comparison instead of Iterator
 */
type _Sort<
    TValues extends readonly number[],
    TReverse extends boolean,
> = TValues extends readonly [infer head extends number, ...infer tail extends readonly number[]]
    ? TReverse extends true
        ? [
            ..._Sort<
                FilterGreaterThan<head, tail>,
                TReverse
            >,
            head,
            ..._Sort<
                FilterLessThanOrEqual<head, tail>,
                TReverse
            >,
        ]
        : [
            ..._Sort<
                FilterLessThanOrEqual<head, tail>,
                TReverse
            >,
            head,
            ..._Sort<
                FilterGreaterThan<head, tail>,
                TReverse
            >,
        ]
    : [];

/**
 * Helper to filter containers by offset value comparison
 */
type FilterContainersLessThanOrEqual<
    TVal extends Container,
    TOffset extends string,
    TContainers extends readonly Container[],
    TOut extends readonly Container[] = []
> = TContainers extends readonly [infer Head extends Container, ...infer Tail extends readonly Container[]]
    ? NumLessThanOrEqual<
        As<Get<Head, TOffset>, number>,
        As<Get<TVal, TOffset>, number>
    > extends true
        ? FilterContainersLessThanOrEqual<TVal, TOffset, Tail, [...TOut, Head]>
        : FilterContainersLessThanOrEqual<TVal, TOffset, Tail, TOut>
    : TOut;

type FilterContainersGreaterThan<
    TVal extends Container,
    TOffset extends string,
    TContainers extends readonly Container[],
    TOut extends readonly Container[] = []
> = TContainers extends readonly [infer Head extends Container, ...infer Tail extends readonly Container[]]
    ? NumGreaterThan<
        As<Get<Head, TOffset>, number>,
        As<Get<TVal, TOffset>, number>
    > extends true
        ? FilterContainersGreaterThan<TVal, TOffset, Tail, [...TOut, Head]>
        : FilterContainersGreaterThan<TVal, TOffset, Tail, TOut>
    : TOut;

/**
 * Optimized offset sort using simpler comparisons
 */
type _SortOffset<
    TContainers extends readonly Container[],
    TOffset extends string,
> = TContainers extends readonly [infer Head extends Container, ...infer Rest extends readonly Container[]]
    ? [
        ..._SortOffset<
            FilterContainersLessThanOrEqual<Head, TOffset, Rest>,
            TOffset
        >,
        Head,
        ..._SortOffset<
            FilterContainersGreaterThan<Head, TOffset, Rest>,
            TOffset
        >,
    ]
    : [];

/**
 * Extract first elements from numeric array
 */
/**
 * Extract elements from array T that appear in the first array, in the order they appear in first array
 */
type ExtractFirstNumeric<
    T extends readonly number[],
    TFirst,
    TOut extends readonly number[] = []
> = TFirst extends readonly unknown[]
    ? TFirst extends readonly [infer FirstHead, ...infer FirstTail]
        ? FirstHead extends number
            ? [
                ...ExtractAllMatching<T, FirstHead>,
                ...ExtractFirstNumeric<T, FirstTail, TOut>
            ]
            : ExtractFirstNumeric<T, FirstTail, TOut>
        : TOut
    : T extends readonly [infer Head extends number, ...infer Tail extends readonly number[]]
        ? Head extends TFirst
            ? ExtractFirstNumeric<Tail, TFirst, [...TOut, Head]>
            : ExtractFirstNumeric<Tail, TFirst, TOut>
        : TOut;

/**
 * Extract all instances of a specific value from an array
 */
type ExtractAllMatching<
    T extends readonly number[],
    TValue extends number,
    TOut extends readonly number[] = []
> = T extends readonly [infer Head extends number, ...infer Tail extends readonly number[]]
    ? Head extends TValue
        ? ExtractAllMatching<Tail, TValue, [...TOut, Head]>
        : ExtractAllMatching<Tail, TValue, TOut>
    : TOut;

/**
 * Remove first elements from numeric array
 */
type RemoveFirstNumeric<
    T extends readonly number[],
    TFirst,
    TOut extends readonly number[] = []
> = TFirst extends readonly unknown[]
    ? T extends readonly [infer Head extends number, ...infer Tail extends readonly number[]]
        ? Head extends TFirst[number]
            ? RemoveFirstNumeric<Tail, TFirst, TOut>
            : RemoveFirstNumeric<Tail, TFirst, [...TOut, Head]>
        : TOut
    : T extends readonly [infer Head extends number, ...infer Tail extends readonly number[]]
        ? Head extends TFirst
            ? RemoveFirstNumeric<Tail, TFirst, TOut>
            : RemoveFirstNumeric<Tail, TFirst, [...TOut, Head]>
        : TOut;

export interface NumericSortOptions<
    TOrder extends "ASC" | "DESC" | undefined = "ASC" | "DESC" | undefined,
    TOffset extends string | undefined = string | undefined,
> {
    /**
     * by default this is set to sort by _ascending_ order but this can be
     * reversed by changing order to `DESC`.
     */
    order?: TOrder;

    /**
     * by default, the sorting will expect the numeric value to exist
     * as the base type, however, if you are using some sort of "container"
     * object you may prefer to _offset_
     */
    offset?: TOffset;

    /**
     * When left as _undefined_ the sorting is a pure ASC/DESC sort. However,
     * if a value is added here it indicates that any element in the array
     * (or its offset if the offset is set) which **equals** this value
     * will be pinned to the beginning.
     *
     * If the value of `first` is a tuple/array then we should pin _all/any_
     * of the values in `first` to the top (in the order they are specified
     * in the `first` tuple).
     *
     * @default undefined
     */
    first?: unknown;
}

/**
 * Main sorting logic without first elements
 */
type _NumericSortMain<
    TValues extends any[],
    TOpt extends NumericSortOptions,
    TNumericArray extends readonly number[] = AsNumericArray<TValues>,
    TSorted extends readonly number[] = _Sort<
        TNumericArray,
        [IsEqual<TOpt["order"], "DESC">] extends [true] ? true : false
    >
> = TSorted;

/**
 * Sorting logic with first elements
 */
type _NumericSortWithFirst<
    TValues extends any[],
    TOpt extends NumericSortOptions,
    TNumericArray extends readonly number[] = AsNumericArray<TValues>,
    TNumericFirst = TOpt["first"] extends readonly any[]
        ? AsNumericArray<TOpt["first"]>
        : AsNumericArray<[TOpt["first"]]> extends readonly [infer N]
            ? N
            : TOpt["first"],
    TFirstElements extends readonly number[] = ExtractFirstNumeric<TNumericArray, TNumericFirst>,
    TRemainingElements extends readonly number[] = RemoveFirstNumeric<TNumericArray, TNumericFirst>,
    TSorted extends readonly number[] = _Sort<
        TRemainingElements,
        [IsEqual<TOpt["order"], "DESC">] extends [true] ? true : false
    >
> = [...TFirstElements, ...TSorted];

/**
 * **NumericSort**`<TValues, [TOpt]>`
 *
 * Sorts the values in a tuple numerically.
 *
 * - _values_ can be a `number` or `${number}`
 *
 * Options:
 * - `order`: defaults to `ASC` but can be set to `DESC`
 * - `offset`:  if you have _containers_ as values, you can specify an offset to use to look for the numeric value
 * - `first`: pin specific numeric values to the beginning of the sorted array
 */
export type NumericSort<
    TValues extends any[],
    TOpt extends NumericSortOptions = NumericSortOptions,
> = IsStringLiteral<TOpt["offset"]> extends true
    ? [IsEqual<TOpt["order"], "DESC">] extends [true]
        ? Reverse<
            _SortOffset<
                TValues,
                As<TOpt["offset"], string>
            >
        >
        : _SortOffset<
            TValues,
            As<TOpt["offset"], string>
        >

    : TOpt extends { first: any }
        ? _NumericSortWithFirst<TValues, TOpt>
        : _NumericSortMain<TValues, TOpt>;
