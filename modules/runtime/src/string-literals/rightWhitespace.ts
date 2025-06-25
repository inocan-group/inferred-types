import type { RetainAfter,  TrimStart, Whitespace } from "inferred-types/types";
import { WHITESPACE_CHARS } from "inferred-types/constants";
import { retainAfterInclusive } from "inferred-types/runtime";

/**
 * **rightWhitespace**`(content)`
 *
 * Extracts and returns the whitespace on the _right_ part of the string.
 */
export function rightWhitespace<T extends string>(content: T) {
    const trimmed = content.trimStart() as string;
    return retainAfterInclusive(
        trimmed,
        ...WHITESPACE_CHARS,
    ) as unknown as RetainAfter<TrimStart<T>, Whitespace, true>;
}
