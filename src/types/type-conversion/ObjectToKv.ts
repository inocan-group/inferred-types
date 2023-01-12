import { KvPair, Mutable, UnionToTuple } from ".";
import { AnyObject, IfObject } from "../boolean-logic/object";
import { AfterFirst } from "../lists";
import { First } from "../lists/First";

type Obj2Kv<
  TObj extends AnyObject,
  TKeys extends readonly (keyof TObj)[],
  Results extends readonly KvPair<any,any>[] = []
> = [] extends TKeys
  ? Results
  : Obj2Kv<
      TObj,
      AfterFirst<TKeys>,
      First<TKeys> extends keyof TObj
        ? readonly [
            ...Results, 
            { 
              key: First<TKeys>; 
              value: IfObject<
                TObj[First<TKeys>], 
                Mutable<ObjectToKv<TObj[First<TKeys>]>>, 
                TObj[First<TKeys>]
              >; 
            }
          ]
        : never
    >;


/**
 * **ObjectToKv**`<TObj>`
 * 
 * Type utility to convert an object to an array of key-value pairs.
 */
export type ObjectToKv<
  TObj extends Record<string, any>
> = UnionToTuple<keyof TObj> extends readonly (keyof TObj)[]
  ? Obj2Kv<TObj, UnionToTuple<keyof TObj>>
  : never;
