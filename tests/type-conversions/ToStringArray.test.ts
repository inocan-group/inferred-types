import { Equal, Expect } from "@type-challenges/utils";
import { ToStringArray } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("ToStringArray<T>", () => {

  it("happy path", () => {
    type Str = ToStringArray<["foo", "bar"]>;
    type Num = ToStringArray<[1,2]>;
    type Bool = ToStringArray<[true, false, boolean]>;
    type Empty = ToStringArray<[]>;
    type Opt = ToStringArray<[undefined, null]>;

    type cases = [
      Expect<Equal<Str, ["foo","bar"]>>,
      Expect<Equal<Num, ["1","2"]>>,
      Expect<Equal<Bool, ["true","false", "true" | "false"]>>,
      Expect<Equal<Empty, []>>,
      Expect<Equal<Opt, ["undefined", "null"]>>,
    ];
    const cases: cases = [
      true, true, true, true, true
    ];
  });

});
