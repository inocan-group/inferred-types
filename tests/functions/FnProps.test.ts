/* eslint-disable @typescript-eslint/ban-types */
import { Equal, Expect } from "@type-challenges/utils";
import {  EmptyObject, FnProps } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("FnProps", () => {

  it("happy path", () => {
    type Fn = () => "hi";
    type Obj = { foo: 1; bar: 2 };
    type Hybrid = Fn & Obj;

    type Props = FnProps<Hybrid>;
    type Empty = FnProps<Fn>;
    
    type cases = [
      Expect<Equal<Props, { foo: 1; bar: 2 }>>,
      Expect<Equal<Empty, EmptyObject>>
    ];
    const cases: cases = [true, true];
  });

});
