import { Equal, Expect } from "@type-challenges/utils";
import { ObjValues } from "src/types/type-conversion/ObjValues";
import { Values } from "src/types/type-conversion/Values";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("ObjValues<Obj>", () => {

  it("type: Object Literals", () => {
    type Obj = { a: "foo"; b: "bar" };
    type FooBar = ObjValues<Obj>;
    type Empty = ObjValues<{}>;
    type WithNarrowNumber = ObjValues<{ a: "foo"; b: "bar"; c: 42 }>;
    type WithWideNumber = ObjValues<{ a: "foo"; b: "bar"; c: number }>;
    
    type cases = [
      Expect<Equal<FooBar, readonly ["foo", "bar"]>>,
      Expect<Equal<Empty, readonly []>>,
      Expect<Equal<WithNarrowNumber, readonly ["foo", "bar", 42]>>,
      Expect<Equal<WithWideNumber, readonly ["foo", "bar", number]>>,
    ];
    const cases: cases = [ true, true, true, true ];
  });

});

describe("Values<Obj | Arr>", () => {
  it("happy path", () => {
    type Obj = { a: "foo"; b: "bar" };
    type FooBar = Values<Obj>;
    type Empty = Values<{}>;
    type WithNarrowNumber = Values<{ a: "foo"; b: "bar"; c: 42 }>;
    type WithWideNumber = Values<{ a: "foo"; b: "bar"; c: number }>;
    type Arr = ["foo", "bar"];
    type Proxy = Values<Arr>;
    
    type cases = [
      Expect<Equal<FooBar, readonly ["foo", "bar"]>>,
      Expect<Equal<Empty, readonly []>>,
      Expect<Equal<WithNarrowNumber, readonly ["foo", "bar", 42]>>,
      Expect<Equal<WithWideNumber, readonly ["foo", "bar", number]>>,
      Expect<Equal<Proxy, readonly ["foo", "bar"]>>
    ];
    const cases: cases = [ true, true, true, true, true  ];
  });
});
