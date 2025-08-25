import type { AsLiteralTemplate, BracketNesting, Err, FromNamedNestingConfig, Nest, NestedString, Nesting, NestingConfig__Named, ReplaceAll } from "inferred-types/types";

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
};

// Helper to format content of the current node of a NestedString
// For level > 0 nodes, we need to remove {{child}} placeholders
type FormatWithBrackets<
    T extends NestedString
> = T["enterChar"] extends string
    ? T["exitChar"] extends string
        ? `${T["enterChar"]}${ReplaceAll<T["content"], "{{child}}", "">}${T["exitChar"]}`
        : `${T["enterChar"]}${ReplaceAll<T["content"], "{{child}}", "">}`
    : T["level"] extends 0
        ? T["content"] // Keep {{child}} for level 0 nodes
        : ReplaceAll<T["content"], "{{child}}", "">; // Remove {{child}} for level > 0

// Recursive helper to collect nodes at a specific level
type FilterByLevelRecursive<
    TNodes extends readonly NestedString[],
    L extends number,
    TResult extends readonly NestedString[] = []
> = TNodes extends readonly [infer First extends NestedString, ...infer Rest extends readonly NestedString[]]
    ? L extends First["level"]
        ? FilterByLevelRecursive<Rest, L, [...TResult, First]>
        : FilterByLevelRecursive<
            [...Rest, ...(First["children"] extends readonly NestedString[] ? First["children"] : [])],
            L,
            TResult
        >
    : TResult;

type FilterByLevel<
    T extends NestedString,
    L extends number
> = FilterByLevelRecursive<[T], L>;

// Helper to extract segments from content that contains {{child}} placeholders
// Splits "Bob{{child}} was angry at Mary{{child}}." into ["Bob", " was angry at ", "."]
// Filters out empty strings to handle edge cases like "{{child}}" → []
type ExtractSegments<
    TContent extends string,
    TAcc extends readonly string[] = []
> = TContent extends `${infer Before}{{child}}${infer After}`
    ? ExtractSegments<After, Before extends "" ? TAcc : [...TAcc, Before]>
    : TContent extends ""
        ? TAcc
        : [...TAcc, TContent];

// Helper to convert to template literal format using AsLiteralTemplate
type ToTemplate<TContent extends string>
    = AsLiteralTemplate<TContent, { child: "string" }>;

type FormatOutput<
    T extends readonly NestedString[],
    F extends NestingFormat
> = T extends readonly []
    ? F extends "string[]" ? [] : ""
    : T extends readonly [infer Single extends NestedString]
        ? Single["level"] extends 0
            ? F extends "string"
                ? ReplaceAll<Single["content"], "{{child}}", "">
                : F extends "string[]"
                    ? ExtractSegments<Single["content"]>
                    : F extends "template"
                        ? ToTemplate<Single["content"]>
                        : never
            : F extends "string"
                ? FormatWithBrackets<Single>
                : F extends "string[]"
                    ? [FormatWithBrackets<Single>]
                    : F extends "template"
                        ? FormatNodeForTemplate<Single>
                        : never
        : CombineMultiple<T, F>;

// Helper to format a single node for template output
type FormatNodeForTemplate<T extends NestedString>
    = T["content"] extends `${string}{{child}}${string}`
        ? T["enterChar"] extends string
            ? T["exitChar"] extends string
                ? `${T["enterChar"]}${ToTemplate<T["content"]>}${T["exitChar"]}`
                : `${T["enterChar"]}${ToTemplate<T["content"]>}`
            : ToTemplate<T["content"]>
        : FormatWithBrackets<T>;

// Helper to format level 1+ nodes for template output (converts {{child}} to ${string})
type FormatLevel1PlusForTemplate<T extends NestedString>
    = T["enterChar"] extends string
        ? T["exitChar"] extends string
            ? `${T["enterChar"]}${ToTemplate<T["content"]>}${T["exitChar"]}`
            : `${T["enterChar"]}${ToTemplate<T["content"]>}`
        : ToTemplate<T["content"]>;

// Helper to combine multiple nested strings
type CombineMultiple<
    T extends readonly NestedString[],
    F extends NestingFormat,
    TAcc = F extends "string[]" ? [] : ""
> = T extends readonly []
    ? TAcc
    : T extends readonly [infer First extends NestedString, ...infer Rest extends readonly NestedString[]]
        ? F extends "string"
            ? CombineMultiple<Rest, F, TAcc extends string ? `${TAcc}${FormatWithBrackets<First>}` : "">
            : F extends "string[]"
                ? CombineMultiple<Rest, F, TAcc extends readonly string[] ? [...TAcc, FormatWithBrackets<First>] : []>
                : F extends "template"
                    ? First["level"] extends 0
                        ? CombineMultiple<Rest, F, TAcc extends string ? `${TAcc}${FormatNodeForTemplate<First>}` : "">
                        : Rest extends readonly []
                            ? CombineMultiple<Rest, F, TAcc extends string ? `${TAcc}${FormatLevel1PlusForTemplate<First>}` : "">
                            : CombineMultiple<Rest, F, TAcc extends string ? `${TAcc}${FormatLevel1PlusForTemplate<First>}${string}` : "">
                    : never
        : TAcc;

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
> extends infer Structured
    ? Structured extends NestedString
        ? FilterByLevel<Structured, TLevel> extends infer Filtered extends readonly NestedString[]
            ? FormatOutput<
                Filtered,
                TOpt["output"] extends NestingFormat ? TOpt["output"] : "string"
            >
            : never
        : Structured extends { name: string; message: string }
            ? Structured // Return error-like objects (has name and message properties)
            : Structured extends Err<any, any, any>
                ? Structured // Return Err types
                : Err<"unknown", "An unknown error occurred during nesting", { structured: Structured }> // Wrap other errors
    : never;
