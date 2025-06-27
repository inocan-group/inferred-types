import { cssFromDefinition } from "inferred-types/runtime";
import { describe, expect, it } from "vitest";



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
