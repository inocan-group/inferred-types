import { Container, LeftRight } from "inferred-types/types";

/**
 * **UniqueKeysUnion**`<L,R>`
 *
 * Provides a **LeftRight** tuple which articulates the
 * _unique_ keys to each container's keys.
 *
 * The keys for each sides unique values are represented
 * as a union type.
 *
 * ```ts
 * type Foo = { foo: 1; bar: 2 };
 * type Baz = { bar: 5; baz: 42, extra: "why not?" };
 * // [ "foo", "baz" | "extra" ]
 * type U = UniqueKeys<Foo,Baz>;
 * ```
 *
 * **Related:** `UniqueKeys`
 */
export type UniqueKeysUnion<
  L extends Container,
  R extends Container
> = LeftRight<
  Exclude<keyof L, keyof R>,
  Exclude<keyof R, keyof L>
>;
