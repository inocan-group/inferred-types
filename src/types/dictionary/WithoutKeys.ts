
import { 
  ExpandRecursively,  
  TupleToUnion, 
  AsArray, 
  IfLength, 
  ObjectKey,  
  KV, 
  ExplicitlyEmptyObject, 
  RemoveIndexKeys
} from "src/types/index";

type Process<
  TObj extends KV, 
  TKeys extends ObjectKey | readonly ObjectKey[]
> = IfLength<
  AsArray<TKeys>, 0,
  TObj,
  ExpandRecursively<
    Omit<
        TObj, 
        TupleToUnion<AsArray<TKeys>>
    >
> extends ExplicitlyEmptyObject
  ? ExplicitlyEmptyObject
  : ExpandRecursively<
      Omit<
          TObj, 
          TupleToUnion<AsArray<TKeys>>
      >
    >
>;


/**
 * **WithoutKeys**`<TObj, TKeys>`
 * 
 * Removes the keys in `TKeys` from an object `TObj`. This is 
 * functionally equivalent to the `Omit<T,U>` built-in but rather than
 * taking a union type it takes an array of keys.
 */
export type WithoutKeys<
  TObj extends KV, 
  TKeys extends ObjectKey | readonly ObjectKey[]
> = ExpandRecursively<RemoveIndexKeys<
  Process<TObj,TKeys>
>>

