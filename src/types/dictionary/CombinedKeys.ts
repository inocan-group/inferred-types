import { AnyObject } from "../base-types/AnyObject";
import { Unique } from "../sets/Unique";
import { ExplicitKeys } from "./ExplicitKeys";

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
  A extends AnyObject, 
  B extends AnyObject
> = Unique<[
  ...ExplicitKeys<A>,
  ...ExplicitKeys<B> 
]>;
