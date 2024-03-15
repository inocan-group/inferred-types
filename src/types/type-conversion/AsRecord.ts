import { Tuple } from "../base-types";
import { ObjectKey } from "../base-types/ObjectKey";

/**
 * **AsRecord**`<T>`
 * 
 * Receives a `Record`, `object`, or `Tuple` and ensures the type 
 * is a `Record` type for all object-like types and just passes 
 * Tuples through "as is".
 */
export type AsRecord<
  T extends Record<ObjectKey, unknown> | object | Tuple
> = T extends Tuple
? T
: T extends Record<ObjectKey, unknown>
? T
: T extends object
  ? NonNullable<unknown>
  : never;
