

import { EmptyObject } from "./EmptyObject";
import { Dictionary } from "./KV";

/**
 * **AnyObject**
 * 
 * Meant to represent any valid object type (both indexable and not).
 */
export type AnyObject = Dictionary | EmptyObject;

