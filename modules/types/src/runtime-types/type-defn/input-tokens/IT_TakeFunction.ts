import type { AlphaChar, Err, ErrType, IsInputToken, IT_Token, OptSpace } from "inferred-types/types";

type NamedSyncFunction<T extends string> = ;

type NamedAsyncFunction<T extends string> = ;

type AnonSyncFunction<T extends string> = ;

type AnonAsyncFunction<T extends string> = ;

type ArrowSyncFunction<T extends string> = ;

type ArrowAsyncFunction<T extends string> = ;


type ProcessVariants<T extends readonly (IT_Token<"function"> | Error)[]> = T extends [
    infer Head extends (IT_Token<"function"> | Error),
    ...infer Rest extends readonly (IT_Token<"function"> | Error)[]
]
    ? Head extends IT_Token<"function">
        ? Head
    : ErrType<Head> extends "malformed-token"
        ? Head
    : ProcessVariants<Rest>
: Err<"wrong-handler">;


type OptGenerics = `<${string}>` | "";

/**
 * **IT_TakeFunction**`<T>`
 *
 * Attempts to find a function (note: not a _generator_ function) at the head of a token string.
 * Will find the following variants:
 *
 *    - **named** _synchronous_ and _asynchronous_ functions
 *    - **anonymous** _synchronous_ and _asynchronous_ functions
 *    - **arrow** _synchronous_ and _asynchronous_ functions
 *
 * **Note:** _all variants also account for the possible use of **generics**_
 *
 * For **Generator** functions use `IT_TakeGeneratorFunction`.
 */
export type IT_TakeFunction<T extends string> = [
    T extends `function ${AlphaChar}${string}${OptGenerics}(${string}` ? NamedSyncFunction<T> : Error,
    T extends `async function ${AlphaChar}${string}${OptGenerics}(${string}` ? NamedAsyncFunction<T> : Error,
    T extends `function ${OptSpace}${OptSpace}${OptGenerics}(${string}` ? AnonSyncFunction<T> : Error,
    T extends `${OptGenerics}(${string})${string}=>${string}` ? ArrowSyncFunction<T> : Error,
    T extends `async ${OptSpace}${OptSpace}(${string})${string}=>${string}` ? ArrowAsyncFunction<T> : Error,
]

