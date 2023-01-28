import { Narrowable , TypeTuple , TypeGuard } from "../../types";

export function createTypeTuple<
  T extends Narrowable,
  D extends string = ""
>(type: T, guard: TypeGuard<T>, desc?: D) {
  return [type, guard, desc ? desc : "" ] as TypeTuple<T,D>;
}
