import type {
    As,
    Container,
    Get,
    IsEqual,
    IsStringLiteral,
    IsWideString,
    Length,
    Reverse
} from "inferred-types/types";

export interface StringSortOptions<
    TOrder extends "ASC" | "DESC" | undefined = "ASC" | "DESC" | undefined,
    TOffset extends string | undefined = string | undefined,
> {
    /**
     * by default this is set to sort by _ascending_ order but this can be
     * reversed by changing order to `DESC`.
     */
    order?: TOrder;

    /**
     * by default, the sorting will expect the string value to exist
     * as the base type of the array's elements, however, if you are
     * list contains "container" types as objects then it may be more
     * useful to have the comparison be made to a property/offset of
     * these containers.
     */
    offset?: TOffset;

    /**
     * When left as _undefined_ the sorting is a pure ASC/DESC sort. However,
     * if a value is added here it indicates that any element in the array
     * (or it's offset if the offset is set) which **equals** this value
     * will be on top.
     *
     * If the value of `first` is a tuple/array then we should pin _all/any_
     * of the values in `first` to the top (in the order they are specified
     * in the `first` tuple).
     *
     *
     * @default undefined
     */
    first?: unknown;
}

/**
 * Lexicographic string comparison - returns true if A should come before B
 */
type StringLessThan<A extends string, B extends string>
    = A extends B ? false // Same string
        : A extends "" ? B extends "" ? false : true // Empty string comes first
            : B extends "" ? false // Non-empty comes after empty
                : A extends `${infer AFirst}${infer ARest}`
                    ? B extends `${infer BFirst}${infer BRest}`
                        ? AFirst extends BFirst
                            ? StringLessThan<ARest, BRest> // Same first char, compare rest
                            : CharLessThan<AFirst, BFirst>
                        : false // B is shorter
                    : true; // A is shorter

/**
 * Character comparison based on Unicode code points
 */
type CharLessThan<A extends string, B extends string>
    // Space and punctuation
    = A extends " " ? B extends " " ? false : true
        : A extends "!" ? B extends "!" | " " ? false : true
            : A extends "\"" ? B extends "\"" | "!" | " " ? false : true
                : A extends "#" ? B extends "#" | "\"" | "!" | " " ? false : true
                    : A extends "$" ? B extends "$" | "#" | "\"" | "!" | " " ? false : true
                        : A extends "%" ? B extends "%" | "$" | "#" | "\"" | "!" | " " ? false : true
                            : A extends "&" ? B extends "&" | "%" | "$" | "#" | "\"" | "!" | " " ? false : true
                                : A extends "'" ? B extends "'" | "&" | "%" | "$" | "#" | "\"" | "!" | " " ? false : true
                                    : A extends "(" ? B extends "(" | "'" | "&" | "%" | "$" | "#" | "\"" | "!" | " " ? false : true
                                        : A extends ")" ? B extends ")" | "(" | "'" | "&" | "%" | "$" | "#" | "\"" | "!" | " " ? false : true
                                            : A extends "*" ? B extends "*" | ")" | "(" | "'" | "&" | "%" | "$" | "#" | "\"" | "!" | " " ? false : true
                                                : A extends "+" ? B extends "+" | "*" | ")" | "(" | "'" | "&" | "%" | "$" | "#" | "\"" | "!" | " " ? false : true
                                                    : A extends "," ? B extends "," | "+" | "*" | ")" | "(" | "'" | "&" | "%" | "$" | "#" | "\"" | "!" | " " ? false : true
                                                        : A extends "-" ? B extends "-" | "," | "+" | "*" | ")" | "(" | "'" | "&" | "%" | "$" | "#" | "\"" | "!" | " " ? false : true
                                                            : A extends "." ? B extends "." | "-" | "," | "+" | "*" | ")" | "(" | "'" | "&" | "%" | "$" | "#" | "\"" | "!" | " " ? false : true
                                                                : A extends "/" ? B extends "/" | "." | "-" | "," | "+" | "*" | ")" | "(" | "'" | "&" | "%" | "$" | "#" | "\"" | "!" | " " ? false : true
                                                                // Numbers
                                                                    : A extends "0" ? B extends "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | ":" | ";" | "<" | "=" | ">" | "?" | "@" | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z" | "[" | "\\" | "]" | "^" | "_" | "`" | "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | "{" | "|" | "}" | "~" ? true : false
                                                                        : A extends "1" ? B extends "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | ":" | ";" | "<" | "=" | ">" | "?" | "@" | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z" | "[" | "\\" | "]" | "^" | "_" | "`" | "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | "{" | "|" | "}" | "~" ? true : false
                                                                            : A extends "2" ? B extends "3" | "4" | "5" | "6" | "7" | "8" | "9" | ":" | ";" | "<" | "=" | ">" | "?" | "@" | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z" | "[" | "\\" | "]" | "^" | "_" | "`" | "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | "{" | "|" | "}" | "~" ? true : false
                                                                                : A extends "3" ? B extends "4" | "5" | "6" | "7" | "8" | "9" | ":" | ";" | "<" | "=" | ">" | "?" | "@" | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z" | "[" | "\\" | "]" | "^" | "_" | "`" | "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | "{" | "|" | "}" | "~" ? true : false
                                                                                    : A extends "4" ? B extends "5" | "6" | "7" | "8" | "9" | ":" | ";" | "<" | "=" | ">" | "?" | "@" | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z" | "[" | "\\" | "]" | "^" | "_" | "`" | "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | "{" | "|" | "}" | "~" ? true : false
                                                                                        : A extends "5" ? B extends "6" | "7" | "8" | "9" | ":" | ";" | "<" | "=" | ">" | "?" | "@" | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z" | "[" | "\\" | "]" | "^" | "_" | "`" | "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | "{" | "|" | "}" | "~" ? true : false
                                                                                            : A extends "6" ? B extends "7" | "8" | "9" | ":" | ";" | "<" | "=" | ">" | "?" | "@" | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z" | "[" | "\\" | "]" | "^" | "_" | "`" | "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | "{" | "|" | "}" | "~" ? true : false
                                                                                                : A extends "7" ? B extends "8" | "9" | ":" | ";" | "<" | "=" | ">" | "?" | "@" | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z" | "[" | "\\" | "]" | "^" | "_" | "`" | "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | "{" | "|" | "}" | "~" ? true : false
                                                                                                    : A extends "8" ? B extends "9" | ":" | ";" | "<" | "=" | ">" | "?" | "@" | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z" | "[" | "\\" | "]" | "^" | "_" | "`" | "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | "{" | "|" | "}" | "~" ? true : false
                                                                                                        : A extends "9" ? B extends ":" | ";" | "<" | "=" | ">" | "?" | "@" | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z" | "[" | "\\" | "]" | "^" | "_" | "`" | "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | "{" | "|" | "}" | "~" ? true : false
                                                                                                        // Uppercase letters
                                                                                                            : A extends "A" ? B extends "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z" | "[" | "\\" | "]" | "^" | "_" | "`" | "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | "{" | "|" | "}" | "~" ? true : false
                                                                                                                : A extends "B" ? B extends "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z" | "[" | "\\" | "]" | "^" | "_" | "`" | "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | "{" | "|" | "}" | "~" ? true : false
                                                                                                                // Lowercase letters
                                                                                                                    : A extends "a" ? B extends "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | "{" | "|" | "}" | "~" ? true : false
                                                                                                                        : A extends "b" ? B extends "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | "{" | "|" | "}" | "~" ? true : false
                                                                                                                            : A extends "c" ? B extends "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | "{" | "|" | "}" | "~" ? true : false
                                                                                                                                : A extends "d" ? B extends "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | "{" | "|" | "}" | "~" ? true : false
                                                                                                                                    : A extends "e" ? B extends "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | "{" | "|" | "}" | "~" ? true : false
                                                                                                                                        : A extends "f" ? B extends "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | "{" | "|" | "}" | "~" ? true : false
                                                                                                                                            : A extends "g" ? B extends "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | "{" | "|" | "}" | "~" ? true : false
                                                                                                                                                : A extends "h" ? B extends "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | "{" | "|" | "}" | "~" ? true : false
                                                                                                                                                    : A extends "i" ? B extends "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | "{" | "|" | "}" | "~" ? true : false
                                                                                                                                                        : A extends "j" ? B extends "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | "{" | "|" | "}" | "~" ? true : false
                                                                                                                                                            : A extends "k" ? B extends "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | "{" | "|" | "}" | "~" ? true : false
                                                                                                                                                                : A extends "l" ? B extends "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | "{" | "|" | "}" | "~" ? true : false
                                                                                                                                                                    : A extends "m" ? B extends "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | "{" | "|" | "}" | "~" ? true : false
                                                                                                                                                                        : A extends "n" ? B extends "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | "{" | "|" | "}" | "~" ? true : false
                                                                                                                                                                            : A extends "o" ? B extends "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | "{" | "|" | "}" | "~" ? true : false
                                                                                                                                                                                : A extends "p" ? B extends "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | "{" | "|" | "}" | "~" ? true : false
                                                                                                                                                                                    : A extends "q" ? B extends "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | "{" | "|" | "}" | "~" ? true : false
                                                                                                                                                                                        : A extends "r" ? B extends "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | "{" | "|" | "}" | "~" ? true : false
                                                                                                                                                                                            : A extends "s" ? B extends "t" | "u" | "v" | "w" | "x" | "y" | "z" | "{" | "|" | "}" | "~" ? true : false
                                                                                                                                                                                                : A extends "t" ? B extends "u" | "v" | "w" | "x" | "y" | "z" | "{" | "|" | "}" | "~" ? true : false
                                                                                                                                                                                                    : A extends "u" ? B extends "v" | "w" | "x" | "y" | "z" | "{" | "|" | "}" | "~" ? true : false
                                                                                                                                                                                                        : A extends "v" ? B extends "w" | "x" | "y" | "z" | "{" | "|" | "}" | "~" ? true : false
                                                                                                                                                                                                            : A extends "w" ? B extends "x" | "y" | "z" | "{" | "|" | "}" | "~" ? true : false
                                                                                                                                                                                                                : A extends "x" ? B extends "y" | "z" | "{" | "|" | "}" | "~" ? true : false
                                                                                                                                                                                                                    : A extends "y" ? B extends "z" | "{" | "|" | "}" | "~" ? true : false
                                                                                                                                                                                                                        : A extends "z" ? B extends "{" | "|" | "}" | "~" ? true : false
                                                                                                                                                                                                                            : false; // Default: not less

type StringGreaterThan<A extends string, B extends string>
    = StringLessThan<A, B> extends true
        ? false
        : A extends B
            ? false
            : true;

/**
 * Filter strings that are less than or equal to the pivot
 */
type FilterStringLessThanOrEqual<
    TPivot extends string,
    TValues extends readonly string[],
    TOut extends readonly string[] = [],
> = TValues extends readonly [infer Head extends string, ...infer Tail extends readonly string[]]
    ? StringLessThan<Head, TPivot> extends true
        ? FilterStringLessThanOrEqual<TPivot, Tail, [...TOut, Head]>
        : Head extends TPivot
            ? FilterStringLessThanOrEqual<TPivot, Tail, [...TOut, Head]>
            : FilterStringLessThanOrEqual<TPivot, Tail, TOut>
    : TOut;

/**
 * Filter strings that are greater than the pivot
 */
type FilterStringGreaterThan<
    TPivot extends string,
    TValues extends readonly string[],
    TOut extends readonly string[] = [],
> = TValues extends readonly [infer Head extends string, ...infer Tail extends readonly string[]]
    ? StringGreaterThan<Head, TPivot> extends true
        ? FilterStringGreaterThan<TPivot, Tail, [...TOut, Head]>
        : FilterStringGreaterThan<TPivot, Tail, TOut>
    : TOut;

/**
 * Quicksort implementation for strings
 */
type _SortStrings<
    TValues extends readonly string[],
    TReverse extends boolean,
> = TValues extends readonly [infer Head extends string, ...infer Tail extends readonly string[]]
    ? TReverse extends true
        ? [
            ..._SortStrings<
                FilterStringGreaterThan<Head, Tail>,
                TReverse
            >,
            Head,
            ..._SortStrings<
                FilterStringLessThanOrEqual<Head, Tail>,
                TReverse
            >,
        ]
        : [
            ..._SortStrings<
                FilterStringLessThanOrEqual<Head, Tail>,
                TReverse
            >,
            Head,
            ..._SortStrings<
                FilterStringGreaterThan<Head, Tail>,
                TReverse
            >,
        ]
    : [];

/**
 * Helper to filter containers by offset value comparison
 */
type FilterContainersStringLessThanOrEqual<
    TVal extends Container,
    TOffset extends string,
    TContainers extends readonly Container[],
    TOut extends readonly Container[] = []
> = TContainers extends readonly [infer Head extends Container, ...infer Tail extends readonly Container[]]
    ? StringLessThan<
        As<Get<Head, TOffset>, string>,
        As<Get<TVal, TOffset>, string>
    > extends true
        ? FilterContainersStringLessThanOrEqual<TVal, TOffset, Tail, [...TOut, Head]>
        : As<Get<Head, TOffset>, string> extends As<Get<TVal, TOffset>, string>
            ? FilterContainersStringLessThanOrEqual<TVal, TOffset, Tail, [...TOut, Head]>
            : FilterContainersStringLessThanOrEqual<TVal, TOffset, Tail, TOut>
    : TOut;

type FilterContainersStringGreaterThan<
    TVal extends Container,
    TOffset extends string,
    TContainers extends readonly Container[],
    TOut extends readonly Container[] = []
> = TContainers extends readonly [infer Head extends Container, ...infer Tail extends readonly Container[]]
    ? StringGreaterThan<
        As<Get<Head, TOffset>, string>,
        As<Get<TVal, TOffset>, string>
    > extends true
        ? FilterContainersStringGreaterThan<TVal, TOffset, Tail, [...TOut, Head]>
        : FilterContainersStringGreaterThan<TVal, TOffset, Tail, TOut>
    : TOut;

/**
 * Sort containers by string offset
 */
type _SortStringOffset<
    TContainers extends readonly Container[],
    TOffset extends string,
> = TContainers extends readonly [infer Head extends Container, ...infer Rest extends readonly Container[]]
    ? [
        ..._SortStringOffset<
            FilterContainersStringLessThanOrEqual<Head, TOffset, Rest>,
            TOffset
        >,
        Head,
        ..._SortStringOffset<
            FilterContainersStringGreaterThan<Head, TOffset, Rest>,
            TOffset
        >,
    ]
    : [];

/**
 * Separate wide and narrow string types
 */
type SeparateWideStrings<T extends readonly string[]> = {
    narrow: {
        [K in keyof T]: IsWideString<T[K]> extends true ? never : T[K]
    }[number][];
    wide: {
        [K in keyof T]: IsWideString<T[K]> extends true ? T[K] : never
    }[number][];
};

/**
 * Extract first elements from array
 */
type ExtractFirst<
    T extends readonly string[],
    TFirst extends unknown,
    TOut extends readonly string[] = []
> = TFirst extends readonly unknown[]
    ? T extends readonly [infer Head extends string, ...infer Tail extends readonly string[]]
        ? Head extends TFirst[number]
            ? ExtractFirst<Tail, TFirst, [...TOut, Head]>
            : ExtractFirst<Tail, TFirst, TOut>
        : TOut
    : T extends readonly [infer Head extends string, ...infer Tail extends readonly string[]]
        ? Head extends TFirst
            ? ExtractFirst<Tail, TFirst, [...TOut, Head]>
            : ExtractFirst<Tail, TFirst, TOut>
        : TOut;

/**
 * Remove first elements from array
 */
type RemoveFirst<
    T extends readonly string[],
    TFirst extends unknown,
    TOut extends readonly string[] = []
> = TFirst extends readonly unknown[]
    ? T extends readonly [infer Head extends string, ...infer Tail extends readonly string[]]
        ? Head extends TFirst[number]
            ? RemoveFirst<Tail, TFirst, TOut>
            : RemoveFirst<Tail, TFirst, [...TOut, Head]>
        : TOut
    : T extends readonly [infer Head extends string, ...infer Tail extends readonly string[]]
        ? Head extends TFirst
            ? RemoveFirst<Tail, TFirst, TOut>
            : RemoveFirst<Tail, TFirst, [...TOut, Head]>
        : TOut;

/**
 * **StringSort**`<T, [O]>`
 *
 * Sorts a string based tuple `T` or containers with string properties.
 *
 * - by default it sorts in _ascending_ order but you can
 * change `O` to _descending_ if you wish to sort in that order
 * - any _wide_ string encountered will always be pushed to the
 * end of the sort order
 * - supports pinning elements to the beginning with the `first` option
 * - supports container/offset sorting
 */
export type StringSort<
    T extends readonly (string | Container)[],
    O extends StringSortOptions = {},
> = IsStringLiteral<O["offset"]> extends true
    ? T extends readonly Container[]
        ? [IsEqual<O["order"], "DESC">] extends [true]
            ? Reverse<
                _SortStringOffset<T, As<O["offset"], string>>
            >
            : _SortStringOffset<T, As<O["offset"], string>>
        : never // Cannot use offset with non-container types
    : T extends readonly string[]
        ? Length<T> extends 0
            ? T
            : Length<T> extends 1
                ? T
                : O["first"] extends undefined
                    ? _StringSortMain<T, O>
                    : _StringSortWithFirst<T, O>
        : never; // Type must be string array when no offset is specified

/**
 * Main sorting logic without first elements
 */
type _StringSortMain<
    T extends readonly string[],
    O extends StringSortOptions,
    TSeparated = SeparateWideStrings<T>,
    TNarrow extends readonly string[] = TSeparated extends { narrow: infer N } ? N extends readonly string[] ? N : [] : [],
    TWide extends readonly string[] = TSeparated extends { wide: infer W } ? W extends readonly string[] ? W : [] : [],
    TSorted extends readonly string[] = _SortStrings<
        TNarrow,
        [IsEqual<O["order"], "DESC">] extends [true] ? true : false
    >
> = [...TSorted, ...TWide];

/**
 * Sorting logic with first elements
 */
type _StringSortWithFirst<
    T extends readonly string[],
    O extends StringSortOptions,
    TSeparated = SeparateWideStrings<T>,
    TNarrow extends readonly string[] = TSeparated extends { narrow: infer N } ? N extends readonly string[] ? N : [] : [],
    TWide extends readonly string[] = TSeparated extends { wide: infer W } ? W extends readonly string[] ? W : [] : [],
    TFirstElements extends readonly string[] = ExtractFirst<TNarrow, O["first"]>,
    TRemainingElements extends readonly string[] = RemoveFirst<TNarrow, O["first"]>,
    TSorted extends readonly string[] = _SortStrings<
        TRemainingElements,
        [IsEqual<O["order"], "DESC">] extends [true] ? true : false
    >
> = [...TFirstElements, ...TSorted, ...TWide];
