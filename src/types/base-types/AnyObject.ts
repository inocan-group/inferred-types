

import { ObjectKey } from "./ObjectKey";

/**
 * **AnyObject**
 * 
 * Meant to represent any valid object type (both indexable and not).
 */
export type AnyObject = Record<ObjectKey, unknown> | NonNullable<unknown>;

