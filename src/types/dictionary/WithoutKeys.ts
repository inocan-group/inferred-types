
import { ExpandRecursively, AnyObject, TupleToUnion } from "src/types";

/**
 * **WithoutKeys**`<TObj, TKeys>`
 * 
 * Removes the keys in `TKeys` from an object `TObj`. This is 
 * functionally equivalent to the `Omit<T,U>` built-in but rather than
 * taking a union type it takes an array of keys.
 */
export type WithoutKeys<
  TObj extends AnyObject, 
  TKeys extends readonly PropertyKey[]
> = ExpandRecursively<Omit<
    TObj, 
    TupleToUnion<TKeys & keyof TObj[]>
  >>;

