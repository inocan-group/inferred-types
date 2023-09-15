/* eslint-disable @typescript-eslint/no-explicit-any */


/* eslint-disable @typescript-eslint/no-explicit-any */
import { EmptyObject, IndexableObject, NarrowObject, Narrowable } from "..";

/**
 * **AnyObject**
 * 
 * Meant to represent any valid object type (both indexable and not).
 */
export type AnyObject = IndexableObject | EmptyObject | NarrowObject<Narrowable> | object;

