import type { Filter } from "inferred-types/types";

/**
 * **IntersectWithAll**`<TList,TIntersection>`
 *
 * Type utility which iterates through each element of `TList` and intersects
 * the current value with `TIntersection`.
 *
 * - all intersections which evaluation to `never` are removed from the list
 * ```ts
 * type Arr = [1,2,"foo"];
 * // [1,2]
 * type Num = IntersectWithAll<Arr, number>;
 * ```
 */
export type IntersectWithAll<
  TList extends readonly unknown[],
  TIntersection,
> = Filter<{
  [K in keyof TList]: TList[K] & TIntersection
}, never>;
