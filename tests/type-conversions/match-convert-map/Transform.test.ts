import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import {  Transform } from "../../../src/types/base";
import {  createTypeTransform } from "src/runtime";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Transform<TInput,TransformElement[]>", () => {

  it("conditional transform with multiple variants", () => {
    const stripLeading = createTypeTransform("StripLeading", "foo")
      .onCondition("Extends", t => t.string())
      .handlingStrategy("skip")
      .asConfig();

    type Hi = Transform<"hi", [typeof stripLeading]>;
    type Foobar = Transform<"foobar", [typeof stripLeading]>;
    type Null = Transform<null, [typeof stripLeading]>;
    
    type cases = [
      Expect<Equal<Hi, "hi">>,
      Expect<Equal<Foobar, "bar">>,
      Expect<Equal<Null, null>>,
    ];
    const cases: cases = [ true, true, true ];
  });

});
