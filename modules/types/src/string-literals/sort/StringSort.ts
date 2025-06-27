import type {
    AfterFirst,
    AfterFirstChar,
    And,
    As,
    BeforeLast,
    CodePointOf,
    Decrement,
    Err,
    First,
    FirstChar,
    FixedLengthArray,
    Increment,
    IsEqual,
    IsGreaterThan,
    IsNumber,
    IsTrue,
    IsWideString,
    Last,
    Reverse,
    SortOrder
} from "inferred-types/types";

type KeepOrder<
    A extends string,
    B extends string
> = And<[IsNumber<CodePointOf<A>>, IsNumber<CodePointOf<B>>]> extends true
    ? IsGreaterThan<
        As<CodePointOf<A>, number>,
        As<CodePointOf<B>, number>
    > extends true
        ? false
        : true
    : Err<`invalid-char/${A}-${B}`>;

type TwoSort<
    A extends string,
    B extends string
> = As<
    A extends `${infer Char}${infer REST}`
        ? IsEqual<Char, FirstChar<B>> extends true
            ? TwoSort<REST, AfterFirstChar<B>>
            : KeepOrder<Char, FirstChar<B>>
        : true,
Error | boolean
>;

type SortPass<
    T extends readonly string[],
    R extends readonly string[] = []
> = T extends [
    infer First extends string,
    infer Second extends string,
    ...(infer Rest extends readonly string[])
]
    ? [TwoSort<First, Second>] extends [Error]
        ? TwoSort<First, Second> // terminate on error
        : [IsTrue<TwoSort<First, Second>>] extends [true]
            ? SortPass<
                [Second, ...Rest],
                [...R, First]
            >
            : SortPass<
                [First, ...Rest],
                [...R, Second]
            >
    : T extends [infer First extends string]
        ? [TwoSort<First, Last<R>>] extends [Error]
            ? TwoSort<First, Last<R>>
            : [IsTrue<TwoSort<First, Last<R>>>] extends [true]
                ? [...BeforeLast<R>, First, Last<R>]
                : [...R, First]

        : R;

/**
 * counts the number of "wide strings" found in `T`
 * and extracts them.
 */
type CountWideStrings<
    T extends readonly string[],
    R extends readonly string[] = [],
    C extends number = 0
> = [] extends T
    ? {
        remaining: R;
        count: C;
    }
    : [IsWideString<First<T>>] extends [true]
        ? CountWideStrings<
            AfterFirst<T>,
            R,
            Increment<C>
        >
        : CountWideStrings<
            AfterFirst<T>,
            [...R, First<T>],
            C
        >;

type SortAsc<
    T extends readonly string[],
    C extends readonly unknown[] = FixedLengthArray<1, Decrement<T["length"]>>
> = [] extends C
    ? T
    : SortAsc<
        SortPass<T>,
        AfterFirst<C>
    >;

/**
 * **StringSort**`<T, [O]>`
 *
 * Sorts a string based tuple `T`.
 *
 * - by default it sorts in _ascending_ order but you can
 * change `O` to _descending_ if you wish to sort in that order
 * - any _wide_ string encountered will always be pushed to the
 * end of the sort order
 */
export type StringSort<
    T extends readonly string[],
    O extends SortOrder = "ascending",
    E extends { remaining: readonly string[]; count: number } = CountWideStrings<T>
> = E["count"] extends 0
    ? O extends "ascending"
        ? SortAsc<E["remaining"]>
        : Reverse<SortAsc<E["remaining"]>>
    : O extends "ascending"
        ? [
            ...SortAsc<E["remaining"]>,
            ...FixedLengthArray<string, E["count"]>
        ]
        : [
            ...Reverse<SortAsc<E["remaining"]>>,
            ...FixedLengthArray<string, E["count"]>
        ];
