import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { IsValidDotPath } from "../../../src/types/base";
import { Ref } from "vue";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("IsValidDotPath<T>", () => {

  it("happy path", () => {
    type Obj = {
      foo: 1;
      bar: [1,2,3];
      baz: Ref<{happy: "path"}>;
    };
    type Root = IsValidDotPath<Obj, "">;
    type SingleOffset = IsValidDotPath<Obj, "foo">;
    type MultiOffset = IsValidDotPath<Obj, "bar.0">;
    type BadMultiOffset = IsValidDotPath<Obj, "bar.8">;

    type InvalidChar = IsValidDotPath<Obj, "foo/bar">;
    type WideContainer = IsValidDotPath<object, "foo">;
    type WideKey = IsValidDotPath<Obj, string>;
    
    type cases = [
      Expect<Equal<Root, true>>,
      Expect<Equal<SingleOffset, true>>,
      Expect<Equal<MultiOffset, true>>,
      Expect<Equal<BadMultiOffset, false>>,
      Expect<Equal<InvalidChar, false>>,

      Expect<Equal<WideContainer, boolean>>,
      Expect<Equal<WideKey, boolean>>,
    ];
    const cases: cases = [ 
      true, true, true, true, true,
      true, true
    ];
  });

});
