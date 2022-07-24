import { Keys } from "../Keys";
import { UnionToTuple } from "../type-conversion/UnionToTuple";

/**
 * Returns the _first_ key in an object.
 *
 * **Note:** key order is not guarenteed so typically this is used
 * for a key/value pair where only one key is expected
 */
export type FirstKey<T extends object> = UnionToTuple<Keys<T>>[0];
