import type { Expect, Equal } from "@type-challenges/utils";
import { ExpectExtends } from "~/types";
import { defineType } from "~/utility";


describe("inferredType() utility", () => {
  it("only specify a wide type", () => {
    const t = defineType({})({ foo: "", bar: 0 });

    expect(t.foo).toBe("");
    expect(t.bar).toBe(0);

    // TODO: see if we can eliminate this difference
    // between t and t2 though it is not impactful
    const t2 = defineType()({ foo: "", bar: 0 });

    expect(t2.foo).toBe("");
    expect(t2.bar).toBe(0);

    type cases = [
      // when we provide {} as a literal type; we get the expected type
      Expect<Equal<typeof t, { foo: string; bar: number }>>,
      // for some odd reason, when we let the default value for literal
      // we get something odd
      Expect<Equal<typeof t2, { foo: string; bar: number;[x: string]: string | number | boolean | symbol | void | object | {} | null | undefined }>>,
      // fortunately it does extend the intended type
      Expect<ExpectExtends<typeof t2, { foo: string; bar: number }>>
    ];
    const cases: cases = [true, true, true];
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