import { Equal, Expect, ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { SomeEqual } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("IfSomeEqual & SomeEqual", () => {

  it("SomeEqual<TVal,TCompareTo> happy path", () => {
    type OneTwo = [1,2];
    type FooBar = ["foo", "bar"];
    type Never = [never];
    type NeverFoo = [never, "foo"];
    type Wide = [ string, number ];
    
    type cases = [
      // numeric literals
      Expect<Equal<SomeEqual< OneTwo,1>, true>>,
      Expect<Equal<SomeEqual< OneTwo,2>, true>>,
      Expect<Equal<SomeEqual< OneTwo,3>, false>>,
     //,
      Expect<Equal<SomeEqual<FooBar, "foo">, true>>,
      Expect<Equal<SomeEqual<FooBar, "bar">, true>>,
      Expect<Equal<SomeEqual<FooBar, "baz">, false>>,

      // never
      Expect<Equal<SomeEqual<NeverFoo, "foo">, true>>,
      Expect<Equal<SomeEqual<Never, never >, true>>,
      Expect<Equal<SomeEqual<Never, "foo" >, false>>,

      // wide types
      Expect<Equal<SomeEqual<Wide,"foo">, false>>,
      Expect<Equal<SomeEqual<Wide, 42>, false>>,
      Expect<Equal<SomeEqual<Wide,number>, true>>,

    ];
    const cases: cases = [
      true, true, true,
      true, true, true,
      true, true, true,
      true, true, true
    ];
  });

  
  it("SomeEqual<TVal,TCompareTo> edge cases", () => {
    type UnionMatch = SomeEqual<[string | symbol, string, symbol], string | symbol>;
    type UnionNotMatch = SomeEqual<[string, symbol], string | symbol>;
    
    type cases = [
      ExpectTrue<UnionMatch>,
      ExpectFalse<UnionNotMatch>
    ];
    const cases: cases = [ true, false ];
    
  });
  

});


