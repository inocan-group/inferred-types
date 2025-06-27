/**
 * **AsDefined**`<T>`
 *
 * Ensures that if `T` includes _undefined_ as part of a union, it is
 * removed.
 */
export type AsDefined<T> = Exclude<T, undefined>;
