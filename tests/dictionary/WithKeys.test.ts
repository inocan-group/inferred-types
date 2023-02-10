/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from "vitest";
import { WithKeys, WithoutKeys } from "../../src//types";
import { Equal, Expect } from "@type-challenges/utils";
import { withKeys, withoutKeys } from "../../src/runtime/dictionary";

describe("WithKeys<T, K> utility", () => {
  it("types: base test", () => {
    type O = { foo: 1; bar: 2; baz: "hi" };
    type FooBar = WithKeys<O, "foo" | "bar">;
    type FooBar2 = WithKeys<O, readonly ["foo", "bar"]>;
    type Baz = WithKeys<O, "baz">;
    type Baz2 = WithKeys<O, ["baz"]>;
    type FooBaz = WithKeys<O, "foo" | "baz">;
    type FooBaz2 = WithKeys<O, ["foo", "baz"]>;

    type cases = [
      Expect<Equal<FooBar, { foo: 1; bar: 2 }>>,
      Expect<Equal<FooBar2, { foo: 1; bar: 2 }>>,
      Expect<Equal<Baz, { baz: "hi" }>>,
      Expect<Equal<Baz2, { baz: "hi" }>>,
      Expect<Equal<FooBaz, { foo: 1; baz: "hi" }>>,
      Expect<Equal<FooBaz2, { foo: 1; baz: "hi" }>>,
    ];
    const c: cases = [true, true, true, true, true, true];
    expect(c).toBe(c);
  });

  it("types: optional params and literals", () => {
    type Obj = { foo: 1; bar?: number; baz: "hi" };
    type FooBar = WithKeys<Obj, "foo" | "bar">;

    type cases = [Expect<Equal<FooBar, { foo: 1; bar?: number }>>];
    const c: cases = [true];
    expect(c).toBe(c);
  });

  it("runtime: happy path", () => {
    const literalObj = {foo: 1, bar: 42 as number | undefined, baz: "hi"} as const;
    const obj = {foo: 1, bar: 42 as number | undefined, baz: "hi"};
    const t1 = withKeys(literalObj, "foo", "bar");
    const t2 = withKeys(literalObj, "foo", "baz");
    const t1b = withKeys(obj, "foo", "bar");
    const t2b = withKeys(obj, "foo", "baz");

    expect(t1.foo).toBe(1);
    expect(t1.bar).toBe(42);
    expect((t1 as any).baz).toBeUndefined();
    expect(t1b.foo).toBe(1);
    expect(t1b.bar).toBe(42);
    expect((t1b as any).baz).toBeUndefined();

    expect(t2.foo).toBe(1);
    expect((t2 as any).bar).toBeUndefined();
    expect(t2.baz).toBe("hi");
    expect(t2b.foo).toBe(1);
    expect((t2b as any).bar).toBeUndefined();
    expect(t2b.baz).toBe("hi");

    type cases = [
      Expect<Equal<typeof t1, { readonly foo: 1; readonly bar: number | undefined}>>, 
      Expect<Equal<typeof t2, { readonly foo: 1; readonly baz: "hi"}>>
    ];
    const cases: cases = [ true, true ];
  });
  
});

describe("WithoutKeys<T, K> utility", () => {
  it("base test", () => {
    type O = { foo: 1; bar: 2; baz: "hi" };
    type FooBar = WithoutKeys<O, "foo" | "bar">;
    type FooBar2 = WithoutKeys<O, readonly ["foo", "bar"]>;
    type FooBar3 = WithoutKeys<O,  ["foo", "bar"]>;
    type Baz = WithoutKeys<O, "baz">;
    type Baz2 = WithoutKeys<O, ["baz"]>;
    type FooBaz = WithoutKeys<O, "foo" | "baz">;
    type FooBaz2 = WithoutKeys<O, ["foo", "baz"]>;

    type cases = [
      Expect<Equal<FooBar, { baz: "hi" }>>,
      Expect<Equal<FooBar2, { baz: "hi" }>>,
      Expect<Equal<FooBar3, { baz: "hi" }>>,
      Expect<Equal<Baz, { foo: 1; bar: 2 }>>,
      Expect<Equal<Baz2, { foo: 1; bar: 2 }>>,
      Expect<Equal<FooBaz, { bar: 2 }>>,
      Expect<Equal<FooBaz2, { bar: 2 }>>,
    ];
    const c: cases = [true, true, true, true, true, true, true];
    expect(c).toBe(c);
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
