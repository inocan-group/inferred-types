import { Container, LeftRight, UnionToTuple } from "src/types";

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
 * // [ "foo", "baz" | "extra" ]
 * type U = UniqueKeys<Foo,Baz>;
 * ```
 * 
 * **Related:** `UniqueKeysUnion`
 */
export type UniqueKeys<L extends Container, R extends Container> = LeftRight<
  UnionToTuple<Exclude<keyof L, keyof R>>,
  UnionToTuple<Exclude<keyof R, keyof L>>
>;
