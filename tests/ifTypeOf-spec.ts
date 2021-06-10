import { Expect, Equal } from "@type-challenges/utils";
import { ifTypeOf, inferredType, literal } from "~/utility";

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
    const nope1 = ifTypeOf({ foo: "foo", bar: 42 }).narrowlyExtends(target);
    const nope2 = ifTypeOf({ foo: "foo", bar: "whoops" }).extends(target);

    expect(yup).toBe(true);
    expect(yup2).toBe(true);
    expect(nope1).toBe(false);
    expect(nope2).toBe(false);

    type cases = [
      Expect<Equal<typeof yup, true>>,
      Expect<Equal<typeof yup2, true>>,
      Expect<Equal<typeof nope1, false>>,
      Expect<Equal<typeof nope2, false>>,
    ];
    const cases: cases = [true, true, true, true];
    expect(cases).toBe(cases);
  });

  it("validation of non-dictionary types works as expected too", () => {
    const target = 42 as number;
    const t2 = literal(42);
    const yup = ifTypeOf(55).extends(target);
    const yup2 = ifTypeOf(0).extends(target);
    // this narrow constraint should still pass
    const yup3 = ifTypeOf(42).narrowlyExtends(t2);

    const nope = ifTypeOf("foo").extends(target);
    // TODO: get the inferredType() util to express which props are literal
    // and which are not so we don't have to do this manually
    const nope2 = ifTypeOf(12).narrowlyExtends(t2);

    expect(yup).toBe(true);
    expect(yup2).toBe(true);
    expect(yup3).toBe(true);
    expect(nope).toBe(false);
    expect(nope2).toBe(false);

    type cases = [
      Expect<Equal<typeof yup, true>>,
      Expect<Equal<typeof yup2, true>>,
      Expect<Equal<typeof yup3, true>>,
      Expect<Equal<typeof nope, false>>,
      Expect<Equal<typeof nope2, false>>,
    ];
    const cases: cases = [true, true, true, true, true];
    expect(cases).toBe(cases);
  });
});

