import { describe, it, expect } from "vitest";
import type { Expect, Equal } from "@type-challenges/utils";
import type { MutableProps, MutablePropsExclusive } from "../../src/types";

describe("MutableProp<T,M> and MutableProps<T,M>", () => {
  it("MutableProp<T,M> ", () => {
    type Test = { foo: string; bar?: number; readonly baz: boolean };
    type Foo = MutableProps<Test, ["foo", "bar"]>;
    type FooAlt = MutableProps<Test, "foo"| "bar">;
    type Bar = MutableProps<Test, "bar">;
    type Bar2 = MutableProps<Test, ["bar"]>;
    type FooBar = MutableProps<Test, "foo" | "bar">;
    type FooBaz = MutableProps<Test, "foo" | "baz">;

    type cases = [
      Expect<Equal<
        Foo, 
        { foo: string; bar?: number; readonly baz: boolean }
      >>,
      Expect<Equal<
        FooAlt, 
        { foo: string; bar?: number; readonly baz: boolean }
      >>,
      Expect<Equal<
          Bar,
          { foo: string; bar?: number; readonly baz: boolean }
      >>,
      Expect<Equal<
          Bar2,
          { foo: string; bar?: number; readonly baz: boolean }
      >>,
      Expect<Equal<
        FooBar, 
        { foo: string; bar?: number; readonly baz: boolean }
      >>,
      Expect<Equal<
          FooBaz, 
          { foo: string; bar?: number; baz: boolean }
      >>
    ];
    const cases: cases = [true, true, true, true, true, true];
    expect(cases).toBe(cases);
  });

  
  it("MutablePropsExclusive<T,M>", () => {
    type Test = { foo: string; bar?: number; readonly baz: boolean };
    type Foo = MutablePropsExclusive<Test, ["foo", "bar"]>;
    type Foo2 = MutablePropsExclusive<Test, "foo" | "bar">;
    type Bar = MutablePropsExclusive<Test, ["bar"]>;
    type Bar2 = MutablePropsExclusive<Test, "bar">;
    type FooBar = MutablePropsExclusive<Test, "foo" | "bar">;
    type FooBaz = MutablePropsExclusive<Test, "foo" | "baz">;

    type cases = [
      Expect<Equal<
        Foo, 
        { foo: string; bar?: number; readonly baz: boolean }
      >>,
      Expect<Equal<
        Foo2, 
        { foo: string; bar?: number; readonly baz: boolean }
      >>,
      Expect<Equal<
          Bar,
          { readonly foo: string; bar?: number; readonly baz: boolean }
      >>,
      Expect<Equal<
          Bar2,
          { readonly foo: string; bar?: number; readonly baz: boolean }
      >>,
      Expect<Equal<
        FooBar, 
        { foo: string; bar?: number; readonly baz: boolean }
      >>,
      Expect<Equal<
          FooBaz, 
          { foo: string; readonly bar?: number; baz: boolean }
      >>
    ];
    const cases: cases = [true, true, true, true, true, true];
    expect(cases).toBe(cases);
  });
  
});
