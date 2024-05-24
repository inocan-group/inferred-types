import { Equal, Expect } from "@type-challenges/utils";
import { find, isNumber, narrow } from "src/runtime/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("find(list,[deref])", () => {

  it("happy path", () => {
    let scalars = narrow(42,56,"foo","bar",false);
    let objects = narrow(
      {id: 1, name: "Bob"},
      {id: 2, name: "Mark"},
      {id: 3, name: "Mary"},
    );

    let num = find(scalars)(isNumber);
    
    type cases = [
      /** type tests */
    ];
    const cases: cases = [];
  });

});
