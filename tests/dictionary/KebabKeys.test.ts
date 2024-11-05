import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import {  KebabKeys } from "inferred-types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("KebabKeys<T>", () => {

  it("happy path", () => {
    type In = { foo_bar: 42; BarBaz: 55; Opt?: "maybe" };
    type T = KebabKeys<In>;

    // @ts-ignore
    type cases = [
      Expect<Equal<T, {"foo-bar": 42; "bar-baz": 55; opt: "maybe" | undefined}>>
    ];
  });

});
