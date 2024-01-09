/* eslint-disable @typescript-eslint/ban-types */
import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { ObjValues } from "src/types/type-conversion/ObjValues";
import { Values } from "src/types/type-conversion/Values";
import { HasSameValues } from "src/types";


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
      Expect<HasSameValues<FooBar, readonly ["foo", "bar"]>>,
      Expect<Equal<Empty, readonly []>>,
      Expect<HasSameValues<WithNarrowNumber, readonly ["foo", "bar", 42]>>,
      Expect<HasSameValues<WithWideNumber, readonly ["foo", "bar", number]>>,
    ];
    const cases: cases = [ true, true, true, true ];
  });

});

describe("Values<Obj | Arr>", () => {
  it("happy path", () => {
    type Obj = { a: "foo"; b: "bar" };
    type FooBar = Values<Obj>;
    // eslint-disable-next-line @typescript-eslint/ban-types
    type Empty = Values<{}>;
    type WithNarrowNumber = Values<{ a: "foo"; b: "bar"; c: 42 }>;
    type WithWideNumber = Values<{ a: "foo"; b: "bar"; c: number }>;
    type Arr = ["foo", "bar"];
    type Proxy = Values<Arr>;
    
    type cases = [
      Expect<HasSameValues<FooBar, readonly ["foo", "bar"]>>,
      Expect<Equal<Empty, readonly []>>,
      Expect<HasSameValues<WithNarrowNumber, readonly ["foo", "bar", 42]>>,
      Expect<HasSameValues<WithWideNumber, readonly ["foo", "bar", number]>>,
      Expect<HasSameValues<Proxy, readonly ["foo", "bar"]>>
    ];
    const cases: cases = [ true, true, true, true, true  ];
  });
});

