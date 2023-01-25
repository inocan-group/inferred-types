import { Narrowable } from "types/literals/Narrowable";
import { Mutable } from "types/type-conversion/Mutable";

export function mutable<T extends Narrowable | readonly Narrowable[]>(value: T): Mutable<T> {
  return value as Mutable<T>;
}
