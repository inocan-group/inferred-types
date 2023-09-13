import { Narrowable , Mutable } from "../../types/base";

export function mutable<T extends Narrowable | readonly Narrowable[]>(value: T): Mutable<T> {
  return value as Mutable<T>;
}
