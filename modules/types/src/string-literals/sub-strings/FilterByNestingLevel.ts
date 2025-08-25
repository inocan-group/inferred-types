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

// Helper to format content with brackets when at level > 0
type FormatWithBrackets<
    T extends NestedString
> = T["enterChar"] extends string
    ? T["exitChar"] extends string
        ? `${T["enterChar"]}${T["content"]}${T["exitChar"]}`
        : `${T["enterChar"]}${T["content"]}`
    : T["content"];

// Traverse the hierarchical structure and collect content at the specified level
type CollectAtLevel<
    T extends readonly NestedString[],
    L extends number,
    CurrentLevel extends number = 0,
    Result extends string = ""
> = L extends CurrentLevel
    // We're at the target level - collect content from this level
    ? T extends readonly [infer Head extends NestedString, ...infer Rest extends readonly NestedString[]]
        ? CollectAtLevel<
            Rest,
            L,
            CurrentLevel,
            `${Result}${Head["content"]}${
                Head["children"] extends readonly []
                    ? ""
                    : CollectChildrenAsHoles<Head["children"]>
            }`
        >
        : Result
    // We need to go deeper - recurse into children
    : T extends readonly [infer Head extends NestedString, ...infer Rest extends readonly NestedString[]]
        ? `${CollectAtLevel<Head["children"], L, Add<CurrentLevel, 1>>}${
            CollectAtLevel<Rest, L, CurrentLevel>
        }`
        : "";

// For level 0 content, represent nested content as "holes"
type CollectChildrenAsHoles<
    T extends readonly NestedString[]
> = T extends readonly [infer Head extends NestedString, ...infer Rest extends readonly NestedString[]]
    ? FormatWithBrackets<Head> extends infer Formatted extends string
        ? Rest extends readonly []
            ? Formatted
            : `${Formatted}${CollectChildrenAsHoles<Rest>}`
        : never
    : "";

// Collect content at specified level with proper formatting
type CollectAtLevelWithBrackets<
    T extends readonly NestedString[],
    L extends number,
    CurrentLevel extends number = 0,
    Result extends string = ""
> = L extends 0
    // Level 0 - collect only the content, NOT the children
    ? T extends readonly [infer Head extends NestedString, ...infer Rest extends readonly NestedString[]]
        ? CollectAtLevelWithBrackets<
            Rest,
            L,
            CurrentLevel,
            `${Result}${Head["content"]}`
        >
        : Result
    : L extends 1
        // Level 1 - collect and format children from root segments
        ? T extends readonly [infer Head extends NestedString, ...infer Rest extends readonly NestedString[]]
            ? CollectAtLevelWithBrackets<
                Rest,
                L,
                CurrentLevel,
                `${Result}${CollectFormattedChildren<Head["children"]>}`
            >
            : Result
        // Level 2+ - need to go deeper
        : CollectDeeperLevel<T, L>;

// Helper to collect from deeper levels (2+)
type CollectDeeperLevel<
    T extends readonly NestedString[],
    L extends number,
    Result extends string = ""
> = T extends readonly [infer Head extends NestedString, ...infer Rest extends readonly NestedString[]]
    ? L extends 2
        // Level 2 - collect from children's children
        ? CollectDeeperLevel<
            Rest,
            L,
            `${Result}${CollectLevel2String<Head["children"]>}`
        >
        : Result
    : Result;

// Helper to collect level 2 content from children
type CollectLevel2String<
    T extends readonly NestedString[],
    Result extends string = ""
> = T extends readonly [infer Head extends NestedString, ...infer Rest extends readonly NestedString[]]
    ? CollectLevel2String<
        Rest,
        `${Result}${CollectFormattedChildren<Head["children"]>}`
    >
    : Result;

// Format children at the target level with brackets
type CollectFormattedChildren<
    T extends readonly NestedString[]
> = T extends readonly [infer Head extends NestedString, ...infer Rest extends readonly NestedString[]]
    ? `${FormatWithBrackets<Head>}${CollectFormattedChildren<Rest>}`
    : "";

// Collect segments at level as array
type CollectAtLevelAsArray<
    T extends readonly NestedString[],
    L extends number,
    Result extends readonly string[] = []
> = L extends 0
    // Level 0: collect content from root-level segments
    ? T extends readonly [infer Head extends NestedString, ...infer Rest extends readonly NestedString[]]
        ? Head["content"] extends ""
            ? Head["children"] extends readonly []
                ? CollectAtLevelAsArray<Rest, L, Result>
                : CollectAtLevelAsArray<Rest, L, Result>
            : CollectAtLevelAsArray<Rest, L, [...Result, Head["content"]]>
        : Result
    : L extends 1
        // Level 1: collect formatted children from root-level segments
        ? T extends readonly [infer Head extends NestedString, ...infer Rest extends readonly NestedString[]]
            ? CollectAtLevelAsArray<
                Rest,
                L,
                [...Result, ...FormatChildrenAsArray<Head["children"]>]
            >
            : Result
        // Level 2+: need to go deeper
        : CollectDeeperAsArray<T, L>;

// Helper to format children with brackets and return as array
type FormatChildrenAsArray<
    T extends readonly NestedString[]
> = T extends readonly [infer Head extends NestedString, ...infer Rest extends readonly NestedString[]]
    ? [FormatWithBrackets<Head>, ...FormatChildrenAsArray<Rest>]
    : [];

// Helper to collect from deeper levels
type CollectDeeperAsArray<
    T extends readonly NestedString[],
    L extends number,
    Result extends readonly string[] = []
> = T extends readonly [infer Head extends NestedString, ...infer Rest extends readonly NestedString[]]
    ? L extends 2
        // Level 2: collect from children's children
        ? CollectDeeperAsArray<
            Rest,
            L,
            [...Result, ...CollectLevel2FromChildren<Head["children"]>]
        >
        : Result
    : Result;

// Helper to collect level 2 content from children
type CollectLevel2FromChildren<
    T extends readonly NestedString[],
    Result extends readonly string[] = []
> = T extends readonly [infer Head extends NestedString, ...infer Rest extends readonly NestedString[]]
    ? CollectLevel2FromChildren<
        Rest,
        [...Result, ...FormatChildrenAsArray<Head["children"]>]
    >
    : Result;

// Helper: Add numbers
type Add<A extends number, B extends number = 1> =
    A extends 0 ? B :
    A extends 1 ? B extends 1 ? 2 : never :
    A extends 2 ? B extends 1 ? 3 : never :
    A extends 3 ? B extends 1 ? 4 : never :
    A extends 4 ? B extends 1 ? 5 : never :
    A extends 5 ? B extends 1 ? 6 : never :
    number;

// Template output: Collect content at level with ${string} placeholders for nested content
type CollectAtLevelAsTemplate<
    T extends readonly NestedString[],
    L extends number,
    Result extends string = ""
> = L extends 0
    // Level 0: Collect root content and replace nested parts with ${string}
    ? T extends readonly [infer Head extends NestedString, ...infer Rest extends readonly NestedString[]]
        ? Head["children"] extends readonly []
            // No children, just add the content
            ? CollectAtLevelAsTemplate<Rest, L, `${Result}${Head["content"]}`>
            // Has children, add content and ${string} placeholder
            : CollectAtLevelAsTemplate<Rest, L, `${Result}${Head["content"]}${string}`>
        : Result
    // Level 1+: For deeper levels, we need to collect the content at that level
    // and insert ${string} where there's deeper nesting
    : CollectDeeperLevelAsTemplate<T, L>;

// Helper for deeper levels in template mode
type CollectDeeperLevelAsTemplate<
    T extends readonly NestedString[],
    L extends number,
    Result extends string = ""
> = T extends readonly [infer Head extends NestedString, ...infer Rest extends readonly NestedString[]]
    ? L extends 1
        // Level 1: Collect formatted children with placeholders for their children
        ? CollectDeeperLevelAsTemplate<
            Rest,
            L,
            `${Result}${CollectChildrenAsTemplateAtLevel<Head["children"], 1>}`
        >
        : L extends 2
            // Level 2: Go deeper into children
            ? CollectDeeperLevelAsTemplate<
                Rest,
                L,
                `${Result}${CollectLevel2AsTemplate<Head["children"]>}`
            >
            : Result
    : Result;

// Helper to collect children as template at a specific level
type CollectChildrenAsTemplateAtLevel<
    T extends readonly NestedString[],
    TargetLevel extends number
> = T extends readonly [infer Head extends NestedString, ...infer Rest extends readonly NestedString[]]
    ? TargetLevel extends 1
        // At level 1, we want to include the brackets and content, but replace nested children with ${string}
        ? Head["children"] extends readonly []
            // No deeper nesting, format with brackets
            ? `${FormatWithBrackets<Head>}${CollectChildrenAsTemplateAtLevel<Rest, TargetLevel>}`
            // Has deeper nesting, format with placeholder
            : `${Head["enterChar"] extends string ? Head["enterChar"] : ""}${Head["content"]}${string}${Head["exitChar"] extends string ? Head["exitChar"] : ""}${CollectChildrenAsTemplateAtLevel<Rest, TargetLevel>}`
        : ""
    : "";

// Helper for level 2 template collection
type CollectLevel2AsTemplate<
    T extends readonly NestedString[],
    Result extends string = ""
> = T extends readonly [infer Head extends NestedString, ...infer Rest extends readonly NestedString[]]
    ? CollectLevel2AsTemplate<
        Rest,
        `${Result}${CollectChildrenAsTemplateAtLevel<Head["children"], 2>}`
    >
    : Result;

// For level 2, format children at that level with placeholders for deeper content
type CollectChildrenAsTemplateAtLevel2<
    T extends readonly NestedString[]
> = T extends readonly [infer Head extends NestedString, ...infer Rest extends readonly NestedString[]]
    ? Head["children"] extends readonly []
        ? `${FormatWithBrackets<Head>}${CollectChildrenAsTemplateAtLevel2<Rest>}`
        : `${Head["enterChar"] extends string ? Head["enterChar"] : ""}${Head["content"]}${string}${Head["exitChar"] extends string ? Head["exitChar"] : ""}${CollectChildrenAsTemplateAtLevel2<Rest>}`
    : "";

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
    TOpt extends FilterByNestingLevel__Options = {}
> = TOpt["output"] extends "template"
    ? CollectAtLevelAsTemplate<
        Nest<TContent, TOpt["strategy"] extends Nesting | NestingConfig__Named ? FromNamedNestingConfig<TOpt["strategy"]> : BracketNesting>,
        TOpt["level"] extends number ? TOpt["level"] : 0
    >
    : TOpt["output"] extends "string[]"
        ? CollectAtLevelAsArray<
            Nest<TContent, TOpt["strategy"] extends Nesting | NestingConfig__Named ? FromNamedNestingConfig<TOpt["strategy"]> : BracketNesting>,
            TOpt["level"] extends number ? TOpt["level"] : 0
        >
        : CollectAtLevelWithBrackets<
            Nest<TContent, TOpt["strategy"] extends Nesting | NestingConfig__Named ? FromNamedNestingConfig<TOpt["strategy"]> : BracketNesting>,
            TOpt["level"] extends number ? TOpt["level"] : 0
        >
