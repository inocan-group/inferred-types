import { AfterFirst, AnyObject , AsRecord, ExpandRecursively, First, KV, KeysWithValue } from "src/types/index";

type Process<
  TKeys extends readonly unknown[],
  TObj extends AnyObject,
  TResult extends object = object
> = [] extends TKeys
? ExpandRecursively<TResult>
: Process<
    AfterFirst<TKeys>,
    TObj,
    TResult & Record<First<TKeys>, First<TKeys> extends keyof TObj ? TObj[First<TKeys>] : never>
  >;


/**
 * **WithValue**`<TObj,TValue>`
 *
 * Reduces an object's type down to only those key/value pairs where the
 * value is of type `W`.
 * ```ts
 * const foo = { a: 1, b: "hi", c: () => "hello" }
 * // { c: () => "hello" }
 * type W = WithValue<typeof foo, Function>
 * ```
 * 
 * **Related:** `WithoutValue`, `WithKeys`, `WithoutKeys`
 */
export type WithValue<
  TObj extends KV,
  TValue,
> = Process<
  KeysWithValue<TObj, TValue>,
  TObj
>;


