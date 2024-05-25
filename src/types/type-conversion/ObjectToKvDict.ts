import { 
  AnyObject, 
} from "src/types/index";


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
> = {
  [K in keyof TObj]: {key: K; value: TObj[K]}
};
