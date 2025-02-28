import type { StripBefore } from "inferred-types/types";

/**
 * **stripBefore**(content, find)
 *
 * Runtime utility which strips out all characters Before (and including)
 * the "find" string while returning a strong type.
 *
 * ### Example
 * ```ts
 * // "hello"
 * const hello = stripBefore("hello world", " ");
 * ```
 */
export function stripBefore<
    TContent extends string,
    TBreak extends string,
>(content: TContent, find: TBreak) {
    return content
        .split(find)
        .slice(1)
        .join(find) as StripBefore<TContent, TBreak>;
}
