

import { EmptyObject, ExplicitlyEmptyObject } from "./EmptyObject";
import { Dictionary } from "./Dictionary";

/**
 * **AnyObject**
 * 
 * Meant to represent any valid object type (both indexable and not).
 */
export type AnyObject = Dictionary | EmptyObject | ExplicitlyEmptyObject;

