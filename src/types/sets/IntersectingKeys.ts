import { AsRecord, Container, UnionToTuple } from "src/types/index";


/**
 * **IntersectingKeys**`<A,B>`
 * 
 * Provides a tuple of keys which are shared between the two 
 * containers passed in `A` and `B`.
 */
export type IntersectingKeys<
  L extends Container | object,
  R extends Container | object,
> = UnionToTuple<
  (keyof AsRecord<L>) & (keyof AsRecord<R>)
>;


