import { AnyObject } from "src/types/boolean-logic/object";
import { KvPair } from "src/types/type-conversion/KvToObject";
import { ObjectToKv } from "src/types/type-conversion/ObjectToKv";
import { isObject } from "src/runtime/type-checks";
import { Mutable } from "src/types/type-conversion/Mutable";

/**
 * **objectToKv**(obj)
 * 
 * Converts a known object into an array of `KvPair`'s.
 * ```ts
 * // readonly [ { key: "foo", value: 1 }, { key: "bar", value: 2 } ]
 * const obj = kvToObject({foo: 1, bar: 2})
 * ```
 */
export function objectToKv<TObj extends AnyObject>(obj: TObj) {
  let kv: KvPair<string, any>[] = []; 
  Object.keys(obj).forEach(key => {
    kv = [
      ...kv, 
      isObject(obj[key])
        ? { key, value: objectToKv(obj[key])}
        : { key, value: obj[key]}
    ];
  });

  return kv as ObjectToKv<TObj>;
}
