import type { Dictionary } from "./Dictionary";
import type { EmptyObject, ExplicitlyEmptyObject } from "./EmptyObject";

/**
 * **AnyObject**
 *
 * Meant to represent any valid object type (both indexable and not).
 */
export type AnyObject = Dictionary | EmptyObject | ExplicitlyEmptyObject;
