import { ExpandRecursively } from "../literals/ExpandRecursively";
import { Keys } from "../Keys";
import { SetRemoval } from "../lists/set-ops";
import { TupleToUnion, UnionToIntersection, UnionToTuple } from "../type-conversion";
/**
 * **WithKeys**`<T,K>`
 * 
 * This type utility will ensure that the type `T` will _retain_ the key/value 
 * pairs which extend `K`.
 * 
 * It is very similar to **Pick** but rather `K` being restricted to
 * being a string union, wth **WithKeys** you can use the union type
 * or a readonly array of strings.
 * 
 * ```ts
 * type Test = { foo: 1, bar: number, baz: string };
 * // { foo: 1, bar: number }
 * type T1 = WithKeys<Test, "foo" | "bar">; // Pick syntax
 * type T2 = WithKeys<Test, ["foo", "bar"]>;
 * ```
 */
export type WithKeys<
  T extends {}, 
  K extends (string & keyof T) | readonly (keyof T & string)[]
> = ExpandRecursively<
  UnionToIntersection< 
    K extends keyof T
    ? Pick<T,K>
    : K extends readonly (keyof T & string)[]
      ? Pick<T, TupleToUnion<K>>
      : never
  >>;


/**
 * **WithoutKeys**`<TObj, TKeys>`
 * 
 * Removes the keys expressed by `TKeys` from `TObj`.
 * 
 * Note: `TKeys` can be a union of key names _or_ an array of string names
 */
export type WithoutKeys<
  TObj extends Record<string, any>, 
  TKeys extends (string & keyof TObj) | readonly (keyof TObj & string)[]
> = TKeys extends readonly (keyof TObj & string)[]
  ? // with keys being an array
    SetRemoval<keyof TObj, TKeys> extends readonly any[]
    ? WithKeys<TObj, SetRemoval<keyof TObj, TKeys>>
    : never
  : // with keys being a union
    SetRemoval<Keys<TObj>, Readonly<UnionToTuple<TKeys>>> extends readonly string[]
      ? WithKeys<TObj, SetRemoval<Keys<TObj>, Readonly<UnionToTuple<TKeys>>>>
      : never;
