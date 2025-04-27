import { describe, it } from "vitest";

import { Expect, NumericChar, RetainWhile, Test, } from "inferred-types/types";
import { retainWhile, } from "inferred-types/runtime"
import { NUMERIC_CHAR } from "inferred-types/constants"


describe("RetainWhile<TContent,TComparator>", () => {

  it("happy path", () => {
    type Num = RetainWhile<"42 is a number", NumericChar>;

    type cases = [
      Expect<Test<Num, "equals",  "42">>,
    ];
  });

});


describe("retainWhile(content,...retain)", () => {

  it("happy path", () => {
    const num = retainWhile("42 is a number", ...NUMERIC_CHAR);
  });

});
