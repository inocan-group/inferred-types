import { Equal, Expect } from "@type-challenges/utils";
import { AnyObject , AllExtend } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("AllExtend<TList,TExtend> and IfAllExtend<TList,TExtend>", () => {

  it("happy path", () => {
    type StringLiterals = ["foo","bar","baz"];
    type StrBool = ["foo", boolean, string];

    type T1 = AllExtend<StringLiterals, string>;
    type T2 = AllExtend<StrBool, string | boolean>;

    type F1 = AllExtend<StringLiterals, number>;
    type F2 = AllExtend<StringLiterals, AnyObject>;

    type cases = [
      Expect<Equal<T1, true>>,
      Expect<Equal<T2, true>>,
      Expect<Equal<F1, false>>,
      Expect<Equal<F2, false>>,
    ];
    const cases: cases = [ true, true, true, true ];
  });

});
