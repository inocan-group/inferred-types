import type {
    ApplyTemplate,
    AsFromTo,
    Err,
    Expand,
    IsStringLiteral,
    RegexHandlingStrategy,
    ReplaceAllFromTo,
    StringLiteralTemplate,
    StripSurroundingStringTemplate,
} from "inferred-types/types";

export type RegexGroupValue = string | number | bigint | boolean | null | undefined;

/**
 * Converts the pseudo Regex (which hasn't been escaped to be "real" regex)
 * back to the curly braced template blocks expected by the `StringLiteralTemplate`
 * utility.
 */
type PrettyRegexToTemplate = AsFromTo<{
    "(.+?)": `{{string}}`;
    "(\\d+)": `{{number}}`;
    "(true|false)": `{{boolean}}`;
}>;

/**
 * Converts from _pretty_ regex to block template mode with `{{string}}`, etc.
 */
type AsTemplateString<
    T extends string
> = T extends `^${infer Inner}$`
    ? ReplaceAllFromTo<Inner, PrettyRegexToTemplate>
    : T extends `.*(${infer Inner}).*`
        ? `${string}${ReplaceAllFromTo<Inner, PrettyRegexToTemplate>}${string}`
        : never;

type Groups<
    TValue extends string,
    TTemplate extends string,
    TStrategy extends RegexHandlingStrategy
> = TStrategy extends "exact"
    ? ApplyTemplate<TValue, TTemplate, false>
    : TStrategy extends "subset"
        ? [
            TValue,
            StringLiteralTemplate<StripSurroundingStringTemplate<TTemplate>>,
            ...(
                ApplyTemplate<TValue, StripSurroundingStringTemplate<TTemplate>, false> extends readonly [
                    string,
                    ...infer Rest
                ]
                    ? Rest
                    : []
            )
        ]
        : never;

type _RegexArray<
    TTemplate extends string,
    TStrategy extends RegexHandlingStrategy,
    TValue extends string,
> = Expand<
    Groups<TValue, TTemplate, TStrategy>
    & Record<"kind", "RegexArray">
    & (TStrategy extends "subset"
        ? Record<"template", StripSurroundingStringTemplate<TTemplate>>
        : Record<"template", TTemplate>
    )
    & Record<"matchStrategy", TStrategy>
    & RegExpExecArray
    & Record<"input", TValue>
>;

/***
 * **RegexArray**`<TGroups, [TValue]>`
 *
 * When you call `exec()` on a regular expression you get a `RegExpExecArray` type
 * in return. Unfortunately this has no type information but this type tries to solve this.
 *
 * - When a successful match is made, the matched expression will be returned in it's entirety
 * as the first element (aka, index 0)
 * - the remaining array elements are the matches found within the parenthesis
 */
export type RegexArray<
    /** the template in a RegExp-like format for human readability */
    TTemplate extends string,
    TValue extends string
> = _RegexArray<
    AsTemplateString<TTemplate>,
    TTemplate extends `.*(${string}`
        ? "subset"
        : "exact",
    TValue
> extends infer R
    ? IsStringLiteral<TValue> extends true
        ? TValue extends StringLiteralTemplate<AsTemplateString<TTemplate>>
            ? R
            : Err<"no-match">
        : R
    : never;
