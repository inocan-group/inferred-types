import { Expect, Equal, ExpectExtends } from "@type-challenges/utils";
import { ifTypeOf, inferredType } from "~/utility";

describe("ifTypeOf() utility", () => {
  it("base validation with extends() returns true/false", () => {
    const target = { foo: "", bar: 0 };
    const yup = ifTypeOf({ foo: "foo", bar: 42 }).extends(target);
    const nope = ifTypeOf({ foo: "foo", bar: "whoops" }).extends(target);

    expect(yup).toBe(true);
    expect(nope).toBe(false);

    type cases = [
      Expect<Equal<typeof yup, true>>,
      Expect<Equal<typeof nope, false>>,
    ];
    const cases: cases = [true, true];
    expect(cases).toBe(cases);
  });

  it("base validation of narrowlyExtends() returns true/false", () => {
    const target = inferredType({ foo: "foo" })({ bar: 0 });
    const yup = ifTypeOf({ foo: "foo", bar: 0 }).extends(target);
    const yup2 = ifTypeOf({ foo: "foey", bar: 0 }).extends(target);
    const nope1 = ifTypeOf({ foo: "foo", bar: 42 }).extends(target);
    const nope2 = ifTypeOf({ foo: "foo", bar: "whoops" }).extends(target);

    expect(yup).toBe(true);
    expect(nope1).toBe(false);
    expect(nope2).toBe(false);

    type cases = [
      Expect<Equal<typeof yup, true>>,
      Expect<Equal<typeof nope1, false>>,
    ];
    const cases: cases = [true, true];
    expect(cases).toBe(cases);
  });
});

