import { Equal, Expect } from "@type-challenges/utils";
import { Concat } from "src/runtime/lists/Concat";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Concat<T>", () => {

  it("literals", () => {
    type T1 = Concat<["foo"]>; // foo
    type T2 = Concat<["foo", "bar", "baz"]>; // foobarbaz
    type T3 = Concat<["foo", 42, "bar"]>; //foo42bar
    
    type cases = [
      Expect<Equal<T1, "foo">>, //
      Expect<Equal<T2, "foobarbaz">>, 
      Expect<Equal<T3, "foo42bar">>, 
    ];
    const cases: cases = [true, true, true];
  });

  
  it("wide types", () => {
    type T1 = Concat<[string]>; 
    type T2 = Concat<[string, string, string]>; 
    type T3 = Concat<[string, number, string]>; 
    
    type cases = [
      Expect<Equal<T1, string>>, //
      Expect<Equal<T2, string>>, 
      Expect<Equal<T3, `${string}${number}${string}`>>, 
    ];

    const cases: cases = [true, true, true];
    
  });

  it("mixed", () => {
    type T2 = Concat<[string, "-", string]>; 
    type T3 = Concat<[string, 42, string]>; 
    
    type cases = [
      Expect<Equal<T2, `${string}-${string}`>>, 
      Expect<Equal<T3, `${string}42${string}`>>, 
    ];
    
    const cases: cases = [true, true];
    
  });
  

});