/* eslint-disable no-use-before-define */
import { KvDict, Mutable, UnionToTuple, AnyObject, IfObject } from "src/types";
import { AfterFirst } from "../lists";
import { First } from "../lists/First";

type Obj2Kv<
  TObj extends AnyObject,
  TKeys extends readonly (keyof TObj)[],
  Results extends readonly KvDict<any,any>[] = []
> = [] extends TKeys
  ? Readonly<Results>
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
                Mutable<ObjectToKvDict<TObj[First<TKeys> & keyof TObj]>>, 
                Mutable<TObj[First<TKeys>]>
              >; 
            }
          ]
        : never
    >;


/**
 * **ObjectToKv**`<TObj>`
 * 
 * Type utility to convert an object to an array of object based key-value pairs.
 * 
 * Example:
 * ```ts
 * // readonly [ {key: "foo", value: 1} ]
 * type T = ObjectToKv<{ foo: 1 }>
 * ```
 */
export type ObjectToKvDict<
  TObj extends AnyObject
> = UnionToTuple<keyof TObj> extends readonly (keyof TObj)[]
  ? Obj2Kv<TObj, UnionToTuple<keyof TObj>>
  : never;
