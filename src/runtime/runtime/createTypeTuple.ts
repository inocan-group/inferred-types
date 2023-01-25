import { Narrowable } from "src/types/Narrowable";
import { TypeTuple } from "src/types/type-conversion/TypeTuple";
import { TypeGuard } from "src/types/TypeGuard";

export function createTypeTuple<
  T extends Narrowable,
  D extends string = ""
>(type: T, guard: TypeGuard<T>, desc?: D) {
  return [type, guard, desc ? desc : "" ] as TypeTuple<T,D>;
}
