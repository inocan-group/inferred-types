import { Container,  Key, Tuple } from "src/types";


/**
 * **ContainerBlockKey**`<TContainer,TKey>`
 * 
 * Returns the `TContainer` value intersected with a guarantee that the
 * `TKey` key value exists.
 * ```ts
 * // { foo: 1; bar: unknown }
 * type TO = ContainerBlockKey<{foo: 1}, "bar">;
 * // number[] & readonly [unknown,unknown,unknown]
 * type TA = ContainerBlockKey<number[], 2>;
 * ```
 */
export type ContainerBlockKey<
  TContainer extends Container,
  TKey extends Key
> = TContainer extends Tuple 
  ? TContainer & [...Tuple<unknown, TKey & number>, never]
  : Exclude<TContainer, TKey>;

