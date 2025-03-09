import type {
    AsFromTo,
    Dictionary,
    RegexHandlingStrategy,
    RegularExpression,
    ReplaceAllFromTo,
    Surround,
} from "inferred-types/types";
import { reverseLookup } from "src/dictionary";

const templateToRegex = {
    "{{string}}": "(.+?)",
    "{{number}}": "(\\d+)",
    "{{boolean}}": "(true|false)"
} as const;
const regexToTemplate = reverseLookup(templateToRegex);
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
