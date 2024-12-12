import { Equal, Expect } from "@type-challenges/utils";
import { defineCss } from "inferred-types/runtime";
import { describe, expect, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("defineCss(defn)", () => {

  it("happy path", () => {
    const flex = defineCss({display: "flex"});
    type Defn = typeof flex["defn"];
    console.log(flex)

    expect(flex.defn).toEqual({display: "flex"});
    expect(flex()).toEqual("display: flex;\n");
    expect(flex("li")).toEqual("li {\n  display: flex;\n}\n")

    // @ts-ignore
    type cases = [
      Expect<Equal<Defn, {display: "flex"}>>
    ];
  });

});
