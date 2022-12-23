import { Equal, Expect } from "@type-challenges/utils";
import { WithKeys } from "src/types/dictionary/props";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("WithKeys<Obj, K>", () => {

  it("first test", () => {
    type Test = { foo: 42; bar: true; baz: "hello" };
    type T1 = WithKeys<Test, readonly ["foo", "bar"]>;
    
    type cases = [
      /** type tests */
    ];
    const cases: cases = [];
  });

});