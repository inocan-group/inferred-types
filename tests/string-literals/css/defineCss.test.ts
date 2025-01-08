import { cssFromDefinition } from "inferred-types/runtime";
import { describe, expect, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("cssFromDefinition(defn)", () => {

  it("happy path", () => {
    const block = cssFromDefinition({ display: "block" });
    const flex = cssFromDefinition({
      display: "flex",
      "flex-grow": "1"
    })


    expect(block).toEqual(`display: block;`);
    expect(flex).toEqual(`display: flex; flex-grow: 1;`);


  });

});
