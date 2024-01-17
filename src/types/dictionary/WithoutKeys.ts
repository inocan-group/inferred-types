
import { ExpandRecursively, AnyObject, TupleToUnion, AsArray, EmptyObject, IfLength, ObjectKey } from "src/types/index";


/**
 * **WithoutKeys**`<TObj, TKeys>`
 * 
 * Removes the keys in `TKeys` from an object `TObj`. This is 
 * functionally equivalent to the `Omit<T,U>` built-in but rather than
 * taking a union type it takes an array of keys.
 */
export type WithoutKeys<
  TObj extends AnyObject, 
  TKeys extends ObjectKey | readonly ObjectKey[]
> = IfLength<
  AsArray<TKeys>, 0,
  TObj,
  ExpandRecursively<
    Omit<
        TObj, 
        TupleToUnion<AsArray<TKeys>>
    >
  > extends EmptyObject
    ? EmptyObject
    : ExpandRecursively<
        Omit<
            TObj, 
            TupleToUnion<AsArray<TKeys>>
        >
      >
  >;

