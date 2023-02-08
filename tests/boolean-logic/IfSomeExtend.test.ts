import { Equal, Expect } from "@type-challenges/utils";
import { AnyObject , SomeExtend } from "../../src/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("SomeExtend<TList,TExtend> and IfSomeExtend<TList,TExtend>", () => {

  it("happy path", () => {
    type LiteralList = [1,2,"foo","bar"];
    type WideList = [string, boolean];
    type WideUnion = string | boolean;

    type T1 = SomeExtend<LiteralList, "foo">;
    type T2 = SomeExtend<WideList, boolean>;
    type T3 = SomeExtend<LiteralList, WideUnion>;

    type F1 = SomeExtend<LiteralList, false>;
    type F2 = SomeExtend<LiteralList, AnyObject>;
    type F3 = SomeExtend<LiteralList, any[]>;

    type cases = [
      Expect<Equal<T1, true>>,
      Expect<Equal<T2, true>>,
      Expect<Equal<T3, true>>,
      Expect<Equal<F1, false>>,
      Expect<Equal<F2, false>>,
      Expect<Equal<F3, false>>,
    ];
    const cases: cases = [ true, true, true, true, true, true ];
  });

});
