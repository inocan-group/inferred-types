
import { describe, it, expect } from "vitest";
import { Equal, Expect } from "@type-challenges/utils";

// NOTE: "withKeys" and "retain" are aliases of one another
// so these tests really pertain to both

import { retain, withKeys } from "inferred-types";
import { DoesExtend, ErrorCondition, WithKeys } from "@inferred-types/types";

describe("WithKeys<T, K> utility with tuples", () => {

  it.skip("happy path", () => {
    // type FooBaz = WithKeys<["foo","bar","baz"], [0,2]>;

    type cases = [
      // Expect<Equal<FooBaz, ["foo", "baz"]>>
    ];
    const cases: cases = [];

  });

})

describe("WithKeys<T, K> utility with objects", () => {
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

});

describe("withKeys() runtime with objects", () => {

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


  it("runtime: when keys includes a value which is a union the type is ErrorCondition", () => {
    const obj = retain({foo: 1, bar: 2, baz: 3}, "bar" as "bar" | "baz");

    // true runtime value is returned
    expect(obj).toEqual({bar: 2});
    // since design time type can not legitimately determined
    type cases = [
      DoesExtend<typeof obj, ErrorCondition<"invalid-union">>,
    ];
    const cases: cases = [ true ];
  });

});
