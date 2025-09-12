import { describe, it } from "vitest";
import { NUMERIC_CHAR } from "inferred-types/constants";
import type { Expect, NumericChar, RetainWhile, Test } from "inferred-types/types";

import { retainWhile, } from "inferred-types/runtime"

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
