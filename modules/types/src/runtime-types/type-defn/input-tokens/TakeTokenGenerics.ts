import { Err, FromInputToken, NestedSplit, StripLeading, Trim, TrimEach } from "inferred-types/types"
import { ExtendErr } from "types/errors/ExtendErr";

/**
 * the successful results of evaluating a single generic parameter
 */
type TokenParsed = {
    name: string;
    token: string
    type: unknown;
}

/**
 * all of the tokens found in a generics block plus the "rest"
 */
type GenericsParsed = {
    generics: TokenParsed[];
    rest: string;
}



export type TakeTokenGeneric<T extends string> =
T extends `${infer Name extends string} extends ${infer Type extends string}`
    ? {
            name: Name;
            token: Type;
            type: FromInputToken<Type>
        }
    : Err<`invalid-generic`, `The string token -- ${T} -- passed to TakeTokenGeneric<T> is invalid as an InputToken!`>
;


type ParseGenerics<
    T extends readonly string[],
    P extends readonly unknown[] = []
> = T extends [
    infer Head extends string,
    ...infer Rest extends readonly string[]
]
    ? TakeTokenGeneric<Head> extends Error
        ? ExtendErr<TakeTokenGeneric<Head>, {
            message: `TakeTokenGenerics<T> failed parsing the token "${Head}"!`,
            utility: "TakeTokenGeneric",
            token: Head,
            remaining: Rest
        }>
    : ParseGenerics<Rest, [...P, TakeTokenGeneric<Head>]>
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
export type TakeTokenGenerics<
    T extends string,
    TClean extends string = StripLeading<T, "<">
> = string extends T
? GenericsParsed | Error // Wide type

: NestedSplit<TClean, ","> extends Error
    ? NestedSplit<TClean, ","> // Error
: NestedSplit<TClean, ">"> extends [
    infer Block extends string,
    infer Rest extends string
]
    ? NestedSplit<Block, ","> extends Error
        ? ExtendErr<NestedSplit<Block, ",">, { utility: "TakeTokenGenerics" }> // Error
    : NestedSplit<Block, ","> extends readonly string[]
        ?  ParseGenerics<TrimEach<NestedSplit<Block, ",">>> extends Error
            ? ParseGenerics<TrimEach<NestedSplit<Block, ",">>> // Error
            : {
                generics: ParseGenerics<TrimEach<NestedSplit<Block, ",">>>;
                rest: Trim<Rest>;
            } // Successful outcome
        : never
: TClean;
