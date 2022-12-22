import { describe, it, expect } from "vitest";

import { Retain, Include } from "../src/types";
import { Equal, Expect } from "@type-challenges/utils";

describe("Retain<T, U> utility", () => {
  it(" wide type test", () => {
    const str = "foo";
    type Foo = Retain<typeof str, string>;
    type NotFoo = Retain<typeof str, number>;

    type cases = [Expect<Equal<Foo, "foo">>, Expect<Equal<NotFoo, never>>];
    const c: cases = [true, true];
    expect(c).toBe(c);
  });

  it("narrow type test", () => {
    const str = "foo";
    type Foo = Retain<typeof str, "foo">;
    type NotFoo = Retain<typeof str, "bar">;
    type RelatedFoo = Retain<typeof str, string>;
    type NotLiteralFoo = Retain<typeof str, string, true>;

    type cases = [
      Expect<Equal<Foo, "foo">>,
      Expect<Equal<NotFoo, never>>,
      // this is the intended outcome but means
      // that this utility has an implicit bias
      // toward wide types; meaning the literal
      // type is not lost but it does match on "string"
      Expect<Equal<RelatedFoo, "foo">>,
      // this behavior is adjusted if you include
      // the optional `L` generic as a true value
      Expect<Equal<NotLiteralFoo, never>>
    ];
    const c: cases = [true, true, true, true];
    expect(c).toBe(c);
  });
});


describe("Include<T, U> utility", () => {
  it("base test", () => {
    const obj = { foo: 1, bar: 2, baz: "hi" };
    type FooBar = Include<typeof obj, "foo" | "bar">;
    type Baz = Include<typeof obj, "baz">;
    type FooBaz = Include<typeof obj, "foo" | "baz">;

    type cases = [
      Expect<Equal<FooBar, { foo: number; bar: number }>>,
      Expect<Equal<Baz, { baz: string }>>,
      Expect<Equal<FooBaz, { foo: number; baz: string }>>
    ];
    const c: cases = [true, true, true];
    expect(c).toBe(c);
  });

  it("optional params and literals", () => {
    type Obj = { foo: 1; bar?: number; baz: "hi" };
    type FooBar = Include<Obj, "foo" | "bar">;

    type cases = [Expect<Equal<FooBar, { foo: 1; bar?: number }>>];
    const c: cases = [true];
    expect(c).toBe(c);
  });
});
