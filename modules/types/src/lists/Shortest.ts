import {
    First,
    IsLessThan, IsStringLiteral,
    AfterFirst,
    Unset,
    MaxSafeInteger,
    Min,
    Length,
} from "inferred-types/types";



type Process<
    T extends readonly string[],
    TShortest extends number = MaxSafeInteger,
    TResult extends string | Unset = Unset
> = [] extends T
? TResult extends Unset
    ? string
    : TResult
: Process<
    AfterFirst<T>,
    IsStringLiteral<First<T>> extends true
        ? Min<[TShortest, Length<First<T>>]>
        : TShortest,
    IsStringLiteral<First<T>> extends true
        ? IsLessThan<Length<First<T>>, TShortest> extends true
            ? First<T>
            : TResult
        : TResult
>;

/**
 * **Shortest**`<T>`
 *
 * Takes a tuple of strings and returns the shortest one in the tuple.
 *
 * - if more than one string is _tied_ for being shortest then
 * the **first** one found will be returned.
 * - if _all_ elements passed in were wide then the result will be `string`
 * - if _some_ of the elements passed in were wide then they will be
 * ignored and only the literal strings will be compared
 */
export type Shortest<T extends readonly string[]> = Process<T>;
