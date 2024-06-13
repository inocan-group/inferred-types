import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { Dictionary, IfUnset, IfUnsetOrUndefined, Unset } from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("IfUnset<TTest,TElse>", () => {

  it("first test", () => {
    type U = Dictionary | Unset;

    type T1 = IfUnset<U, "oops">;

    type cases = [
      Expect<Equal<T1, Dictionary | "oops">>,
    ];
    const cases: cases = [ true ];
  });

});

describe("IfUnsetOrUndefined<TTest,TElse>", () => {

  it("first test", () => {
    type U = Dictionary | Unset | undefined;

    type T1 = IfUnsetOrUndefined<U, "oops">;

    type cases = [
      Expect<Equal<T1, Dictionary | "oops">>,
    ];
    const cases: cases = [ true ];
  });

});
