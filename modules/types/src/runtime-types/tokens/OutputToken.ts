
/**
 * **TypeToken**
 *
 * An type token is just a _valid_ string-based `InputToken`
 * wrapped in delimiters.
 *
 * **Related:** `isTypeToken()`, `asTypeToken()`, `ToTypeToken<T>`
 */
export type TypeToken<T extends string> = `<<${T}>>`


