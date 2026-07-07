import type {
    IsStringLiteral,
    Unset
} from "inferred-types/types";

type StringToTuple<T extends string, TResult extends readonly string[] = []> = T extends `${string}${infer Rest}`
    ? StringToTuple<Rest, [...TResult, string]>
    : TResult;

type IsLonger<
    A extends string,
    B extends string,
> = StringToTuple<A> extends infer ATuple extends readonly string[]
    ? StringToTuple<B> extends infer BTuple extends readonly string[]
        ? ATuple extends readonly [...BTuple, unknown, ...readonly unknown[]]
            ? true
            : false
        : false
    : false;

type Process<
    T extends readonly string[],
    TResult extends string | Unset = Unset
> = T extends [ infer Head extends string, ...infer Rest extends readonly string[]]
    ? Process<
        Rest,
        IsStringLiteral<Head> extends true
            ? TResult extends string
                ? IsLonger<Head, TResult> extends true
                    ? Head
                    : TResult
                : Head
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
