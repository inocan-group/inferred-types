import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { BeforeLast } from "../../src/types/base";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("BeforeLast", () => {

  it("happy path for string", () => {
    type Foobar = BeforeLast<"foobar">;
    
    type Empty = BeforeLast<"">;
    type Wide = BeforeLast<string>;
    
    type cases = [
      Expect<Equal<Foobar, "fooba">>,
      Expect<Equal<Empty, "">>,
      Expect<Equal<Wide, string>>,
    ];
    const cases: cases = [true, true, true];
    

  });

});
