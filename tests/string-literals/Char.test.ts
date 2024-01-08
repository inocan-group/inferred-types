import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { IfChar, IsChar } from "src/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("IsChar<T>", () => {

  it("happy path", () => {
    type C = IsChar<"C">;
    type NC = IsChar<"No">;
    type Str = IsChar<string>;
    type NotStr = IsChar<42>;
    
    type cases = [
      Expect<Equal<C, true>>,
      Expect<Equal<NC, false>>,
      Expect<Equal<Str, boolean>>,
      Expect<Equal<NotStr, false>>,
    ];
    const cases: cases = [ true, true, true, true ];
  });

});

describe("IfChar<T>", () => {

  it("happy path", () => {
    type C = IfChar<"C", true, false>;
    type NC = IfChar<"No", true, false>;
    type Str = IfChar<string, true, false>;
    type NotStr = IfChar<42, true, false>;

    type cases = [
      Expect<Equal<C, true>>,
      Expect<Equal<NC, false>>,
      Expect<Equal<Str, boolean>>,
      Expect<Equal<NotStr, false>>,
    ];
    const cases: cases = [ true, true, true, true ];
  });

});
