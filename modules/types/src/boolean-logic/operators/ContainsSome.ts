import type { Contains, Or } from "inferred-types/types";

/**
 * **ContainsSome**`<TList, TFind>`
 *
 * Type utility which provides a boolean response based on
 * whether the list `TList` contains _some_ of the values passed
 * in for `TFind`.
 *
 * **Related:** `DoesExtend`, `ContainsSome`
 */
export type ContainsSome<
  TList extends readonly unknown[],
  TFind extends readonly unknown[],
> = Or<{
  [K in keyof TFind]: Contains<TList, TFind[K]>
}>;
