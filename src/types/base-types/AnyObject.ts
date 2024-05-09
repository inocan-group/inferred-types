

import { EmptyObject } from "./EmptyObject";
import { KV } from "./KV";

/**
 * **AnyObject**
 * 
 * Meant to represent any valid object type (both indexable and not).
 */
export type AnyObject = KV | EmptyObject;

