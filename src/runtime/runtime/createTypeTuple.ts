import { Narrowable } from "types/literals/Narrowable";
import { TypeTuple } from "types/type-conversion/TypeTuple";
import { TypeGuard } from "types/TypeGuard";

export function createTypeTuple<
  T extends Narrowable,
  D extends string = ""
>(type: T, guard: TypeGuard<T>, desc?: D) {
  return [type, guard, desc ? desc : "" ] as TypeTuple<T,D>;
}
