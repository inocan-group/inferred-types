import { rightWhitespace } from "inferred-types/runtime";
import type { Expect, Test } from "inferred-types/types";

import { describe, expect, it } from "vitest";

describe("rightWhitespace(content)", () => {

  it("happy path", () => {
    // const none = rightWhitespace("none");
    const one = rightWhitespace("one ");
    const two = rightWhitespace("two  ");
    const mixed = rightWhitespace("mixed  \n\t");
    const onlyRight = rightWhitespace(" onlyRight ");

    expect(one).toEqual(" ");
    expect(two).toEqual("  ");
    expect(mixed).toEqual("  \n\t");
    expect(onlyRight).toEqual(" ");

    // @ts-ignore
    type cases = [
      Expect<Test<typeof one, "equals",  " ">>,
      Expect<Test<typeof two, "equals",  "  ">>,
      Expect<Test<typeof mixed, "equals",  "  \n\t">>,
      Expect<Test<typeof onlyRight, "equals",  " ">>,
    ];
  });

});
