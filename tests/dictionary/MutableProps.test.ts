import { describe, it, expect } from "vitest";
import type { Expect, Equal } from "@type-challenges/utils";

import { MutableProps } from "src/types/dictionary";

describe("MutableProps<T,M>", () => {
  it("works as expected", () => {
    type Test = { foo: string; bar?: number; baz: Readonly<boolean> };
    type Foo = MutableProps<Test, "foo" | "bar">;
    type Bar = MutableProps<Test, "bar">;
    type FooBar = MutableProps<Test, "foo" | "bar">;
    type FooBaz = MutableProps<Test, "foo" | "baz">;

    type cases = [
      Expect<Equal<Foo, { foo: string; bar?: Readonly<number>; readonly baz: Readonly<boolean> }>>,
      Expect<
        Equal<
          Bar,
          { readonly foo: Readonly<string>; bar?: number; readonly baz: Readonly<boolean> }
        >
      >,
      Expect<Equal<FooBar, { foo: string; bar?: number; readonly baz: Readonly<boolean> }>>,
      Expect<
        Equal<FooBaz, { foo: string; readonly bar?: Readonly<number>; baz: Readonly<boolean> }>
      >
    ];
    const cases: cases = [true, true, true, true];
    expect(cases).toBe(cases);
  });
});
