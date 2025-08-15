import type { StripAfterLast } from "inferred-types/types";
import { Never } from "inferred-types/constants";
import { isArray, split } from "inferred-types/runtime";

/**
 * **stripAfterLast**(content, find)
 *
 * Runtime utility which strips out all characters after (and including)
 * the _last_ instance of the "find" string while returning a strong type.
 *
 * ### Example
 * ```ts
 * // "hello world"
 * const hello = stripAfterLast("hello world Joey", " ");
 * ```
 */
export function stripAfterLast<
    TContent extends string,
    TBreak extends string,
>(content: TContent, find: TBreak) {
    const parts = split.inline(content, find) as any[];
    return (
        isArray(parts)
            ? parts.slice(0, -2).join("")
            : Never
    ) as unknown as StripAfterLast<TContent, TBreak>;
}
