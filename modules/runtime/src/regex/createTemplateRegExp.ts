import type {
    AsFromTo,
    Dictionary,
    RegexHandlingStrategy,
    RegularExpression,
    ReplaceAllFromTo,
    Surround,
} from "inferred-types/types";

type TemplateToRegex = AsFromTo<{
    "{{string}}": "(.+?)";
    "{{number}}": "(\\d+)";
    "{{boolean}}": "(true|false)";
}>;

function escapeRegExp(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function replaceAllFromTo<
    TContent extends string,
    TFromTo extends Dictionary<K, V>,
    K extends string,
    V extends string
>(
    content: TContent,
    fromTo: TFromTo
) {
    let output: string = content;

    for (const key of Object.keys(fromTo)) {
        output = output.replace(new RegExp(escapeRegExp(key), "g"), fromTo[key as K]);
    }

    return output as unknown as ReplaceAllFromTo<TContent, AsFromTo<TFromTo>>;
}

type RegexPattern<
    TContent extends string,
    THandling extends RegexHandlingStrategy,
> = THandling extends "exact"
    ? Surround<ReplaceAllFromTo<TContent, TemplateToRegex>, "^", "$">
    : Surround<ReplaceAllFromTo<TContent, TemplateToRegex>, ".*(", ").*">;


/**
 * **createTemplateRegExp**`(template, [handling])`
 *
 * A higher order function which:
 *
 * - on the first call you provide a static template which can leverage _dynamic
 * segments_ with the `{{string}}`, `{{number}}`, `{{boolean}}` tags.
 * - you can also specify a "strategy":
 *     - **exact** _(default strategy)_ - look for an exact match of the template provided
 *     - **subset** - look for the template as a _subset_/_sub-string_ of a larger string;
 * this allows text both before and after the template and will also add another grouping
 * level.
 *
 * What's returned from the first call is the same API surface as a regular expression provides
 * including the `.test(val)` and `.exec(match)` methods.
 *
 * - the `test()` utility returns a boolean value and _tries_ to resolve whether it is
 * true or false at _design time_ where possible.
 *
 * - if there is a match then an array will be returned:
 *     - the 0 index is always the full text which produced the match
 *     - if you used the **subset** strategy then index 1 will be the text
 * which matched the whole static template (and excluding any preamble or prolog)
 *     - all remaining indexes reference the various _dynamic regions_ specified in your
 * template.
 *         - the "type" of the dynamic segment will be used in the search and the
 *          type will set appropriately (e.g., a `{{number}}` dynamic segment will
 *          result in a numeric type)
 */
export function createTemplateRegExp<
    TContent extends string,
    THandling extends RegexHandlingStrategy = "exact"
>(
    template: TContent,
    handling: THandling = "exact" as THandling
) {
    /** safe characters used instead of curlies */
    const safe = replaceAllFromTo(template, {
        "{{string}}": "__STRING__",
        "{{number}}": "__NUMBER__",
        "{{boolean}}": "__BOOLEAN__",
    });

    const escaped = escapeRegExp(safe);

    const finalPattern = replaceAllFromTo(escaped, {
        "__STRING__": "(.+?)",
        "__NUMBER__": "(\\d+)",
        "__BOOLEAN__": "(true|false)",
    });

    type Pattern = RegexPattern<TContent, THandling>;

    const regex = handling === "exact"
        ? new RegExp(`^${finalPattern}$`) as RegularExpression<Pattern>
        : new RegExp(`.*(${finalPattern}).*`) as RegularExpression<Pattern>;
    (regex as any).pattern = finalPattern;

    return regex;
}
