import { Equal, Expect } from "@type-challenges/utils";
import {  Test, UnionFromProp } from "inferred-types/types";
import { describe, it } from "vitest";



describe("UnionFromProp<T,P>", () => {
  type D1 = [
    {id: 1, foo: "bar", bar: 42, baz: 99},
    {id: 2, foo: "baz", bar: undefined}
  ];

  it("happy path", () => {
    type Id = UnionFromProp<D1, "id">;
    type Foo = UnionFromProp<D1, "foo">;
    type Bar = UnionFromProp<D1, "bar">;
    type Baz = UnionFromProp<D1, "baz">;

    // @ts-ignore
    type cases = [
      Expect<Test<Id, "equals",  1 | 2>>,
      Expect<Test<Foo, "equals",  "bar" | "baz">>,
      Expect<Test<Bar, "equals",  42 | undefined>>,
      Expect<Test<Baz, "equals",  99 | undefined>>,
    ];
  });

});
