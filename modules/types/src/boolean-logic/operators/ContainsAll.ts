import type { And, Contains } from "inferred-types/types";



/**
 * **ContainsAll**`<TList, THasAll>`
 *
 * Type utility which provides a boolean response based on
 * whether the list `TList` contains _all_ of the values passed
 * in.
 *
 * **Related:** `DoesExtend`, `ContainsSome`
 */
export type ContainsAll<
  TList extends readonly unknown[],
  THasAll extends readonly unknown[],
> = And<{
  [K in keyof THasAll]: Contains<TList, THasAll[K]>
}>

