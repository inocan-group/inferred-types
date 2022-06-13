import { ExpandRecursively } from "../ExpandRecursively";
import { Keys, Length, UnionToTuple } from "../index";

/**
 * Accepts an object with at least one property defined on it
 */
export type NotEmptyObject<T extends {}> = ExpandRecursively<
  Length<UnionToTuple<Keys<T>>> extends 0 ? false : T
>;
