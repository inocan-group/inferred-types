import { describe, it, expect } from "vitest";
import { defineObj } from "inferred-types/runtime";
import type { Expect, Test } from "inferred-types/types";

describe("defineType() utility", () => {
  it("only specify a wide type", () => {
    const t = defineObj({})({ foo: "", bar: 0 });

    expect(t.foo).toBe("");
    expect(t.bar).toBe(0);

    const t2 = defineObj()({ foo: "", bar: 0 });

    expect(t2.foo).toBe("");
    expect(t2.bar).toBe(0);

    type cases = [
      Expect<Test<typeof t, "equals",  { foo: string; bar: number }>>,
      Expect<Test<typeof t2, "equals",  { foo: string; bar: number }>>,
    ];
  });

  it("only specify a literal type", () => {
    const t = defineObj({ foo: 1, bar: "hi" })();
    type cases = [
        Expect<Test<typeof t, "equals",  { foo: 1; bar: "hi" }>>
    ];
  });

  it("specify both wide and literal merged type", () => {
    const t = defineObj({ bar: 1 })({ foo: "" });

    type cases = [
        Expect<Test<typeof t, "equals",  { foo: string; bar: 1 }>>
    ];
  });
});
