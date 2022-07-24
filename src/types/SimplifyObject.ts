import { ExpandRecursively } from "./ExpandRecursively";
import { UnionToIntersection } from "./type-conversion/UnionToIntersection";

/**
 * Often when mutating the shape of an object you will end up with the union of a number of
 * `Record<string, x>` and `Record<string, y>` which is messy to look at and take away meaning.
 *
 * This type utility will cleanup an object and return a simple dictionary definition for it.
 */
export type SimplifyObject<T extends {}> = ExpandRecursively<
  UnionToIntersection<ExpandRecursively<T>>
>;
