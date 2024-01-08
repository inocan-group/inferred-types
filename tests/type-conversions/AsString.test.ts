import { Equal, Expect, ExpectTrue } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { AsString, IsNever, Nothing, Something } from "src/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("AsString<T>", () => {

  it("happy path", () => {
    type Foobar = AsString<"Foobar">;
    type WideStr = AsString<string>;
    type U1 = AsString<string | readonly string[]>;
    type U2 = AsString<Something>;
    type Never = AsString<Nothing>;
    type Num = AsString<42>;
    
    type cases = [
      Expect<Equal<Foobar, "Foobar">>,
      Expect<Equal<WideStr, string>>,
      Expect<Equal<U1, string>>,
      Expect<Equal<U2, string>>,
      ExpectTrue<IsNever<Never>>,
      ExpectTrue<IsNever<Num>>,
    ];
    const cases: cases = [ true, true, true, true, true, true ];
  });

});
