import { AsNumberWhenPossible, Container, LeftRight, UnionToTuple } from "inferred-types/dist/types/index";

/**
 * **UniqueKeys**`<L,R>`
 *
 * Provides a **LeftRight** tuple which articulates the
 * _unique_ keys to each container's keys.
 *
 * The keys for each sides unique values are represented
 * a tuple of values.
 *
 * ```ts
 * type Foo = { foo: 1; bar: 2 };
 * type Baz = { bar: 5; baz: 42, extra: "why not?" };
 * // LeftRight<["foo"], ["baz", "extra"]>
 * type U = UniqueKeys<Foo,Baz>;
 * ```
 * - the example above with an _object_ container is the primary use case
 * but it can be used with array's too but please note it is primarily used
 * in this case to identify how the "longer" array has additional keys:
 * ```ts
 * type Short = [1,2]; // length 2
 * type Long = [3,4,5,6,7,8,9,10]; // length 8
 * // LeftRight<[], [2,3,4,5,6,7]>
 * type U = UniqueKeys<Short,Long>;
 * ```
 *
 * **Related:** `UniqueKeysUnion`
 */
export type UniqueKeys<
  L extends Container,
  R extends Container
> = LeftRight<
  AsNumberWhenPossible<UnionToTuple<Exclude<keyof L, keyof R>>>,
  AsNumberWhenPossible<UnionToTuple<Exclude<keyof R, keyof L>>>
>;
