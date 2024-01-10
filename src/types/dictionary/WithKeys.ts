import { AnyObject , ExpandRecursively , TupleToUnion, UnionToIntersection } from "src/types";

type MakeIntoUnion<K extends PropertyKey | readonly PropertyKey[]> = 
  K extends readonly PropertyKey[] ? TupleToUnion<K> : K;

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
  K extends PropertyKey | readonly PropertyKey[]
> = ExpandRecursively<
  UnionToIntersection< 
    MakeIntoUnion<K> extends keyof T
    ? Pick<T,MakeIntoUnion<K>>
    : never
  >
>;
