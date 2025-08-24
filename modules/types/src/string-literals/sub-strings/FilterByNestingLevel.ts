import { BracketNesting, FromNamedNestingConfig, Nest, NestedString, Nesting, NestingConfig__Named } from "inferred-types/types";


type FilterByNestingLevel__Options = {
    /**
     * The nesting level you want returned; the default is `0`.
     */
    level?: number;

    /**
     * The nesting strategy to use.
     *
     * - by default the `brackets` nesting strategy is used
     * - _named_ strategies include `brackets`, `quotes`, and `brackets-and-quotes`
     * - you can define your own strategy by passing in a `NestingKeyValue` or
     * `NestingTuple` configuration
     */
    strategy?: Nesting | NestingConfig__Named;

    /**
     * The type of output desired:
     *
     * - `string` (default) - _produces a single string with all text at the given
     * level concatenated together._
     * - `string[]` - _each string segment at the given level is returned as a tuple of strings_
     * - `template` - _returns a single string representing the text at the specified level
     * but where the text has content a level higher being removed, instead of just removing it
     * we will instead add in the `${string}` to indicate a "hole"._
     */
    output?: "string" | "string[]" | "template";
}

type TakeContent<
    T extends NestedString
> = T["enterChar"] extends string
    ? T["exitChar"] extends string
        ? `${T["enterChar"]}${T["content"]}${T["exitChar"]}`
    : `${T["enterChar"]}${T["content"]}`
: T["content"];


type Take<
    T extends readonly NestedString[],
    L extends number,
    R extends string = ""
> = T extends [infer Head extends NestedString, ...infer Rest extends readonly NestedString[]]
    ? Head["level"] extends L
        ? Take<
            Rest,
            L,
            `${R}${TakeContent<Head>}`
        >
        : Take<
            Rest,
            L,
            R
        >
: R;

/**
 * **FilterByNestingLevel**`<TContent, [TOpt]> -> string`
 *
 * Takes a string, applies _nesting_ logic to it, and returns only the content
 * at a specific level of the content (defaults to root/base level).
 *
 * - the default nesting layer that will be returned is root/base (aka, 0)
 * - the default nesting strategy is on bracketing
 *
 * These defaults can be modified by using the optional `TOpt` generic.
 *
 * **Related:** `Nest`
 */
export type FilterByNestingLevel<
    TContent extends string,
    TOpt extends FilterByNestingLevel__Options = {}
> = Take<
    Nest<TContent, TOpt["strategy"] extends Nesting | NestingConfig__Named ? FromNamedNestingConfig<TOpt["strategy"]> : BracketNesting>,
    TOpt["level"] extends number ? TOpt["level"] : 0
>
