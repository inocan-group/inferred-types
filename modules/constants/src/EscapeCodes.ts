import { narrow } from "./utils/narrow";

/**
 * The hexadecimal escape sequence used in Typescript
 *
 * - represents decimal `27`
 * - can also be represented as the `u001B` unicode character
 */
export const ESCAPE_CODE = `\x1B` as const;

/**
 * The **BEL** code can often be substituted as a terminal character.
 *
 * - often an alternative to `${TERMINATOR}`
 */
export const BEL = `\x07` as const;

/** Backspace character */
export const BACKSPACE = `\b` as const;

/** Horizontal tab character */
export const HORIZONTAL_TAB = `\t` as const;

/** Line feed character */
export const LINE_FEED = `\n` as const;

/** Carriage return character */
export const CARRIAGE_RETURN = `\r` as const;

/** Vertical tab character */
export const VERTICAL_TAB = `\v` as const;

/** Form feed character */
export const FORM_FEED = `\f` as const;

/** Null character */
export const NULL_CHAR = `\0` as const;

/** Delete character */
export const DELETE = `\x7F` as const;

/** File separator */
export const FILE_SEPARATOR = `\x1C` as const;

/** Group separator */
export const GROUP_SEPARATOR = `\x1D` as const;

/** Record separator */
export const RECORD_SEPARATOR = `\x1E` as const;

/** Unit separator */
export const UNIT_SEPARATOR = `\x1F` as const;

/** Standard, breakable space character */
export const SPACE = " " as const;

/** Non-breaking space keeps words on the same line */
export const NON_BREAKING_SPACE = "\u00A0" as const;

/**
 * En space
 *
 * a half an em wide, often used for moderate separation
 */
export const EN_SPACE = "\u2002" as const;

/**
 * **Em space**
 *
 * roughly the width of an M, used for strong separation
 */
export const EM_SPACE = "\u2003" as const;

/**
 * **Thin space**
 *
 * narrow separation, commonly around punctuation/symbols
 */
export const THIN_SPACE = "\u2009" as const;

/**
 * **Hair space**
 *
 * ultra-thin spacing for fine typographic tweaks
 */
export const HAIR_SPACE = "\u200A" as const;

/** Narrow no-break space — thin space that also prevents line breaks */
export const NARROW_NO_BREAK_SPACE = "\u202F" as const;

/**
 * **Ideographic space**
 *
 * full-width space used in CJK typography. Used in
 * Chinese, Japanese, and Korean scripts. These languages
 * use thousands of logographic/phonetic characters that
 * occupy full-width “ideographic” space.
 */
export const IDEOGRAPHIC_SPACE = "\u3000" as const;

/**
 * All of the "space" characters include the normal `SPACE` but also:
 *
 * - `NON_BREAKING_SPACE`,
 * - `EN_SPACE`,
 * - `EM_SPACE`,
 * - `THIN_SPACE`,
 * - `HAIR_SPACE`,
 * - `NARROW_NO_BREAK_SPACE`,
 * - and `IDEOGRAPHIC_SPACE`
 *
 */
export const SPACE_CHARS = narrow(
    SPACE,
    NON_BREAKING_SPACE,
    EN_SPACE,
    EM_SPACE,
    THIN_SPACE,
    HAIR_SPACE,
    NARROW_NO_BREAK_SPACE,
    IDEOGRAPHIC_SPACE
)


/**
 * Escape Code Characters
 *
 * Includes:
 *   - `ESCAPE_CODE`,
 *   - `BEL`,
 *   - `NON_BREAKING_SPACE`,
 *   - `LINE_FEED`,
 *   - `FORM_FEED`,
 *   - `HORIZONTAL_TAB`,
 *   - `CARRIAGE_RETURN`,
 *   - `FILE_SEPARATOR`
 *   - `GROUP_SEPARATOR`,
 *   - `RECORD_SEPARATOR`,
 *   - `UNIT_SEPARATOR`,
 *   - `NULL_CHAR`,
 *   - Unicode _space_ characters with differing widths/behaviors
 *   - _and more_
 */
export const ESCAPE_CODE_CHARS = narrow(
    ESCAPE_CODE,
    BEL,
    BACKSPACE,
    HORIZONTAL_TAB,
    LINE_FEED,
    CARRIAGE_RETURN,
    VERTICAL_TAB,
    FORM_FEED,
    NULL_CHAR,
    DELETE,
    FILE_SEPARATOR,
    GROUP_SEPARATOR,
    RECORD_SEPARATOR,
    UNIT_SEPARATOR,
    NON_BREAKING_SPACE,
    EN_SPACE,
    EM_SPACE,
    THIN_SPACE,
    HAIR_SPACE,
    NARROW_NO_BREAK_SPACE,
    IDEOGRAPHIC_SPACE
);
