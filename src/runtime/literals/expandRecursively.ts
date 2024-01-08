import { AnyObject, ExpandRecursively } from "src/types";

export function expandRecursively<T extends AnyObject>(value: T): ExpandRecursively<T> {
  return value as ExpandRecursively<T>;
}
