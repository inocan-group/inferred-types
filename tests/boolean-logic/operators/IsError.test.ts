import {  ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { ErrorCondition, IsError } from "src/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("IsError<T,O>", () => {

  it("happy path", () => {
    type Err = IsError<ErrorCondition<"life-sucks">>;

    type N1 = IsError<"test">;
    type N2 = IsError<never>;
    type N3 = IsError<Error>;
    
    type cases = [
      ExpectTrue<Err>,
      ExpectFalse<N1>,
      ExpectFalse<N2>,
      ExpectFalse<N3>,

      
    ];
    const cases: cases = [
      true,
      false, false, false
    ];
  });

  
  it("make Error an error", () => {
    type Err = IsError<Error, { errorAsError: true }>;
    
    type cases = [
     ExpectTrue<Err>
    ];
    const cases: cases = [ true ];
  });
  
  it("make never an error", () => {
    type Err = IsError<never, { neverAsError: true }>;
    
    type cases = [
     ExpectTrue<Err>
    ];
    const cases: cases = [ true ];
  });

});
