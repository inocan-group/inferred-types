import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { Truncate } from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Truncate<T>", () => {

  it("happy path for truncating strings", () => {
    type NoTrunc = Truncate<"Foobar", 10>;
    type Trunc = Truncate<"Foobar", 3>;
    type TruncWithEllipsis = Truncate<"Foobar", 3, true>;
    type CustomEllipsis = Truncate<"Foobar", 3, "... more">;
    
    type cases = [
      Expect<Equal<NoTrunc, "Foobar">>,
      Expect<Equal<Trunc, "Foo">>,
      Expect<Equal<TruncWithEllipsis, "Foo...">>,
      Expect<Equal<CustomEllipsis, "Foo... more">>,
    ];
    const cases: cases = [ true, true, true, true ];
  });

  it("truncating tuples", () => {
    type NoTrunc = Truncate<[1,2,3], 3>;
    type Trunc = Truncate<[1,2,3,4,5], 3>;
    type WithEllipsis = Truncate<[1,2,3,4,5], 3, true>;
    type CustomEllipsis = Truncate<[1,2,3,4,5], 3, "... more">;
    
    type cases = [
      Expect<Equal<NoTrunc, [1,2,3]>>,
      Expect<Equal<Trunc, [1,2,3]>>,
      Expect<Equal<WithEllipsis, [1,2,3, "..."]>>,
      Expect<Equal<CustomEllipsis, [1,2,3, "... more"]>>,

    ];
    const cases: cases = [true, true, true, true ];
    
  });
  
});
