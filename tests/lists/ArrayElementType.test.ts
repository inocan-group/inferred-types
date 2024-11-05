;import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { ArrayElementType } from "inferred-types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("ArrayElementType<T>", () => {

  it("happy path", () => {
    type S = ArrayElementType<string[]>;
    type N = ArrayElementType<number[]>;
    type B = ArrayElementType<boolean[]>;
    type U = ArrayElementType<(string | number)[]>;

    type cases = [
      Expect<Equal<S, string>>,
      Expect<Equal<N, number>>,
      Expect<Equal<B, boolean>>,
      Expect<Equal<U, string | number>>
    ];

    const cases: cases = [
      true, true, true, true
    ];
  });


  it("tuple as input", () => {
    type S = ArrayElementType<["foo", "bar"]>;
    type N = ArrayElementType<[1,2,3]>;
    type B = ArrayElementType<[true,false]>;
    type U = ArrayElementType<["foo", 42]>;

    type cases = [
      Expect<Equal<S, string>>,
      Expect<Equal<N, number>>,
      Expect<Equal<B, boolean>>,
      Expect<Equal<U, string | number>>
    ];

    const cases: cases = [
      true, true, true, true
    ];
  });


});
