import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { createCssSelector } from "inferred-types";


// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

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
      Expect<Equal<typeof a, `.foobar #id address aside`>>,
      Expect<Equal<typeof b, `#bar:hover() .left:active() #bar`>>,
    ];
    const cases: cases = [
      true, true
    ];
  });

});


