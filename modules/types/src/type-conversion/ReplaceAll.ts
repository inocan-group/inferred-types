import type {
    AfterFirst,
    First,
    IsLiteralLike,
    IsStringLiteral,
    IsUnion,
    UnionToTuple,
} from "inferred-types/types";

type ReplaceAllLiterals<
    TText extends string,
    TFind extends string,
    TReplace extends string,
> = TText extends `${infer Head}${TFind}${infer Tail}`
    ? `${Head}${TReplace}${ReplaceAllLiterals<Tail, TFind, TReplace>}`
    : TText;

type Iterate<
    TText extends string,
    TFind extends readonly string[],
    TReplace extends string,
> = [] extends TFind
    ? TText
    : Iterate<
        ReplaceAllLiterals<TText, First<TFind>, TReplace>,
        AfterFirst<TFind>,
        TReplace
    >;

type Singular<
    TText extends string,
    TFind extends string,
    TReplace extends string,
> = IsStringLiteral<TText> extends true
    ? IsStringLiteral<TFind> extends true
        ? IsUnion<TFind> extends true
            ? UnionToTuple<TFind> extends readonly string[]
                ? Iterate<TText, UnionToTuple<TFind>, TReplace>
                : never
            : ReplaceAllLiterals<TText, TFind, TReplace>
        : string
    : string;

type EachTupleElement<
    TText extends readonly string[],
    TFind extends string,
    TReplace extends string,
> = { [K in keyof TText]: ReplaceAll<TText[K], TFind, TReplace> }; ;

/**
 * **ReplaceAll**`<TText,TFind,TReplace>`
 *
 * Type utility which takes a string `TText` and finds _all_ instances of
 * `TFind` and replaces it with `TReplace`.
 *
 * ```ts
 * const fooy = "fooy, Joey";
 * // "foo, Joe"
 * type Foo = ReplaceAll<typeof fooy, "y", "">;
 * ```
 *
 * **Related:** `Replace`
 *
 * - **Note:** this utility has been upgraded to take either a _string_ or a
 * _tuple_ of strings for `TText`.
 */
export type ReplaceAll<
    TText extends string | readonly string[],
    TFind extends string,
    TReplace extends string,
> = TText extends readonly string[]
    ? IsLiteralLike<TText> extends true
        ? EachTupleElement<TText, TFind, TReplace>
        : string[]
    : TText extends string
        ? Singular<TText, TFind, TReplace>
        : never;
