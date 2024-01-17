/* eslint-disable @typescript-eslint/ban-types */
import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { ObjValues,  HasSameValues } from "src/types/index";

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


