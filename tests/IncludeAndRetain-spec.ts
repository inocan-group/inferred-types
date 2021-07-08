import { Include, Retain } from "~/types";
import { Equal, Expect } from "@type-challenges/utils";

// INCLUDE
describe("Include<T, U> utility", () => {
  it(" wide type test", () => {
    const str = "foo";
    type Foo = Include<typeof str, string>;
    type NotFoo = Include<typeof str, number>;

    type cases = [
      Expect<Equal<Foo, "foo">>,
      Expect<Equal<NotFoo, never>>
    ];
    const c: cases = [true, true];
    expect(c).toBe(c);
  });

  it("narrow type test", () => {
    const str = "foo";
    type Foo = Include<typeof str, "foo">;
    type NotFoo = Include<typeof str, "bar">;
    type RelatedFoo = Include<typeof str, string>;
    type NotLiteralFoo = Include<typeof str, string, true>;

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
      Expect<Equal<NotLiteralFoo, never>>,
    ];
    const c: cases = [true, true, true, true];
    expect(c).toBe(c);
  });

});

// RETAIN
describe("Retain<T, U> utility", () => {
  it("base test", () => {
    const obj = { foo: 1, bar: 2, baz: "hi" };
    type FooBar = Retain<typeof obj, "foo" | "bar">;
    type Baz = Retain<typeof obj, "baz">;
    type FooBaz = Retain<typeof obj, "foo" | "baz">;

    type cases = [
      Expect<Equal<FooBar, { foo: number; bar: number }>>,
      Expect<Equal<Baz, { baz: string }>>,
      Expect<Equal<FooBaz, { foo: number; baz: string }>>,
    ];
    const c: cases = [true, true, true];
    expect(c).toBe(c);
  });

  it("optional params and literals", () => {
    type Obj = { foo: 1; bar?: number; baz: "hi" };
    type FooBar = Retain<Obj, "foo" | "bar">;

    type cases = [
      Expect<Equal<FooBar, { foo: 1; bar?: number }>>,
    ];
    const c: cases = [true];
    expect(c).toBe(c);
  });

});
