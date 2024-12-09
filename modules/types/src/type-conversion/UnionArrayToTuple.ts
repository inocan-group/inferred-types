import type { ElementOf } from "../lists/ElementOf";

// Existing utility: UnionToTuple (unchanged)
type UnionToIntersection<U> = (
  U extends unknown ? (arg: U) => 0 : never
) extends (arg: infer I) => 0 ? I : never;

type LastInUnion<U> = UnionToIntersection<
  U extends unknown ? (x: U) => 0 : never
> extends (x: infer L) => 0 ? L : never;

type UnionToTuple<U, Last = LastInUnion<U>> = [U] extends [never]
  ? []
  : [...UnionToTuple<Exclude<U, Last>>, Last];

/**
 * **UnionArrayToTuple**`<T>`
 *
 * If you have a type which is an _array_ of a Union type but you want to
 * represent this as a Tuple, this utility  will make this conversion for you.
 *
 * **Related:** `UnionToTuple`
 */
export type UnionArrayToTuple<T> = T extends any[]
  ? UnionToTuple<ElementOf<T>>
  : never;
