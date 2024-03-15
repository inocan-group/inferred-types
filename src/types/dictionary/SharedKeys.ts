import {  IntersectingKeys, ObjectKey } from "src/types/index";


/**
 * **SharedKeys**`<A,B>`
 * 
 * Given two objects `A` and `B`, this type utility will provide the 
 * _keys_ which both objects contain.
 * ```ts
 * type O1 = { foo: 1; bar: 2; baz: 88 };
 * type O2 = { bar: 5; baz: 3; nada: true };
 * //  ["bar", "baz"]
 * type X = SharedKeys<O1,O2>;
 * ```
 * 
 * **Note:** this is now just an alias to `IntersectingKeys`
 */
export type SharedKeys<
  A extends Record<ObjectKey, unknown> | object,
  B extends Record<ObjectKey, unknown> | object
> = IntersectingKeys<A,B>;
