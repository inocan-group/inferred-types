import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import {DoesExtend, ErrorCondition, TypeMapMatcher} from "../../../src/types/base";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("TypeMapMatcher<T>", () => {

  it("valid tuples passed as T", () => {
    type Generic1 = TypeMapMatcher<["Extends", "foobar"]>;
    type Generic2 = TypeMapMatcher<["Extends", number]>;
    type Str = TypeMapMatcher<["StartsWith", "foobar"]>;
    type Num = TypeMapMatcher<["GreaterThan", 5]>;
    type Fn = TypeMapMatcher<["ReturnsTrue", () => true ]>;
    
    type cases = [
      Expect<Equal<Generic1, ["Extends", "foobar"]>>,
      Expect<Equal<Generic2, ["Extends", number]>>,
      Expect<Equal<Str, ["StartsWith", "foobar"]>>,
      Expect<Equal<Num, ["GreaterThan", 5]>>,
      Expect<Equal<Fn, ["ReturnsTrue", () => true ]>>,

    ];
    const cases: cases = [
      true, true, 
      true, true, true
    ];
  });

  
  it("error conditions produced from invalid T", () => {
    type InvalidStructure = TypeMapMatcher<["Extends", "foo", "bar"]>;
    type InvalidOp = TypeMapMatcher<["MakesFarBetter", "foo"]>;
    type InvalidStr = TypeMapMatcher<["StartsWith", 42]>;
    type InvalidNum = TypeMapMatcher<["GreaterThan", "foo"]>;
    
    type cases = [
      Expect<DoesExtend<InvalidStructure, ErrorCondition<"invalid-tuple">>>,
      Expect<DoesExtend<InvalidOp, ErrorCondition<"unknown-operation">>>,
      Expect<DoesExtend<InvalidStr, ErrorCondition<"invalid-type">>>,
      Expect<DoesExtend<InvalidNum, ErrorCondition<"invalid-type">>>,
    ];
    const cases: cases = [
      true, true, true, true
    ];
    
  });
  

});
