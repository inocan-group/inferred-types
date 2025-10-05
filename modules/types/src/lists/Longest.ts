import type {
    AfterFirst,
    First,
    IsGreaterThan,
    IsStringLiteral,
    Length,
    Max,
    Unset
} from "inferred-types/types";

type Process<
    T extends readonly string[],
    TShortest extends number = 0,
    TResult extends string | Unset = Unset
> = T extends [ infer Head extends string, ...infer Rest extends readonly string[]]
    ? Process<
        Rest,
        IsStringLiteral<Head> extends true
            ? Max<[TShortest, Length<Head>]>
            : TShortest,
        IsStringLiteral<Head> extends true
            ? IsGreaterThan<Length<Head>, TShortest> extends true
                ? Head
                : TResult
            : TResult
    >
: TResult extends Unset
        ? string
        : TResult;

/**
 * **Longest**`<T>`
 *
 * Takes a tuple of strings and returns the longest one in the tuple.
 *
 * - if more than one string is _tied_ for being longest then
 * the **first** one found will be returned.
 * - if _all_ elements passed in were wide then the result will be `string`
 * - if _some_ of the elements passed in were wide then they will be
 * ignored and only the literal strings will be compared
 */
export type Longest<T extends readonly string[]> = Process<T>;
