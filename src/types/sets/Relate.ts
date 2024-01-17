import { Container,  IntersectingKeys, LeftRight, Length, UniqueKeys } from "src/types/index";

/**
 * **Relate**`<L,R>`
 * 
 * Provides the relationship between two sets:
 * 
 * - **sameLength**: boolean flag
 * - **sharedKeys**: the shared keys between the two sets
 * - **uniqueKeys**: the unique keys _per_ list in a `LeftRight` struct.
 */
export type Relate<L extends Container,R extends Container> = {
  length: LeftRight<Length<L>,Length<R>>;
  sharedKeys: IntersectingKeys<L,R>;
  uniqueKeys: UniqueKeys<L,R>;
};
