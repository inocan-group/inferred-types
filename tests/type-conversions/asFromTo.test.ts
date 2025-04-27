import { Equal, Expect } from "@type-challenges/utils";
import { asFromTo } from "inferred-types/runtime";
import { describe, expect, it } from "vitest";

describe("asFromTo", () => {

  it("happy path", () => {
    const t1 = asFromTo({ a: "b", c: "d" });

    type cases = [
      Expect<Equal<
        typeof t1,
        [
          { from: "a"; to: "b" },
          { from: "c"; to: "d" }
        ]
      >>
    ];
  });


  it("large key/value", () => {
    const big = asFromTo({
      ["<"]: "&lt;",
      [">"]: "&gt;",
      ['"']: "&quot;",
      ["'"]: "&#39;",
      ["\u00A0"]: "&nbsp;",
      ["\u2003"]: "&emsp;",
      ["\u2002"]: "&ensp;",
      ["\u2009"]: "&thinsp;",
      ["©"]: "&copy;",
      ["®"]: "&reg;",
      ["™"]: "&trade;",
      ["€"]: "&euro;",
      ["£"]: "&pound;",
      ["¥"]: "&yen;",
      ["¢"]: "&cent;",
      ["§"]: "&sect;",
      ["¶"]: "&para;",
      ["•"]: "&bull;",
      ["…"]: "&hellip;",
      ["°"]: "&deg;",
      ["±"]: "&plusmn;",
      ["÷"]: "&divide;",
      ["×"]: "&times;",
      ["¼"]: "&frac14;",
      ["½"]: "&frac12;",
      ["¾"]: "&frac34;",
      ["∞"]: "&infin;",
      ["∑"]: "&sum;",
      ["∏"]: "&prod;",
      ["∫"]: "&int;",
      ["√"]: "&radic;",
      ["∂"]: "&part;",
      ["≈"]: "&asymp;",
      ["≠"]: "&ne;",
      ["≡"]: "&equiv;",
      ["≤"]: "&le;",
      ["≥"]: "&ge;",
      ["∧"]: "&and;",
      ["¬"]: "&not;",
      ["←"]: "&larr;",
      ["→"]: "&rarr;",
      ["↑"]: "&uarr;",
      ["↓"]: "&darr;",
    });

    type Size = typeof big["length"]

    expect(big.length).toEqual(43);

    type cases = [
      Expect<Test<Size, "equals",  43>>
    ];

  });


});
