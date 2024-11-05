import { Equal, Expect } from "@type-challenges/utils";
import { ExtendsSome } from "inferred-types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("ExtendsSome<V,T>", () => {

  it("happy path", () => {
    type F1 = ExtendsSome<"hi", [1, 42, 99, boolean]>;
    type F2 = ExtendsSome<42, ["foo", true, "bar"]>;

    type T0 = ExtendsSome<42, [number ,string, boolean]>;
    type T1 = ExtendsSome<"foo", ["foo", "bar", "baz"]>;
    type T2 = ExtendsSome<[1,2,3], [[number,number,number]]>;
    type T3 = ExtendsSome<"foo" | "bar", ["foo", "bar"]>;

    type cases = [
      Expect<Equal<F1, false>>,//
      Expect<Equal<F2, false>>,
      Expect<Equal<T0, true>>,
      Expect<Equal<T1, true>>,
      Expect<Equal<T2, true>>,
      Expect<Equal<T3, true>>,
    ];
    const cases: cases = [ true, true, true, true, true, true];
  });
});



