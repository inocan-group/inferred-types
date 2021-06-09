import type { Expect, Equal } from "@type-challenges/utils";
import { inferredType } from "~/utility";


describe("inferredType() utility", () => {
  it("only specify a wide type", () => {
    const t = inferredType({ foo: "", bar: 0 })({});
    type cases = [
      Expect<Equal<typeof t, { foo: string; bar: number }>>
    ];
    const cases: cases = [true];
    expect(cases).toBe(cases);
  });

  it("only specify a literal type", () => {
    const t = inferredType({})({ foo: 1, bar: "hi" });
    type cases = [
      Expect<Equal<typeof t, { foo: 1; bar: "hi" }>>
    ];
    const cases: cases = [true];
    expect(cases).toBe(cases);
  });

  it("specify both wide and literal merged type", () => {
    const t = inferredType({ foo: "" })({ bar: 1 });

    type cases = [
      Expect<Equal<typeof t, { foo: string; bar: 1 }>>
    ];
    const cases: cases = [true];
    expect(cases).toBe(cases);
  });
});