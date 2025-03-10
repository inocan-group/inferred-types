import type { StripAfterLast } from "inferred-types/types";
import { split } from "inferred-types/runtime";

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
    return split.inline(content, find).slice(0, -2).join("") as unknown as StripAfterLast<TContent, TBreak>;
}
