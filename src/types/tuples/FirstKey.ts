import { Keys , UnionToTuple } from "src/types";

/**
 * Returns the _first_ key in an object.
 *
 * **Note:** key order is not guaranteed so typically this is used
 * for a key/value pair where only one key is expected
 */
export type FirstKey<T extends object> = UnionToTuple<Keys<T>> extends readonly unknown[]
  ? UnionToTuple<Keys<T>>[0]
  : never;
