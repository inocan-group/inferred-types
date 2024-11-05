import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { Concat } from "inferred-types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("Concat<T>", () => {

  it("literals", () => {
    type T1 = Concat<["foo"]>; // foo
    type T2 = Concat<["foo", "bar", "baz"]>; // foobarbaz
    type T3 = Concat<["foo", 42, "bar"]>; //foo42bar
    type T4 = Concat<["foo", "-is-", true]>;

    type cases = [
      Expect<Equal<T1, "foo">>, //
      Expect<Equal<T2, "foobarbaz">>,
      Expect<Equal<T3, "foo42bar">>,
      Expect<Equal<T4, "foo-is-true">>,
    ];
    const cases: cases = [true, true, true, true];
  });


  it("wide types", () => {
    type T1 = Concat<[string]>;
    type T2 = Concat<[string, string, string]>;
    type T3 = Concat<[string, number, string]>;
    type T4 = Concat<[string, number, boolean]>;

    type cases = [
      Expect<Equal<T1, string>>, //
      Expect<Equal<T2, string>>,
      Expect<Equal<T3, `${string}${number}${string}`>>,
      Expect<Equal<T4, `${string}${number}${boolean}`>>,
    ];

    const cases: cases = [true, true, true, true];

  });

  it("mixed", () => {
    type T2 = Concat<[string, "-", string]>;
    type T3 = Concat<[string, 42, string]>;

    type cases = [
      Expect<Equal<T2, `${string}-${string}`>>,
      Expect<Equal<T3, `${string}42${string}`>>,
    ];

    const cases: cases = [true, true];

  });


});
