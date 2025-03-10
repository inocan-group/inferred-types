import {
    AfterFirst,
    As,
    First,
    IsEqual,
    Join,
    Split,
    StripTrailingStringTemplate,
    ToStringArray,
} from "inferred-types/types";

/**
 * **ReplaceStringInterpolation**`<TContent, TReplace>`
 *
 * Replaces all instances of `${string}` in `TContent` with `TReplace`
 */
export type ReplaceStringInterpolation<
    TContent extends string,
    TReplace extends string,
    TResult extends string = ""
> = TContent extends `${infer First}${infer Rest}`
? ReplaceStringInterpolation<
    Rest,
    TReplace,
    IsEqual<First, string> extends true
    ? `${TResult}${TReplace}`
    : `${TResult}${First}`
>
: IsEqual<TContent, StripTrailingStringTemplate<TContent>> extends true
    ? TResult
    : `${TResult}${TReplace}`;



type Replace<
    T extends readonly string[],
    F extends string,
    R extends string
> = As<{
    [K in keyof T]: IsEqual<T[K], F> extends true
        ? R
        : T[K]
}, readonly string[]>

type ReplaceFirst<
    I extends readonly string[],
    TFind extends string,
    TReplace extends string,
    TFound extends boolean = false,
    O extends readonly string[] = []
>=[] extends I
? O
: ReplaceFirst<
    AfterFirst<I>,
    TFind,
    TReplace,
    IsEqual<First<I>, TFind> extends true
        ? true
        : TFound,
    [
        ...O,
        TFound extends false
            ? IsEqual<First<I>, TFind> extends true
                ? TReplace
                : First<I>
            : First<I>
    ]
>;


type ReplaceStack<
    T extends readonly string[],
    F extends string,
    R extends readonly string[]
> = [] extends R
? T
: ReplaceStack<
    ReplaceFirst<T,F,First<R>>,
    F,
    AfterFirst<R>
>


/**
 * **ReplaceNumericInterpolation**`<TContent, TReplace>`
 *
 * Replaces all instances of `${number}` in `TContent` with `TReplace`
 *
 * - when `TReplace` is single string then all instances are replaced with
 * this value
 * - when `TReplace` is an array of strings then strings are pulled off in a FIFO
 * manner to replace
 *
 * **Related:** `ReplaceStringInterpolation`
 */
export type ReplaceNumericInterpolation<
    TContent extends string,
    TReplace extends string | readonly (string|number|boolean)[],
> = TReplace extends string
? Join<
    Replace<
        Split<TContent, `${number}`, "inline">,
        `${number}`,
        TReplace
    >
>
: TReplace extends (string|number|boolean)[]
? Join<ReplaceStack<
    Split<TContent, `${number}`, "inline">,
    `${number}`,
    ToStringArray<TReplace> extends readonly string[]
        ? ToStringArray<TReplace>
        : never
>>
: never;

/**
 * **ReplaceNumericInterpolation**`<TContent, TReplace>`
 *
 * Replaces all instances of `${number}` in `TContent` with `TReplace`
 *
 * - when `TReplace` is single string then all instances are replaced with
 * this value
 * - when `TReplace` is an array of strings then strings are pulled off in a FIFO
 * manner to replace
 *
 * **Related:** `ReplaceStringInterpolation`
 */
export type ReplaceBooleanInterpolation<
    TContent extends string,
    TReplace extends string | readonly (string|number|boolean)[],
> = TReplace extends string
? Join<
    Replace<
        Split<TContent, [`${true}`,`${false}`], "inline">,
        `${boolean}`,
        TReplace
    >
>
: TReplace extends (string|number|boolean)[]
? Join<ReplaceStack<
    Split<TContent, [`${true}`,`${false}`], "inline">,
    `${boolean}`,
    ToStringArray<TReplace> extends readonly string[]
        ? ToStringArray<TReplace>
        : never
>>
: never;


