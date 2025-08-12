import type { IsStringLiteral } from "inferred-types/types";

type Process<
    TStr extends string,
    TResult extends readonly string[] = [],
> = TStr extends `${infer Char}${infer Rest}`
        ? Process<
            Rest,
            [...TResult, Char]
        >
        : TResult;

/**
 * **Chars**`<TStr>`
 *
 * Takes a literal string and converts it to an array of characters.
 */
export type Chars<
    TStr extends string,
> = string extends TStr
? string[]
: TStr extends ""
    ? []
    : Process<TStr> extends string[]
        ? Process<TStr>
        : never;
