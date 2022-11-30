/**
 * **Suggest**
 *
 * Type utility that helps to build a enumerated set
 * of string literals which _could_ be the value for
 * a string based property but _allows_ a string that
 * is not part of the suggestion to be typed in too.
 */
export type Suggest<T extends string> = T | (string & {});

/**
 * **SuggestNumeric**`<T>`
 *
 * Type utility that helps to build a enumerated set
 * of numeric literals which _could_ be the value for
 * a number based property but _allows_ a number that
 * is not part of the suggestion to be typed in too.
 */
export type SuggestNumeric<T extends number> = T | (number & {});
