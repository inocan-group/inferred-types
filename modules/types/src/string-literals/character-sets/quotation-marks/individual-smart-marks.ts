/**
 * **LeftDoubleMark**
 *
 * Standard left smart double quote in superscript position and glyph below
 * the tail.
 */
export type LeftDoubleMark = `“`;

/**
 * **RightDoubleMark**
 *
 * Standard right smart double quote in superscript position and glyph
 * above the tail.
 */
export type RightDoubleMark = `”`;

/**
 * **LeftSingleMark**
 *
 * Standard left smart single quote.
 */
export type LeftSingleMark = `‘`;
/**
 * **RightSingleMark**
 *
 * Standard right smart single quote.
 */
export type RightSingleMark = `’`;

/**
 * **LeftReversedDoublePrime**
 *
 * Left smart quote which has glyphs above the tail. Requires a
 * unicode character of two bytes.
 */
export type LeftReversedDoublePrime = `〝`;
/**
 * **RightReversedDoublePrime**
 *
 * Right smart quote which has glyphs above the tail. Requires a
 * unicode character of two bytes.
 */
export type RightReversedDoublePrime = `〞`;

/**
 * **LeftHeavySingleTurned**
 *
 * Specialized single left smart quote.
 */
export type LeftHeavySingleTurned = `❛`;

/**
 * **RightHeavySingleTurned**
 *
 * Specialized single right smart quote.
 */
export type RightHeavySingleTurned = `❜`;

export type LeftHeavyDoubleTurned = `❝`;
/**
 * **RightHeavyDoubleTurned**
 *
 * Specialized double right smart quote.
 */
export type RightHeavyDoubleTurned = `❞`;

export type LeftLowDoublePrime = `〟`;

/**
 * **FullWidthQuotation**
 *
 * A double quotation mark that takes the full width
 * of a fixed width space available and is centered
 * in that space.
 */
export type FullWidthQuotation = `＂`;
