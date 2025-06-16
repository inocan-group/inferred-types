import type {
    AfterFirst,
    First,
    IsEqual,
    IsLessThan,
    IsUnion,
    ReplaceAll,
    UnionToTuple,
} from "inferred-types/types";

/**
 * determine replacement type
 */
type R<
    T extends string | readonly (string | number | boolean)[],
    D
> = T extends string
    ? T
    : T extends readonly (string | number | boolean)[]
        ? T["length"] extends 0
            ? D
            : First<T>
        : never;

type Next<T extends string | readonly (string | number | boolean)[]> = T extends string
    ? T
    : T extends readonly (string | number | boolean)[]
        ? AfterFirst<T>
        : never;

/**
 * **ReplaceStringInterpolation**`<TContent, TReplace>`
 *
 * Replaces all instances of `${string}` in `TContent` with `TReplace`
 */
export type ReplaceStringInterpolation<
    TContent extends string,
    TReplace extends string | readonly (string | number | boolean)[],
    TResult extends string = ""
> = TContent extends `${infer First}${infer Rest}`
    ? [IsEqual<First, `${string}`>] extends [true]
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

    : [TContent] extends [""]
        ? TResult
        : [IsEqual<TContent, `${string}`>] extends [true]
            ? `${TResult}${R<TReplace, `${string}`>}`
            : `${TResult}${TContent}`;

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
    ? [IsEqual<First, `${number}`>] extends [true]
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
    : [TContent] extends [""]
        ? TResult
        : [IsEqual<TContent, `${number}`>] extends [true]
            ? `${TResult}${R<TReplace, `${number}`>}`
            : `${TResult}${TContent}`;

type ReplaceTrueFalse<
    T extends readonly string[],
    R extends string,
    TResult extends readonly string[] = []
> = [] extends T
    ? TResult[number]
    : ReplaceTrueFalse<
        AfterFirst<T>,
        R,
        [
            ...TResult,
            ReplaceAll<First<T>, "true" | "false", R>
        ]
    >

;

/**
 * **ReplaceBooleanInterpolation**`<TContent, TReplace>`
 *
 * Replaces all instances of `${boolean}` in `TContent` with `TReplace`
 *
 * **Note:**
 * - the `${boolean}` type is far more difficult to work with then
 * the `${string}` and `${number}` template literals.
 * - this is due to the fact that Typescript immediately converts a `${boolean}` into a union type
 *
 * **Related:** `ReplaceStringInterpolation`, `ReplaceNumericInterpolation`
 */
export type ReplaceBooleanInterpolation<
    TContent extends string,
    TReplace extends string,
> = IsUnion<TContent> extends true
    ? UnionToTuple<TContent>["length"] extends number
        ? IsLessThan<UnionToTuple<TContent>["length"], 10> extends true
            ? UnionToTuple<TContent> extends readonly string[]
                ? ReplaceTrueFalse<UnionToTuple<TContent>, TReplace>
                : TContent
            : TContent
        : TContent
    : TContent;
