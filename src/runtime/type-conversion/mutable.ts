import { Narrowable , Mutable } from "inferred-types/dist/types/index";

export function mutable<T extends Narrowable | readonly Narrowable[]>(value: T): Mutable<T> {
  return value as Mutable<T>;
}
