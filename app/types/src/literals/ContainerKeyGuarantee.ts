import { Container, ExpandRecursively,  Tuple } from "src/types/index";


/**
 * **ContainerKeyGuarantee**`<TContainer,TKey,[TType]>`
 * 
 * Returns the `TContainer` value intersected with a guarantee that the
 * `TKey` key value exists.
 * ```ts
 * // { foo: 1; bar: unknown }
 * type TO = ContainerKeyGuarantee<{foo: 1}, "bar">;
 * // number[] & readonly [unknown,unknown,unknown]
 * type TA = ContainerKeyGuarantee<number[], 2>;
 * ```
 * 
 * - by default the guarantee is provided by assigning the `unknown`
 * type but you can override this by setting `TType`
 */
export type ContainerKeyGuarantee<
  TContainer extends Container,
  TKey extends PropertyKey,
  TType = unknown
> = TContainer extends Tuple 
  ? TContainer & Readonly<[...Tuple<unknown, TKey & number>, TType]>
  : ExpandRecursively<TContainer & Record<TKey, TType>>;

