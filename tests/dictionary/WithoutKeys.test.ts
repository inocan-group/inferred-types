/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from "vitest";
import { Equal, Expect } from "@type-challenges/utils";

import {  UnionToTuple, WithoutKeys } from "../../src/types/base";
import { withoutKeys } from "src/runtime";

describe("WithoutKeys<T, K> utility", () => {
  it("base test", () => {
    type O = { foo: 1; bar: 2; baz: "hi" };
    type FooBarUnion = WithoutKeys<O, UnionToTuple<"foo" | "bar">>;
    type FooBarUnion2 = Omit<O, "foo" | "bar">;
    type FooBarRO = WithoutKeys<O, readonly ["foo", "bar"]>;
    type FooBarRW = WithoutKeys<O,  ["foo", "bar"]>;
    type BazRW = WithoutKeys<O, ["baz"]>;
    type FooBazArr = WithoutKeys<O, ["foo", "baz"]>;

    type cases = [
      Expect<Equal<FooBarUnion, { baz: "hi" }>>,
      Expect<Equal<FooBarUnion2, { baz: "hi" }>>,
      Expect<Equal<FooBarRO, { baz: "hi" }>>,
      Expect<Equal<FooBarRW, { baz: "hi" }>>,
      Expect<Equal<BazRW, { foo: 1; bar: 2 }>>,
      Expect<Equal<FooBazArr, { bar: 2 }>>,
    ];
    const cases: cases = [true, true, true, true, true, true];
  });

  it("runtime: happy path", () => {
    const literalObj = {foo: 1, bar: 42 as number | undefined, baz: "hi"} as const;
    const obj = {foo: 1, bar: 42 as number | undefined, baz: "hi"};
    const t1 = withoutKeys(literalObj, "foo", "bar");
    const t1b = withoutKeys(obj, "foo", "bar");
    const t2 = withoutKeys(literalObj, "foo", "baz");
    const t2b = withoutKeys(obj, "foo", "baz");

    expect((t1 as any).foo).toBeUndefined();
    expect((t1 as any).bar).toBeUndefined();
    expect(t1.baz).toBe("hi");
    expect((t1b as any).foo).toBeUndefined();
    expect((t1b as any).bar).toBeUndefined();
    expect(t1b.baz).toBe("hi");

    expect((t2 as any).foo).toBeUndefined();
    expect(t2.bar).toBe(42);
    expect((t2 as any).baz).toBeUndefined;
    expect((t2b as any).foo).toBeUndefined();
    expect(t2b.bar).toBe(42);
    expect((t2b as any).baz).toBeUndefined;

    type cases = [
      Expect<Equal<typeof t1, { readonly baz: "hi"}>>, 
      Expect<Equal<typeof t2, { readonly bar: number | undefined}>>,
      Expect<Equal<typeof t1b, { baz: string}>>, 
      Expect<Equal<typeof t2b, {  bar: number | undefined}>>,
    ];
    const cases: cases = [ true, true, true, true ];
  });

});
