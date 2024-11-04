import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { FirstOfEach,  Chars, LastOfEach } from "@inferred-types/types";


// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("FirstOfEach<TList>", () => {

  it("with an Tuple of array elements", () => {
    type Arr = FirstOfEach<[ ["foo", 1], ["bar", 2] ]>;
    type Foo = FirstOfEach<[Chars<"Foo">, Chars<"Bar">]>;


    type cases = [
      Expect<Equal<Arr, "foo" | "bar">>,
      Expect<Equal<Foo, "F" | "B" >>,
    ];
    const cases: cases = [ true, true  ];
  });

});


describe("LastOfEach<TList>", () => {

  it("with a Tuple of array elements", () => {
    type Arr = LastOfEach<[ ["foo", 1], ["bar", 2] ]>;
    type Foo = LastOfEach<[Chars<"Foo">, Chars<"Bar">]>;


    type cases = [
      Expect<Equal<Arr, [1,2]>>,
      Expect<Equal<Foo, ["o","r"] >>,
    ];
    const cases: cases = [ true, true  ];
  });

});
