import { As, AsLiteralTemplate, BracketNesting, Flatten, FromNamedNestingConfig, FromNesting, Join, Nest, NestedString, Nesting, NestingConfig__Named, ReplaceAll } from "inferred-types/types";

type NestingFormat = "string" | "string[]" | "template";

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
     * - `string[]` - _each string _segment_ at the given level is returned as a tuple of strings_
     * - `template` - _returns a single string representing the text at the specified level
     * but where the text has content a level higher being removed, instead of just removing it
     * we will instead add in the `${string}` to indicate a "hole"._
     */
    output?: NestingFormat;
}

// Helper to format content of the current node of a NestedString
type FormatWithBrackets<
    T extends NestedString
> = T["enterChar"] extends string
    ? T["exitChar"] extends string
        ? `${T["enterChar"]}${T["content"]}${T["exitChar"]}`
        : `${T["enterChar"]}${T["content"]}`
    : T["content"];




type FilterByLevel<
    T extends NestedString,
    L extends number
> = L extends 0
? [T]
: Flatten<{
    [K in keyof T["children"]]: T["children"][K] extends infer Item extends NestedString
        ? FilterByLevel<Item, L>
        : never
}>

type FormatOutput<
    T extends readonly NestedString[],
    F extends NestingFormat
> = F extends "string"
? ReplaceAll<Join<{
    [K in keyof T]: FormatWithBrackets<T[K]>
}, `{{child}}`>, "{{child}}", "">
: T extends "string[]"
? {
    [K in keyof T]: FormatWithBrackets<T[K]>
}
: T extends "template"
? AsLiteralTemplate<
    Join<As<{[K in keyof T]: FormatWithBrackets<T[K]>}, readonly string[]>, "{{child}}">,
    { child: "string" }
>
: never;



/**
 * **FilterByNestingLevel**`<TContent, [TOpt]> -> string | string[] | template`
 *
 * Takes a string, applies _nesting_ logic to it, and returns only the content
 * at a specific level of the content (defaults to root/base level).
 *
 * - the default nesting layer that will be returned is root/base (aka, 0)
 * - the default nesting strategy is on bracketing
 * - the default output is a concatenated string
 *
 * These defaults can be modified by using the optional `TOpt` generic.
 *
 * **Related:** `Nest`
 */
export type FilterByNestingLevel<
    TContent extends string,
    TOpt extends FilterByNestingLevel__Options = {},
    TLevel extends number = TOpt["level"] extends number ? TOpt["level"] : 0
> = Nest<
    TContent,
    TOpt["strategy"] extends infer Strategy extends NestingConfig__Named | Nesting
        ? FromNamedNestingConfig<Strategy>
        : BracketNesting
> extends infer Structured extends NestedString
    ? FilterByLevel<Structured, TLevel> extends infer Filtered extends readonly NestedString[]
        ? FormatOutput<
            Filtered,
            TOpt["output"] extends NestingFormat ? TOpt["output"] : "string"
        >
        : never
    : never


