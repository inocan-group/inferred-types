import { Equal, Expect } from "@type-challenges/utils";
import {  RemoveNever, RemoveStrings } from "src/types/lists/extractors";
import { RetainStrings, RetainStrings } from "src/types/lists/extractors/RetainStrings";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("RemoveNever", () => {

  it("type", () => {
    type Foo42Bar = RemoveNever<["foo", never, 42, "bar", never, never]>;
    type Foo42Bar_RO = RemoveNever<readonly ["foo", never, 42, "bar", never, never]>;
    type Never = RemoveNever<[never, never, never]>;
    type Never_RO = RemoveNever<readonly [never, never, never]>;
    
    type cases = [
      Expect<Equal<Foo42Bar, ["foo", 42, "bar"]>>,
      Expect<Equal<Foo42Bar_RO, readonly ["foo", 42, "bar"]>>,
      Expect<Equal<Never, []>>,
      Expect<Equal<Never_RO, readonly []>>,
    ];

    const cases: cases = [ true, true, true, true ];
  });

});

describe("ExtractStrings", () => {

  it("type", () => {
    type FooBar = RetainStrings<[false, boolean, 42, "foo", {}, "bar", never]>;
    type FooBar_RO = RetainStrings<readonly [false, boolean, 42, "foo", {}, "bar", never]>;
    type None = RetainStrings<[23, 43, 56]>;
    type None_RO = RetainStrings<readonly [23, 43, 56]>;

    type cases = [
      Expect<Equal<FooBar, ["foo","bar"]>>,
      Expect<Equal<FooBar_RO, readonly ["foo", "bar"]>>,
      Expect<Equal<None,  []>>,
      Expect<Equal<None_RO,  readonly []>>,
    ];

    const cases: cases = [ true, true, true, true ];
  });

});

