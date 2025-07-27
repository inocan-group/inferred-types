import type {
    As,
    Container,
    Get,
    IsEqual,
    IsStringLiteral,
    Length,
    Reverse
} from "inferred-types/types";

/**
 * Detect if a type is the wide boolean type rather than a boolean literal
 */
type IsWideBool<T> = boolean extends T 
    ? true extends T 
        ? false extends T 
            ? true 
            : false
        : false
    : false;

/**
 * Boolean comparison for ASC order - returns true if A should come before B
 * ASC order: true comes before false 
 */
type BoolLessThan<A extends boolean, B extends boolean> =
    A extends true
        ? B extends false
            ? true // true comes before false in ASC
            : false // true = true
        : A extends false
            ? B extends true
                ? false // false comes after true in ASC
                : false // false = false
            : false; // A is wide boolean

type BoolGreaterThan<A extends boolean, B extends boolean> =
    BoolLessThan<A, B> extends true
        ? false
        : A extends B
            ? false
            : true;

/**
 * Filter booleans that are less than or equal to the pivot
 */
type FilterBoolLessThanOrEqual<
    TPivot extends boolean,
    TValues extends readonly boolean[],
    TOut extends readonly boolean[] = [],
> = TValues extends readonly [infer Head extends boolean, ...infer Tail extends readonly boolean[]]
    ? BoolLessThan<Head, TPivot> extends true
        ? FilterBoolLessThanOrEqual<TPivot, Tail, [...TOut, Head]>
        : Head extends TPivot
            ? FilterBoolLessThanOrEqual<TPivot, Tail, [...TOut, Head]>
            : FilterBoolLessThanOrEqual<TPivot, Tail, TOut>
    : TOut;

/**
 * Filter booleans that are greater than the pivot
 */
type FilterBoolGreaterThan<
    TPivot extends boolean,
    TValues extends readonly boolean[],
    TOut extends readonly boolean[] = [],
> = TValues extends readonly [infer Head extends boolean, ...infer Tail extends readonly boolean[]]
    ? BoolGreaterThan<Head, TPivot> extends true
        ? FilterBoolGreaterThan<TPivot, Tail, [...TOut, Head]>
        : FilterBoolGreaterThan<TPivot, Tail, TOut>
    : TOut;

/**
 * Quicksort implementation for booleans
 */
type _SortBooleans<
    TValues extends readonly boolean[],
    TReverse extends boolean,
> = TValues extends readonly [infer Head extends boolean, ...infer Tail extends readonly boolean[]]
    ? TReverse extends true
        ? [
            ..._SortBooleans<
                FilterBoolGreaterThan<Head, Tail>,
                TReverse
            >,
            Head,
            ..._SortBooleans<
                FilterBoolLessThanOrEqual<Head, Tail>,
                TReverse
            >,
        ]
        : [
            ..._SortBooleans<
                FilterBoolLessThanOrEqual<Head, Tail>,
                TReverse
            >,
            Head,
            ..._SortBooleans<
                FilterBoolGreaterThan<Head, Tail>,
                TReverse
            >,
        ]
    : [];

/**
 * Helper to filter containers by boolean offset value comparison
 */
type FilterContainersBoolLessThanOrEqual<
    TVal extends Container,
    TOffset extends string,
    TContainers extends readonly Container[],
    TOut extends readonly Container[] = []
> = TContainers extends readonly [infer Head extends Container, ...infer Tail extends readonly Container[]]
    ? BoolLessThan<
        As<Get<Head, TOffset>, boolean>,
        As<Get<TVal, TOffset>, boolean>
      > extends true
        ? FilterContainersBoolLessThanOrEqual<TVal, TOffset, Tail, [...TOut, Head]>
        : As<Get<Head, TOffset>, boolean> extends As<Get<TVal, TOffset>, boolean>
            ? FilterContainersBoolLessThanOrEqual<TVal, TOffset, Tail, [...TOut, Head]>
            : FilterContainersBoolLessThanOrEqual<TVal, TOffset, Tail, TOut>
    : TOut;

type FilterContainersBoolGreaterThan<
    TVal extends Container,
    TOffset extends string,
    TContainers extends readonly Container[],
    TOut extends readonly Container[] = []
> = TContainers extends readonly [infer Head extends Container, ...infer Tail extends readonly Container[]]
    ? BoolGreaterThan<
        As<Get<Head, TOffset>, boolean>,
        As<Get<TVal, TOffset>, boolean>
      > extends true
        ? FilterContainersBoolGreaterThan<TVal, TOffset, Tail, [...TOut, Head]>
        : FilterContainersBoolGreaterThan<TVal, TOffset, Tail, TOut>
    : TOut;

/**
 * Sort containers by boolean offset
 */
type _SortBooleanOffset<
    TContainers extends readonly Container[],
    TOffset extends string,
    TReverse extends boolean,
> = TContainers extends readonly [infer Head extends Container, ...infer Rest extends readonly Container[]]
    ? TReverse extends true
        ? [
            ..._SortBooleanOffset<
                FilterContainersBoolGreaterThan<Head, TOffset, Rest>,
                TOffset,
                TReverse
            >,
            Head,
            ..._SortBooleanOffset<
                FilterContainersBoolLessThanOrEqual<Head, TOffset, Rest>,
                TOffset,
                TReverse
            >,
        ]
        : [
            ..._SortBooleanOffset<
                FilterContainersBoolLessThanOrEqual<Head, TOffset, Rest>,
                TOffset,
                TReverse
            >,
            Head,
            ..._SortBooleanOffset<
                FilterContainersBoolGreaterThan<Head, TOffset, Rest>,
                TOffset,
                TReverse
            >,
        ]
    : [];

/**
 * Filter narrow boolean types (true | false literals)
 */
type FilterNarrowBooleans<T extends readonly boolean[], Result extends readonly boolean[] = []> =
    T extends readonly [infer Head extends boolean, ...infer Tail extends readonly boolean[]]
        ? IsWideBool<Head> extends true
            ? FilterNarrowBooleans<Tail, Result>
            : FilterNarrowBooleans<Tail, [...Result, Head]>
        : Result;

/**
 * Filter wide boolean types (boolean type)
 */
type FilterWideBooleans<T extends readonly boolean[], Result extends readonly boolean[] = []> =
    T extends readonly [infer Head extends boolean, ...infer Tail extends readonly boolean[]]
        ? IsWideBool<Head> extends true
            ? FilterWideBooleans<Tail, [...Result, Head]>
            : FilterWideBooleans<Tail, Result>
        : Result;

/**
 * Separate wide and narrow boolean types
 */
type SeparateWideBooleans<T extends readonly boolean[]> = {
    narrow: FilterNarrowBooleans<T>;
    wide: FilterWideBooleans<T>;
};


export interface BooleanSortOptions {
    /**
     * by default this is set to sort by _ascending_ order but this can be
     * reversed by changing order to `DESC`.
     * 
     * ASC: true, false, boolean
     * DESC: false, true, boolean
     */
    order?: "ASC" | "DESC";

    /**
     * by default, the sorting will expect the boolean value to exist
     * as the base type of the array's elements, however, if you are
     * list contains "container" types as objects then it may be more
     * useful to have the comparison be made to a property/offset of
     * these containers.
     */
    offset?: string;
}

/**
 * Main sorting logic without first elements
 */
type _BooleanSortMain<
    T extends readonly boolean[],
    O extends BooleanSortOptions,
    TSeparated = SeparateWideBooleans<T>,
    TNarrow extends readonly boolean[] = TSeparated extends { narrow: infer N } ? N extends readonly boolean[] ? N : [] : [],
    TWide extends readonly boolean[] = TSeparated extends { wide: infer W } ? W extends readonly boolean[] ? W : [] : [],
    TSorted extends readonly boolean[] = _SortBooleans<
        TNarrow,
        [IsEqual<O["order"], "DESC">] extends [true] ? true : false
    >
> = [...TSorted, ...TWide];


/**
 * **BooleanSort**`<T, [O]>`
 *
 * Sorts a boolean based tuple `T` or containers with boolean properties.
 *
 * - by default it sorts in _ascending_ order: true, false, boolean
 * - DESC order: false, true, boolean (wide boolean type always last)
 * - any _wide_ boolean encountered will always be pushed to the
 * end of the sort order
 * - supports pinning elements to the beginning with the `first` option
 * - supports container/offset sorting
 */
export type BooleanSort<
    T extends readonly (boolean | Container)[],
    O extends BooleanSortOptions = {},
> = IsStringLiteral<O["offset"]> extends true
    ? T extends readonly Container[]
        ? [IsEqual<O["order"], "DESC">] extends [true]
            ? Reverse<
                _SortBooleanOffset<T, As<O["offset"], string>, false>
            >
            : _SortBooleanOffset<T, As<O["offset"], string>, false>
        : never // Cannot use offset with non-container types
    : T extends readonly boolean[]
        ? Length<T> extends 0
            ? T
            : Length<T> extends 1
                ? T
                : _BooleanSortMain<T, O>
        : never; // Type must be boolean array when no offset is specified