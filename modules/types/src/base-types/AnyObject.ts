import type { Dictionary, EmptyObject, ExplicitlyEmptyObject } from "inferred-types/types";

/**
 * **AnyObject**
 *
 * Meant to represent any valid object type (both indexable and not).
 */
export type AnyObject = Dictionary | EmptyObject | ExplicitlyEmptyObject;
