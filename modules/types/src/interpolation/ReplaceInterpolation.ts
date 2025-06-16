import type {
    AfterFirst,
    First,
    IsEqual,
} from "inferred-types/types";


/**
 * determine replacement type
 */
type R<
    T extends string | readonly (string|number|boolean)[],
    D
> = T extends string
? T
: T extends readonly (string|number|boolean)[]
? T["length"] extends 0
    ? D
    : First<T>
: never;

type Next<T extends string | readonly (string|number|boolean)[]> = T extends string
? T
: T extends readonly (string|number|boolean)[]
    ? AfterFirst<T>
    : never;


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
? `${string}` extends First
    ? ReplaceStringInterpolation<
        Rest,
        Next<TReplace>,
        `${TResult}${R<TReplace, `${string}`>}`
    >
    : ReplaceStringInterpolation<
        Rest,
        TReplace,
        `${TResult}${First}`
    >

: IsEqual<`${string}`, TContent> extends true
    ? `${R<TContent, `${string}`>}${TResult}`
    : TResult;


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
    TReplace extends string | readonly (string | number | boolean)[],
    TResult extends string = ""
> = TContent extends `${infer First}${infer Rest}`
? `${number}` extends First
    ? ReplaceNumericInterpolation<
        Rest,
        Next<TReplace>,
        `${TResult}${R<TReplace, `${number}`>}`
    >
    : ReplaceNumericInterpolation<
        Rest,
        TReplace,
        `${TResult}${First}`
    >

: `${number}` extends TContent
    ? `${R<TContent, `${number}`>}${TResult}`
    : TResult;


/**
 * **ReplaceNumericInterpolation**`<TContent, TReplace>`
 *
 * Replaces all instances of `${boolean}` in `TContent` with `TReplace`
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
    TReplace extends string | readonly (string | number | boolean)[],
    TResult extends string = ""
> = [TContent] extends [`${infer First}${infer Rest}`]
? [`${boolean}`] extends [First]
    ? ReplaceBooleanInterpolation<
        Rest,
        Next<TReplace>,
        `${TResult}${R<TReplace, `${boolean}`>}`
    >
    : ReplaceBooleanInterpolation<
        Rest,
        TReplace,
        `${TResult}${First}`
    >

: [`${boolean}`] extends [TContent]
    ? `${R<TContent, `${boolean}`>}${TResult}`
    : TResult;
