import { Narrowable , TypeTuple , TypeGuard } from "src/types";

export function createTypeTuple<
  T extends Narrowable,
  D extends string = ""
>(type: T, guard: TypeGuard<T>, desc?: D) {
  return [type, guard, desc ? desc : "" ] as TypeTuple<T,D>;
}
