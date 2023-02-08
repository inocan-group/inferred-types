import { Equal, Expect } from "@type-challenges/utils";
import { Join , EnsureLeading } from "../../src/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Join<T,S>", () => {

  it("happy path", () => {
    type T1 = Join<["foo", "bar"]>;
    type T2 = Join<["foo", "bar"], "\n">;
    type T3 = Join<[EnsureLeading<"foo", "- ">, EnsureLeading<"bar", "- ">], "\n">;
    type IgnoreBlanks = Join<["foo", "", "bar", "","baz", ""], ",">;
    type IgnoreBlanks2 = Join<["foo", ""], ",">;

    
    type cases = [
      Expect<Equal<T1, "foobar">>,
      Expect<Equal<T2, "foo\nbar">>,
      Expect<Equal<T3, "- foo\n- bar">>,
      Expect<Equal<IgnoreBlanks, "foo,bar,baz">>,
      Expect<Equal<IgnoreBlanks2, "foo">>,
    ];
    const cases: cases = [true, true, true, true, true];
  });

});
