import { ExtendsSome, IfArray, IfExtends, IfExtendsSome, IfReadonlyArray, IfUnion, IsEqual, IsUnion, Or } from "../boolean-logic";
import { ExpandRecursively } from "../ExpandRecursively";
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
 * **WithoutKeys**`<T, K>`
 * 
 * Removes the keys in the dictionary `T` expressed by `K` but
 * leaves the rest of the key/value pairs
 */
export type WithoutKeys<
  T extends {}, 
  TKeys extends (string & keyof T) | readonly (keyof T & string)[]
> = SetRemoval<keyof T, TKeys> extends readonly any[]
  ? WithKeys<T, SetRemoval<keyof T, TKeys>>
  : never;


// export type WithKeys<
//   T extends {}, 
//   K extends (string & keyof T) | readonly (keyof T & string)[]
// > = ExpandRecursively<
//   UnionToIntersection< 
//     K extends keyof T
//     ? Pick<T,K>
//     : K extends readonly (keyof T & string)[]
//       ? Pick<T, TupleToUnion<K>>
//       : never
//   >>;
