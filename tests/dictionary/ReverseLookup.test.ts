import { Equal, Expect } from "@type-challenges/utils";
import { ReverseLookup } from "inferred-types";
import { describe, it } from "vitest";

describe("ReverseLookup<T>", () => {

  it("happy path", () => {
    type T1 = ReverseLookup<{ foo: "1"; bar: "bax" }>

    type cases = [
      Expect<Equal<T1, { "1": "foo"; bax: "bar" }>>
    ];
  });


  it("JS to HTML", () => {
    type Lookup = {
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
    };
    type Reverse = ReverseLookup<Lookup>;

    type cases = [
      Expect<Equal<Reverse["&copy;"], "©">>
    ];
  });


});
