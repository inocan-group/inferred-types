import { Equal, Expect, ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { MatchDef, ToMatchDef, DoesExtend } from "src/types";


// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("ToMatchDef", () => {


  it("parameterized operation", () => {
    type Basic = ToMatchDef<"Includes", ["foobar"]>;
    type Basic2 = ToMatchDef<"Includes", "foobar">;
    type Else = ToMatchDef<"Includes", "foobar", "use-else">;
    type Err = ToMatchDef<"Includes">;
    type Err2 = ToMatchDef<"Includes", []>;
    type Err3 = ToMatchDef<"Includes",[string]>;


    type cases = [
      ExpectTrue<DoesExtend<Basic, MatchDef<"Includes">>>,
      ExpectTrue<DoesExtend<Basic2, MatchDef<"Includes">>>,
      ExpectTrue<DoesExtend<Else, MatchDef<"Includes">>>,

      ExpectFalse<DoesExtend<Err, MatchDef<"Includes">>>,
      ExpectFalse<DoesExtend<Err2, MatchDef<"Includes">>>,
      ExpectFalse<DoesExtend<Err3, MatchDef<"Includes">>>,

      Expect<Equal<
        Basic,
        ["match-def", "Includes", ["foobar"], "throw"]
      >>,
      Expect<Equal<
        Basic2,
        ["match-def", "Includes", ["foobar"], "throw"]
      >>,

      Expect<Equal<
        Else,
        ["match-def", "Includes", ["foobar"], "use-else"]
      >>,
    ];
    const cases: cases = [
      true, true, true, 
      false, false, false, 
      true, true,
      true
    ];
  });

  
  it("non-parameterized operation", () => {
    type Falsy = ToMatchDef<"Falsy">;
    type Falsy2 = ToMatchDef<"Falsy", []>;
    
    type cases = [
      ExpectTrue<DoesExtend<Falsy,MatchDef<"Falsy">>>,
      ExpectTrue<DoesExtend<Falsy2,MatchDef<"Falsy">>>,

    ];
    const cases: cases = [
      true, true,
    ];
    
  });
  

});
