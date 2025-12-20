import type { ESCAPE_CODE_CHARS } from "inferred-types/constants";

/**
 * The Unicode codepoint for a non-breaking space
 */
export type NBSP = "\u00A0";

/**
 * A non-breaking space
 */
export type NonBreakingSpace = "\u00A0";

/**
 * **EmSpace*8
 *
 * Roughly the width of an `M`, used for strong separation
 */
export type EmSpace = `\u2003`;
/**
 * **EnSpace**
 *
 * Half an **em** wide, often used for moderate separation
 */
export type EnSpace = `\u2002`;
/**
 * **ThinSpace**
 *
 * Narrow separation, commonly around punctuation/symbols
 */
export type ThinSpace = `\u2009`;
/**
 * **HairSpace**
 *
 * Ultra-thin spacing for fine typographic tweaks
 */
export type HairSpace = `\u200A`;
/**
 * **NarrowNonBreakingSpace**
 *
 * Thin space that also prevents line breaks
 */
export type NarrowNonBreakingSpace = `\u202F`;

/**
 * **IdeographicSpace**
 *
 * full-width space used in CJK typography. Used in
 * Chinese, Japanese, and Korean scripts. These languages
 * use thousands of logographic/phonetic characters that
 * occupy full-width “ideographic” space.
 */
export type IdeographicSpace = `\u3000`;

/**
 * **SpaceChars**
 *
 * All of the characters which represent a space,
 * including the normal " " character but also:
 *
 * - `NonBreakingSpace`
 * - `EmSpace`
 * - `EnSpace`
 * - `ThinSpace`
 * - `HairSpace`
 * - `NarrowNonBreakingSpace`
 * - `IdeographicSpace`
 */
export type SpaceChars = " "
    | NBSP
    | NonBreakingSpace
    | EmSpace
    | EnSpace
    | ThinSpace
    | HairSpace
    | NarrowNonBreakingSpace
    | IdeographicSpace;

/**
 * Common escape/control characters and space variants
 * (ESC, BEL, line/paragraph controls, tabs, delete, separators, and
 * various width-breaking spaces)
 */
export type EscapeCodeChars = typeof ESCAPE_CODE_CHARS[number];
