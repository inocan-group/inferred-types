import type {
    AsFromTo,
    Dictionary,
    RegexHandlingStrategy,
    RegularExpression,
    ReplaceAllFromTo,
    Surround,
} from "inferred-types/types";
import { err } from "inferred-types/runtime";

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
 * **createTemplateRegExp**`(template, [handling]) -> (api)`
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
 * What's returned from the first call is an API surface which mimics a regular expression API surface.
 *
 * - the `test()` utility returns a boolean value and _tries_ to resolve whether it is
 * true or false at _design time_ where possible.
 *
 * - the `exec()` function tests for matches of not only an overall pattern but sub-patterns
 * which would be defined by parenthesis in regular RegExp but in our case the _dynamic segments_
 * defined by string like `{{string}}`, etc.
 *     - if there is a match then an array will be returned:
 *         - the 0 index is always the full text which produced the match
 *         - if you used the **subset** strategy then index 1 will be the text
 *         which matched the whole static template (but excluding any _preamble_ or _prolog_)
 *         - all remaining indexes reference the various _dynamic regions_ (e.g., `{{string}}`, etc.)
 * specified in your template.
 *         - the "type" of the dynamic segment will be used in the search and the
 *          type will set appropriately (e.g., a `{{number}}` dynamic segment will
 *          result in a numeric type)
 *     - if a match is NOT found then an error of the type "no-match" will be returned.
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

    const innerPattern = finalPattern;
    const fullPattern = handling === "exact"
        ? `^${innerPattern}$`
        : `.*(${innerPattern}).*`;

    const regex = new RegExp(fullPattern);

    // capture the dynamic segment types in order of appearance
    const segmentTypes = Array.from(template.matchAll(/\{\{(string|number|boolean)\}\}/g)).map(i => i[1]);

    const api: RegularExpression<Pattern> = {
        kind: "RegexpArray",
        pattern: fullPattern as Pattern,
        get source() { return regex.source; },
        get flags() { return regex.flags; },
        get dotAll() { return (regex as any).dotAll; },
        get global() { return regex.global; },
        get ignoreCase() { return regex.ignoreCase; },
        get multiline() { return regex.multiline; },
        get sticky() { return (regex as any).sticky; },
        get unicode() { return (regex as any).unicode; },
        get lastIndex() { return regex.lastIndex; },
        set lastIndex(v: number) { regex.lastIndex = v; },
        [Symbol.match](str: string) { return (regex as any)[Symbol.match](str); },
        [Symbol.replace](str: string, repl: string) { return (regex as any)[Symbol.replace](str, repl); },
        [Symbol.search](str: string) { return (regex as any)[Symbol.search](str); },
        [Symbol.split](str: string, limit?: number) { return (regex as any)[Symbol.split](str, limit as any); },
        test(test: string) {
            return regex.test(test) as any;
        },
        exec<T extends string>(test: T) {
            const m = regex.exec(test);
            if (!m) {
                return err("no-match") as any;
            }

            const offset = handling === "exact" ? 1 : 2;

            const out: any[] = [];
            // full match
            out.push(m[0]);
            // subset captured whole template match
            if (handling === "subset") {
                out.push(m[1]);
            }
            // dynamic segments
            for (let i = 0; i < segmentTypes.length; i++) {
                const segType = segmentTypes[i];
                const raw = m[i + offset];
                const val = segType === "number"
                    ? Number(raw)
                    : segType === "boolean"
                        ? raw === "true"
                        : raw;
                out.push(val);
            }

            // enrich to be array-like RegExpExecArray
            const result: any = Object.assign([], out);
            for (let i = 0; i < out.length; i++) {
                result[i] = out[i];
            }
            result.index = m.index;
            result.input = m.input;
            result.groups = m.groups;
            result.kind = "RegexArray";
            result.template = template;
            result.matchStrategy = handling;
            return result;
        },
        toString() { return regex.toString(); }
    } as any;

    return api;
}
