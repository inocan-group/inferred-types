import { AnyObject, ExpandRecursively } from "../../types/base";

export function expandRecursively<T extends AnyObject>(value: T): ExpandRecursively<T> {
  return value as ExpandRecursively<T>;
}
