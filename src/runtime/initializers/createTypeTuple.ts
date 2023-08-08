import { Narrowable , TypeTuple , TypeGuard } from "src/types";

/**
 * **createTypeTuple**(type, guard, desc)
 * 
 * Defined a `TypeTuple` based on the inputs provided.
 */
export function createTypeTuple<
  T extends Narrowable,
  D extends string = ""
>(type: T, guard: TypeGuard<T>, desc?: D) {
  return [type, guard, desc ? desc : "" ] as TypeTuple<T,D>;
}
