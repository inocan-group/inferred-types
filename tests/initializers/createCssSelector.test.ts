import { describe, expect, it } from "vitest";
import { createCssSelector } from "inferred-types/runtime";
import { Test, Expect } from "inferred-types/types";


describe("createCssSelector(opt) -> (selectors) -> selector", () => {

  it("happy path", () => {
    const theDefault = createCssSelector();
    const narrow = createCssSelector({
      ids: ["#foo", "#bar"],
      classes: [".left", ".right"],
      pseudo: [":active", ":hover"]
    });

    const a = theDefault(".foobar", "#id", "address", "aside");
    expect(a).toEqual(`.foobar #id address aside`);

    const b = narrow("#bar:hover()", ".left:active()", "#bar")
    expect(b).toEqual(`#bar:hover() .left:active() #bar`);

    type cases = [
      Expect<Test<typeof a, "equals",  `.foobar #id address aside`>>,
      Expect<Test<typeof b, "equals",  `#bar:hover() .left:active() #bar`>>,
    ];
  });

});


