import { Equal, Expect, ExpectTrue } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { ToTransformDef, ApplyTransform, DoesNotExtend, ErrorCondition, ToMatchDef, ApplyMatch, AsNumber, LessThan, CheckTransformConditions } from "src/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("ApplyTransform<TVal,TTransform>", () => {
  type Inc = ToTransformDef<"Increment">;
  type AllCaps = ToTransformDef<"AllCaps">;
  type EnsureStart = ToTransformDef<"EnsureLeading", ["foo: "]>;
  // conditional
  type Less11 = ToMatchDef<"LessThan", [11]>;
  type ToTen = ToTransformDef<"Increment", [10], "use-else", Less11>;
  
  it("Precondition: all transform definitions are valid", () => {
    type cases = [
      ExpectTrue<DoesNotExtend<Inc, ErrorCondition>>,
      ExpectTrue<DoesNotExtend<AllCaps, ErrorCondition>>,
      ExpectTrue<DoesNotExtend<EnsureStart, ErrorCondition>>,
      ExpectTrue<DoesNotExtend<ToTen, ErrorCondition>>,
    ];
    const cases: cases = [ true, true, true, true ];
  });
  

  it("Unconditional Transforms - Happy Path", () => {
    type Incremented = ApplyTransform<41, Inc>;
    type Capital = ApplyTransform<"foo bar_Baz", AllCaps>;
    type Foo = ApplyTransform<"foey", EnsureStart>;
    
    type cases = [
      Expect<Equal<Incremented, 42>>,
      Expect<Equal<Capital, "FOO BAR_BAZ">>,
      Expect<Equal<Foo, "foo: foey">>,
      Expect<Equal<ApplyTransform<"foo", Inc>, never>>
    ];
    const cases: cases = [ true, true, true, true ];
  });
  
  it("Conditional Transforms", () => {
    type Nine = ApplyTransform<9, ToTen>;
    type C2 = CheckTransformConditions<55, ToTen>;
    type Ten = ApplyTransform<10, ToTen>;
    
    type cases = [
      // should increment as 9 is less than 10
      Expect<Equal<Nine, 10>>,
      // should NOT increment as 10 is not less than 10
      Expect<Equal<Ten, 10>>,
    ];
    const cases: cases = [ true, true ];
    
  });
  

});
