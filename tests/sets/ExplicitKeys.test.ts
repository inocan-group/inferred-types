import {  Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import {  DoesExtend, ExplicitKeys } from "../../src/types/base";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("ExplicitKeys", () => {
  type FooBar = { foo: number; bar: number };
  type FooBarExt = {foo: number; bar: number; [key: string]: unknown };

  it("keys of objects", () => {
    type KeyFooBar = ExplicitKeys<FooBar>;
    type KeyFooBarExt = ExplicitKeys<FooBarExt>;

    type cases = [
      Expect<DoesExtend<KeyFooBar, readonly ["foo", "bar"]>>,
      Expect<DoesExtend<KeyFooBarExt, readonly ["foo", "bar"]>>,
    ];
    const cases: cases = [ true, true ];
  });

  
  it("keys of arrays", () => {
    type StringArr = ExplicitKeys<string[]>;
    type LiteralArr = ExplicitKeys<[1,2,3]>;
    
    type cases = [
      Expect<DoesExtend<StringArr, readonly []>>,
      Expect<DoesExtend<LiteralArr, readonly [0,1,2]>>
    ];
    const cases: cases = [ true, true ];
  });
  
});
