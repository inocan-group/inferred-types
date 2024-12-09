/**
 * **Awaited**`<T>`
 *
 * Unwraps the expected return value inside a promise-like
 * result.
 */
export type Awaited<T> = T extends PromiseLike<infer Inner>
  ? Inner
  : never;
