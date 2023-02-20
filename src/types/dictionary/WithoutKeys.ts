import { AnyObject } from "src/types/base-types";
import { ExpandRecursively } from "src/types/literals";
import { TupleToUnion } from "src/types/type-conversion";
import { Key } from "src/types/dictionary";

/**
 * **WithoutKeys**`<TObj, TKeys>`
 * 
 * Removes the keys in `TKeys` from an object `TObj`. This is 
 * functionally equivalent to the `Omit<T,U>` built-in but rather than
 * taking a union type it takes an array of keys.
 */
export type WithoutKeys<
  TObj extends AnyObject, 
  TKeys extends readonly Key[]
> = ExpandRecursively<Omit<
    TObj, 
    TupleToUnion<TKeys & keyof TObj[]>
  >>;

