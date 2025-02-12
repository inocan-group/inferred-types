import { describe, it, expect } from "vitest";

import type { Expect, Equal } from "@type-challenges/utils";
import { defineObj } from "inferred-types";

describe("defineType() utility", () => {
  it("only specify a wide type", () => {
    const t = defineObj({})({ foo: "", bar: 0 });

    expect(t.foo).toBe("");
    expect(t.bar).toBe(0);

    const t2 = defineObj()({ foo: "", bar: 0 });

    expect(t2.foo).toBe("");
    expect(t2.bar).toBe(0);

    type cases = [
      // when we provide {} as a literal type; we get the expected type
      Expect<Equal<typeof t, { foo: string; bar: number }>>,
      Expect<Equal<typeof t2,{foo: string; bar: number }>>,
    ];
    const cases: cases = [true, true];
    expect(cases).toBe(cases);
  });

  it("only specify a literal type", () => {
    const t = defineObj({ foo: 1, bar: "hi" })();
    type cases = [Expect<Equal<typeof t, { foo: 1; bar: "hi" }>>];
    const cases: cases = [true];
    expect(cases).toBe(cases);
  });

  it("specify both wide and literal merged type", () => {
    const t = defineObj({ bar: 1 })({ foo: "" });

    type cases = [Expect<Equal<typeof t, { foo: string; bar: 1 }>>];
    const cases: cases = [true];
    expect(cases).toBe(cases);
  });
});
