import { eachAsString } from "inferred-types/runtime";
import type { Expect, Test } from "inferred-types/types";

import { describe, expect, it } from "vitest";

describe("eachAsString(list)", () => {

  it("just string and numbers", () => {
    const t1 = eachAsString("foo", "bar", 42);

    expect(t1).toEqual(["foo", "bar", "42"])

    type cases = [
      Expect<Test<typeof t1, "equals", ["foo", "bar", "42"]>>
    ];
  });

  it.todo("with an object embedded into array", () => {
    const t1 = eachAsString("foo", "bar", { foo: 1, bar: 2});

    type cases = [
      /** type tests */
    ];

  });
});
