import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { ToCSV } from "@inferred-types/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("ToCSV<TTuple,TReplace>", () => {

  it("happy path", () => {
    type FooBarBaz = ToCSV<["foo","bar","baz"]>;
    type MixedUp = ToCSV<["foo",42,true]>;
    type WithComma = ToCSV<["foo, bar","baz"]>;
    type WithComma2 = ToCSV<["foo, bar","baz"], "|">;

    type cases = [
      Expect<Equal<FooBarBaz, "foo,bar,baz">>,
      Expect<Equal<MixedUp, "foo,42,true">>,
      Expect<Equal<WithComma, "foo<comma> bar,baz">>,
      Expect<Equal<WithComma2, "foo| bar,baz">>,

    ];
    const cases: cases = [ true, true, true, true  ];
  });

});
