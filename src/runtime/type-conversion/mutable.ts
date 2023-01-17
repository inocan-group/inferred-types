import { Narrowable } from "src/types/Narrowable";
import { Mutable } from "src/types/type-conversion/Mutable";

export function mutable<T extends Narrowable | readonly Narrowable[]>(value: T): Mutable<T> {
  return value as Mutable<T>;
}
