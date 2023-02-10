import { AnyObject } from "../boolean-logic";
import { ExpandRecursively } from "../literals";
import { TupleToUnion } from "../type-conversion";
import { Key } from "./Key";

/** make sure keys is expressed as an array of values */
type ToKeys<
  TObj extends AnyObject,
  TKey extends string | readonly (keyof TObj & Key)[]
> = TKey extends readonly any[]
  ? TupleToUnion<TKey>
  : TKey; 

/**
 * **WithoutKeys**`<TObj, TKeys>`
 * 
 * Removes the keys expressed by `TKeys` from an object [`TObj`]. This is 
 * functionally equivalent to the `Omit<T,U>` built-in but allows flexibility
 * in the representation of keys.
 * 
 * Note: `TKeys` can be a union of key names _or_ an array of string names
 */
export type WithoutKeys<
  TObj extends AnyObject, 
  TKeys extends string | readonly (keyof TObj & Key)[]
> = ExpandRecursively<Omit<TObj, ToKeys<TObj,TKeys>>>;

