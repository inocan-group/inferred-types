import type { RetainAfter } from "inferred-types/types";

/**
 * **retainAfter**`(content, ...find)`
 *
 * Runtime utility which removes all characters in a given string _until_
 * it finds the first instance of a substring defined in **find** variable.
 *
 * ### Example
 * ```ts
 * // "world"
 * const world = retainAfter("hello world", " ");
 * ```
 *
 * **Related:** `retainAfterInclusive()`
 */
export function retainAfter<
    TContent extends string,
    TFind extends readonly string[],
>(content: TContent, ...find: TFind) {
    const idx = Math.min(
        ...find.map(i => content.indexOf(i)).filter(i => i > -1),
    );
    const min = Math.min(...find.map(i => i.length));
    let len = Math.max(...find.map(i => i.length));

    if (min !== len) {
        if (!find.includes(content.slice(idx, len))) {
            len = min;
        }
    }

    return (
        idx && idx > 0
            ? content.slice(idx + len)
            : ""
    ) as RetainAfter<TContent, TFind[number]>;
}

/**
 * **retainAfterInclusive**`(content, ...find)`
 *
 * Runtime utility which removes all characters in a given string _until_
 * it finds the first instance of a substring defined in **find** variable.
 *
 * ### Example
 * ```ts
 * // " world"
 * const world = retainAfter("hello world", " ");
 * ```
 *
 * **Related:** `retainAfter()`
 */
export function retainAfterInclusive<
    TContent extends string,
    TFind extends readonly string[],
>(
    content: TContent,
    ...find: TFind
) {
    const minFound = Math.min(
        ...find.map(i => content.indexOf(i)).filter(i => i > -1),
    );

    return (
        minFound > 0
            ? content.slice(minFound)
            : ""
    ) as RetainAfter<TContent, TFind[number], true>;
}
