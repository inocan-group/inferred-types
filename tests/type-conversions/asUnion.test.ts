import { Equal, Expect, ExpectTrue } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { asUnion, err } from "src/runtime/index"
import { DoesExtend, Err, ExpandRecursively } from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("asUnion()", () => {

  it("happy path", () => {
    const num = asUnion(4,5,20);
    type Num = typeof num.type;

    const errs = asUnion(err("foo"), err("bar"));
    type Errs = typeof errs.type;
    type ManualErrs = ExpandRecursively< Err<"foo"> | Err<"bar">> ;

    expect(num.kind).toEqual("Union");
    expect(errs.kind).toEqual("Union");
    
    type cases = [
      Expect<Equal<Num, 4 | 5 | 20>>,
      ExpectTrue<DoesExtend<
        Errs,
        ManualErrs
      >>
    ];
    const cases: cases = [
      true, true
    ];
  });

});
