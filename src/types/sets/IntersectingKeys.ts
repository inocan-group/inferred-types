import { Container, UnionToTuple } from "src/types";


/**
 * Provides a tuple of keys which are shared between the two 
 * tuples passed in [`L`,`R`].
 */
export type IntersectingKeys<
  L extends Container,
  R extends Container,
> = UnionToTuple<
  (keyof L) & (keyof R)
>;

