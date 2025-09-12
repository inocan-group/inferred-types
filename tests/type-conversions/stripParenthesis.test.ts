import { describe, expect, it } from "vitest";
import { stripParenthesis } from "inferred-types/runtime";
import type { Expect, Test } from "inferred-types/types";

describe("stripParenthesis(val)", () => {

  it("happy path", () => {
    const t1 = stripParenthesis("foo bar");
    const t2 = stripParenthesis("(foo bar)");
    const t3 = stripParenthesis("  (foo bar) ");

    expect(t1).toEqual("foo bar");
    expect(t2).toEqual("foo bar");
    expect(t3).toEqual("foo bar");

    type cases = [
      Expect<Test<typeof t1, "equals",  "foo bar">>,
      Expect<Test<typeof t2, "equals",  "foo bar">>,
      Expect<Test<typeof t3, "equals",  "foo bar">>,
    ];
  });

});
