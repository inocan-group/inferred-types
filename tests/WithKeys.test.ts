import { describe, it, expect } from "vitest";

import {  IsUnion, Keys, UnionToTuple, WithKeys, WithoutKeys } from "../src/types";
import { Equal, Expect } from "@type-challenges/utils";
import { Set, SetRemoval } from "src/types/lists/set-ops";




describe("WithKeys<T, K> utility", () => {
  it("base test", () => {
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

  it("optional params and literals", () => {
    type Obj = { foo: 1; bar?: number; baz: "hi" };
    type FooBar = WithKeys<Obj, "foo" | "bar">;

    type cases = [Expect<Equal<FooBar, { foo: 1; bar?: number }>>];
    const c: cases = [true];
    expect(c).toBe(c);
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

});
