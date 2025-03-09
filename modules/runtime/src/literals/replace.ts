import type { AsFromTo, Dictionary, Replace, ReplaceAll, ReplaceAllFromTo } from "inferred-types/types";

/**
 * **replace**`(content, find, replace)`
 *
 * A runtime utility which will replace _the first_ instance of `find` found in `content` with `replace`
 * while preserving string literal content where possible.
 *
 * **Related:** `replaceAll()`, `replaceAllFromTo()`
 */
export function replace<
    TContent extends string,
    TFind extends string,
    TReplace extends string
>(
    content: TContent,
    find: TFind,
    replace: TReplace
) {
    return content.replace(find, replace) as Replace<TContent, TFind, TReplace>;
}

/**
 * **replaceAll**`(content, find, replace)`
 *
 * A runtime utility which will replace all instances of `find` found in `content` with `replace`
 * while preserving string literal content where possible.
 *
 * **Related:** `replace()`, `replaceAllFromTo()`
 */
export function replaceAll<
    TContent extends string,
    TFind extends string,
    TReplace extends string
>(
    content: TContent,
    find: TFind,
    replace: TReplace
) {
    return content.replaceAll(find, replace) as ReplaceAll<TContent, TFind, TReplace>;
}

/**
 * **replaceAllFromTo**`(content, defn)`
 *
 * Provided some textual content and a key/value transformation definition:
 *
 * - will convert all instances of the _keys_ in the definition to the _values_
 *
 * **Related:** `replace()`, `replaceAll()`
 */
export function replaceAllFromTo<
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
        output = replaceAll(output, key, fromTo[key as K]);
    }

    return output as unknown as ReplaceAllFromTo<TContent, AsFromTo<TFromTo>>;
}
