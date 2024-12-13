import { Equal, Expect } from "@type-challenges/utils";
import {  UnionFromProp } from "inferred-types/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

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
      Expect<Equal<Id, 1 | 2>>,
      Expect<Equal<Foo, "bar" | "baz">>,
      Expect<Equal<Bar, 42 | undefined>>,
      Expect<Equal<Baz, 99 | undefined>>,
    ];
  });

});
