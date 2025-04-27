import { describe, expect, it } from "vitest";
import {
    Expect,
    UpperAlphaChar,
    StripSurround,
    Test
} from "inferred-types/types";
import { stripSurround } from "inferred-types/runtime";


describe("StripSurround<TContent,TStrip>", () => {

  it("happy path", () => {
    type Hi = StripSurround<"(Hi)", "(" | ")">;
    type Lower = StripSurround<"Hello World", UpperAlphaChar>;

    type cases = [
      Expect<Test<Hi, "equals",  "Hi">>,
      Expect<Test<Lower, "equals",  "ello World">>,
    ];
  });

});

describe("stripSurround(content, ...strip)", () => {

  it("happy path", () => {
    const removeParenthesis = stripSurround("(", ")");

    const hi = removeParenthesis("( hi )");
    const noChange = removeParenthesis(" hi ");

    expect(hi).toBe(" hi ");
    expect(noChange).toBe(" hi ");

    type cases = [
      Expect<Test<typeof hi, "equals",  " hi ">>,
      Expect<Test<typeof noChange, "equals",  " hi ">>,

    ];
  });

});
