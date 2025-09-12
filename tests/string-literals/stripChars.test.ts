import { describe, expect, it } from "vitest";
import { stripChars } from "inferred-types/runtime";
import { UPPER_ALPHA_CHARS } from "inferred-types/constants"
import type { Expect, Test } from "inferred-types/types";

describe("stripChars(content,...strip)", () => {

  it("happy path", () => {
    const lower = stripChars("FooBar", ...UPPER_ALPHA_CHARS);
    const special = stripChars("FooBar<Baz>", "<", ">", "[", "]", "(", ")");

    expect(lower).toBe("ooar");
    expect(special).toBe("FooBarBaz");

    type cases = [
      Expect<Test<typeof lower, "equals",  "ooar">>,
      Expect<Test<typeof special, "equals",  "FooBarBaz">>,
    ];
  });

});
