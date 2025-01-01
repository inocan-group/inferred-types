import { Equal, Expect } from "@type-challenges/utils";
import { FromKv, ToKv } from "inferred-types/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("FromKv<T>", () => {

  it("happy path", () => {
    type Foobar = FromKv<[
      { key: "foo", value: 1},
      { key: "bar", value: "hi"}
    ]>

    // @ts-ignore
    type cases = [
      Expect<Equal<Foobar, { foo: 1; bar: "hi"}>>
    ];
  });

});

describe("ToKv<T>", () => {

  it("happy path", () => {
    type Foobar = ToKv<{foo: 1; bar: "hi"}>;
    type FoobarNoSort = ToKv<{foo: 1; bar: "hi"}, false>;
    type Manual = ToKv<{foo: 1; bar: "hi"},["bar","foo"]>;


    // @ts-ignore
    type cases = [
      Expect<Equal<Foobar, [
        { key: "foo"; value: 1 },
        { key: "bar"; value: "hi" }
      ]>>,
      Expect<Equal<FoobarNoSort, (
        { key: "foo"; value: 1 } |
        { key: "bar"; value: "hi" }
      )[]>>,
      Expect<Equal<Manual, [
        { key: "bar"; value: "hi" },
        { key: "foo"; value: 1 },
      ]>>,

    ];
  });

});
