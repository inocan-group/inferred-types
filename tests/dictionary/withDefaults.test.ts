import { describe, expect, it } from "vitest";
import { withDefaults } from "inferred-types/runtime";
import {Expect, Test } from "inferred-types/types";

describe("withDefaults(obj,defaults)", () => {

  it("happy path", () => {
    const base: { foo?: number; bar?: number } = { foo: 32 };
    const fooBar = withDefaults(base)({ bar: 1 });

    expect(fooBar.foo).toEqual(32);
    expect(fooBar.bar).toEqual(1);

    type cases = [
      Expect<Test<typeof fooBar, "equals",  { foo: number; bar: 1 }>>
    ];
  });

});
