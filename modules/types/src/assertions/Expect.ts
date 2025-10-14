/**
 * **Expect**`<T>`
 *
 * A type testing assertion which is expected to evaluate to `true`.
 *
 * - often used with the `Test` type utility (also from **inferred-types**
 * library)
 * - use with `Test` is preferred as it eliminates silent errors such when
 * tests evaluate to `never` or `any` and provides a meaningful error report
 * - but any assertion which is expected to result in `true` is a valid test
 * here
 */
export type Expect<T extends true> = T;
