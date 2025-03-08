import {
    AsFromTo,
    ReplaceAllToFrom,
    RegularExpression,
    Dictionary,
    ReplaceAllFromTo
} from "inferred-types/types";

type EscapeRegExp = AsFromTo<{
    ".": "\\.",
    "*": "\\*",
    "+": "\\+",
    "?": "\\?",
    "^": "\\^",
    "$": "\\$",
    "{": "\\{",
    "}": "\\}",
    "(": "\\(",
    ")": "\\)",
    "|": "\\|",
    "[": "\\[",
    "]": "\\]",
    "\\": "\\\\"
}>;

function escapeRegExp(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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

export function createTemplateRegExp<T extends string>(template: T) {
    /** safe characters used instead of curlies */
    const safe = replaceAllFromTo(template,  {
        "{{string}}": "__STRING__",
        "{{number}}": "__NUMBER__",
        "{{boolean}}": "__BOOLEAN__",
    });

    const escaped = escapeRegExp(safe);

    // Replace temporary markers with actual regex patterns
    const finalPattern = replaceAllFromTo(escaped, {
        "__STRING__": "(.+?)",
        "__NUMBER__": "(\\d+)",
        "__BOOLEAN__": "(true|false)",
    });

    const regex = new RegExp(`^${finalPattern}$`) as RegularExpression<T>
    (regex as any).pattern = finalPattern;

    return regex;
}

