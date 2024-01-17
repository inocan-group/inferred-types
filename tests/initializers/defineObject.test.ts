import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import { defineObj } from "src/runtime/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("defineObj(literals)(wide) runtime utility", () => {

  it("happy path", () => {
    const fooBarBaz = defineObj({foo: 1})({bar: 2, baz: 3});

    expect(fooBarBaz).toEqual({foo: 1, bar: 2, baz: 3});
    
    type cases = [
      Expect<Equal<typeof fooBarBaz, { foo: 1; bar: number; baz: number }>>
    ];
    const cases: cases = [ true ];
  });

});
