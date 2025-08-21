import type {
    ValidateCharacterSet,
    Err,
    ErrContext,
    FromInputToken,
    NestedSplit,
    StripChars,
    StripLeading,
    Trim,
    TrimEach,
    Whitespace,
    AlphanumericChar
} from "inferred-types/types";

/**
 * the successful results of evaluating a single generic parameter
 */
type TokenParsed = {
    name: string;
    token: string;
    type: unknown;
};

/**
 * all of the tokens found in a generics block plus the "rest"
 */
type GenericsParsed = {
    generics: TokenParsed[];
    rest: string;
};

export type IT_TakeTokenGeneric<T extends string>
= T extends `${infer Name extends string} extends ${infer Type extends string}`
    ? Trim<Name> extends infer CleanName extends string
        ? Trim<Type> extends infer CleanType extends string
            ? FromInputToken<CleanType> extends infer ParsedType
                ? {
                    name: CleanName;
                    token: CleanType;
                    type: ParsedType;
                }
                : never
            : never
        : never
: ValidateCharacterSet<
    T,
    AlphanumericChar | "_",
    Err<
        `malformed-token/generic`,
        `The string -- '${T}' -- passed to TakeTokenGeneric<T> is invalid as a generic name!`
    >
>


;

type ParseGenerics<
    T extends readonly string[],
    P extends readonly unknown[] = []
> = T extends [
    infer Head extends string,
    ...infer Rest extends readonly string[]
]
    ? IT_TakeTokenGeneric<Head> extends infer Result
        ? Result extends Error
            ? ErrContext<Result, {
                utility: "TakeTokenGeneric";
                token: Head;
                remaining: Rest;
            }>
            : ParseGenerics<Rest, [...P, Result]>
        : never
    : P;

/**
 * **TakeTokenGenerics**`<T>`
 *
 * Parses what is meant to be expected to be a a comma delimited set of
 * generic parameters terminating with a `>` character.
 *
 * **Note:**
 * - since this utility starts by stripping a leading character of `<`
 * (if it exists) you can pass in a token string that has _already_ had
 * this stripped off and this utility will work in the same way.
 *
 *
 * ```ts
 * {
 *    generics: [
 *        { name: "T", type: string },
 *        { name: "U", type: number | boolean }
 *    ],
 *    rest: "= ..."
 * type Generics = TakeTokenGenerics<"<T extends string, U extends number | boolean> = ...">
 * ```
 *
 * **Related**: `TakeKeyValueTokens`
 */
export type IT_TakeTokenGenerics<
    T extends string,
    TClean extends string = StripLeading<T, "<">
> = string extends T
    ? GenericsParsed | Error // Wide type

    : NestedSplit<TClean, ","> extends Error
        ? ErrContext<
            NestedSplit<TClean, ",">,
            { T: T; utility: "TakeTokenGenerics" }
        > // Error
        : NestedSplit<TClean, ">"> extends [
            infer Block extends string,
            infer Rest extends string
        ]
            ? NestedSplit<Block, ","> extends Error
                ? ErrContext<
                    NestedSplit<Block, ",">,
                    { utility: "TakeTokenGeneric"; T: T }
                > // Error
                : NestedSplit<Block, ","> extends infer GenericPairs extends readonly string[]
                    ? TrimEach<GenericPairs> extends infer TrimmedPairs extends readonly string[]
                        ? ParseGenerics<TrimmedPairs> extends infer ParsedResult
                            ? ParsedResult extends Error
                                ? ErrContext<
                                    ParsedResult,
                                    { utility: "TakeTokenGeneric"; T: T }
                                > // Error
                                : {
                                    generics: ParsedResult;
                                    rest: Trim<Rest>;
                                } // Successful outcome
                            : never
                        : never
                    : never
            : Err<
                `wrong-handler/generic`,
                `The string token passed in could not be parsed as a Generics block: ${T}`,
                { T: T; utility: "TakeTokenGenerics" }
            >;
