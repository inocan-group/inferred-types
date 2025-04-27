import { describe, it, expect } from "vitest";
import { toUppercase } from "inferred-types/runtime";
import { Expect, Test } from "inferred-types/types";



describe("toUpperCase()", () => {

  it("happy path", () => {
    const fooBar = toUppercase("fooBar");
    expect(fooBar).toEqual("FOOBAR");

    type cases = [
      Expect<Test<typeof fooBar, "equals",  "FOOBAR">>,
    ];
  });

});
