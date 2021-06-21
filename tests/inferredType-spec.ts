import type { Expect, Equal } from "@type-challenges/utils";
import { defineType } from "~/utility";


describe("inferredType() utility", () => {
  it("only specify a wide type", () => {
    const t = defineType()({ foo: "", bar: 0 });
    type cases = [
      Expect<Equal<typeof t, { foo: string; bar: number }>>
    ];
    const cases: cases = [true];
    expect(cases).toBe(cases);
  });

  it("only specify a literal type", () => {
    const t = defineType({ foo: 1, bar: "hi" })();
    type cases = [
      Expect<Equal<typeof t, { foo: 1; bar: "hi" }>>
    ];
    const cases: cases = [true];
    expect(cases).toBe(cases);
  });

  it("specify both wide and literal merged type", () => {
    const t = defineType({ bar: 1 })({ foo: "" });

    type cases = [
      Expect<Equal<typeof t, { foo: string; bar: 1 }>>
    ];
    const cases: cases = [true];
    expect(cases).toBe(cases);
  });
});