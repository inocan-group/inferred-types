import { Dictionary, Unique, IsObjectLiteral, Keys } from "@inferred-types/types";

/**
 * **CombinedKeys**`<A,B>`
 *
 * Provides a tuple of unique keys which incorporate all key values across
 * both `A` and `B`.
 *
 * ```ts
 * // [ "foo", "bar", "baz", "bax" ]
 * type T = CombinedKeys<{foo: 1; bar: 2; baz: 3}, {bar: 4; baz: 5; bax: 6}>
 * ```
 */
export type CombinedKeys<
  A extends Dictionary,
  B extends Dictionary
> = Unique<[
  ...(IsObjectLiteral<A> extends true ? Keys<A> : []),
  ...(IsObjectLiteral<B> extends true ? Keys<B> : []),
]>;

