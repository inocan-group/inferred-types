
import { describe, it, expect } from "vitest";
import { Expect, Test, UnionToTuple, WithoutKeys } from "inferred-types/types";
import { withoutKeys } from "inferred-types/runtime";

describe("WithoutKeys<T, K> utility", () => {
  it("base test", () => {
    type O = { foo: 1; bar: 2; baz: "hi" };
    type FooBarUnion = WithoutKeys<O, UnionToTuple<"foo" | "bar">>;
    type FooBarUnion2 = Omit<O, "foo" | "bar">;
    type FooBarRO = WithoutKeys<O, readonly ["foo", "bar"]>;
    type FooBarRW = WithoutKeys<O, ["foo", "bar"]>;
    type BazRW = WithoutKeys<O, ["baz"]>;
    type FooBazArr = WithoutKeys<O, ["foo", "baz"]>;

    type cases = [
      Expect<Test<FooBarUnion, "equals",  { baz: "hi" }>>,
      Expect<Test<FooBarUnion2, "equals",  { baz: "hi" }>>,
      Expect<Test<FooBarRO, "equals",  { baz: "hi" }>>,
      Expect<Test<FooBarRW, "equals",  { baz: "hi" }>>,
      Expect<Test<BazRW, "equals",  { foo: 1; bar: 2 }>>,
      Expect<Test<FooBazArr, "equals",  { bar: 2 }>>,
    ];
  });

  it("runtime: happy path", () => {
    const literalObj = { foo: 1, bar: 42 as number | undefined, baz: "hi" } as const;
    const obj = { foo: 1, bar: 42 as number | undefined, baz: "hi" };
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
      Expect<Test<typeof t1, "equals",  { readonly baz: "hi" }>>,
      Expect<Test<typeof t2, "equals",  { readonly bar: number | undefined }>>,
      Expect<Test<typeof t1b, "equals",  { baz: string }>>,
      Expect<Test<typeof t2b, "equals",  { bar: number | undefined }>>,
    ];
  });

});
