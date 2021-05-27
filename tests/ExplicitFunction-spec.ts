/* eslint-disable unicorn/consistent-function-scoping */
import { ExplicitFunction } from "~/utility";
import type { Expect, Equal } from "@type-challenges/utils";

describe("ExplicitFunction()", () => {
  it("empty params function made explicit", () => {
    const fn = () => 42;
    type F = typeof fn;
    const efn = ExplicitFunction(fn);
    type E = typeof efn;

    type cases = [Expect<Equal<F, E>>];
    const cases: cases = [true];
    expect(cases).toBe(cases);
  });

  it("singular param function made explicit", () => {
    const fn = (n: number) => n;
    type F = typeof fn;
    const efn = ExplicitFunction(fn);
    type E = typeof efn;

    type cases = [Expect<Equal<F, E>>];
    const cases: cases = [true];
    expect(cases).toBe(cases);
  });

  it("multiple param function made explicit", () => {
    const fn = (n: number, greeting: string) => `${greeting} ${n}`;
    type F = typeof fn;
    const efn = ExplicitFunction(fn);
    type E = typeof efn;

    type cases = [Expect<Equal<F, E>>];
    const cases: cases = [true];
    expect(cases).toBe(cases);
  });

  it("higher order function", () => {
    const fn = (g: string) => (n: number) => `${g} ${n}`;
    type F = typeof fn;
    const efn = ExplicitFunction(fn);
    type E = typeof efn;

    type cases = [Expect<Equal<F, E>>];
    const cases: cases = [true];
    expect(cases).toBe(cases);
  });
});
