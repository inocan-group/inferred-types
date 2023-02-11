import { AnyObject } from "../boolean-logic";
import { ExpandRecursively } from "../literals/ExpandRecursively";
import { TupleToUnion, UnionToIntersection } from "../type-conversion";
import { Key } from "./Key";
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
  T extends AnyObject, 
  K extends (Key & keyof T) | readonly (keyof T & Key)[]
> = ExpandRecursively<
  UnionToIntersection< 
    K extends keyof T
    ? Pick<T,K>
    : K extends readonly (keyof T & string)[]
      ? Pick<T, TupleToUnion<K>>
      : never
  >
>;
