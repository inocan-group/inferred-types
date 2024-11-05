import {  AnyObject , ExpandRecursively ,  Tuple, TupleToUnion, UnionToIntersection } from "inferred-types/dist/types/index";

type MakeIntoUnion<K extends PropertyKey | readonly PropertyKey[]> =
  K extends readonly PropertyKey[] ? TupleToUnion<K> : K;

//TODO: this needs to convert a KV (with keys such as "0", "1", etc.) into an array
type MakeNumericIndex<
  T,
> = T;

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
  T extends AnyObject | Tuple,
  K extends PropertyKey | readonly PropertyKey[]
> =
ExpandRecursively<
  UnionToIntersection<
    MakeIntoUnion<K> extends keyof T
    ? T extends Tuple
      ? // Tuple based container
        MakeNumericIndex<Pick<T,MakeIntoUnion<K>>>
      : // Object based container
        Pick<T,MakeIntoUnion<K>>
    : never
  >
>;
