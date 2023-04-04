import {  Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { AllKeys, HasSameValues } from "src/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("AllKeys<TList>", () => {

  it("happy path", () => {
    type Str = AllKeys<[
      {foo: 1},
      {bar: 2},
      {baz: 3}
    ]>;
    type Num = AllKeys<[
      [1,2],
      [3,4,5]
    ]>;
    
    type cases = [
      Expect<HasSameValues<Str, ["foo","bar","baz"]>>,
      Expect<HasSameValues<Num, [0,1,2]>>,

    ];
    const cases: cases = [ true, true ];
  });

});
