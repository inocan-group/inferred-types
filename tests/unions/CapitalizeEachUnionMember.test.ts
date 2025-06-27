import { Expect, CapitalizeEachUnionMember, Test } from "inferred-types/types";
import { describe, it } from "vitest";



describe("CapitalizeEachUnionMember<T>", () => {

  it("happy path", () => {
    type FooBar = CapitalizeEachUnionMember<"foo" | "bar">;
    type FooBar42 = CapitalizeEachUnionMember<"foo" | 42 | "bar">;
    type Foo = CapitalizeEachUnionMember<"foo">;

    type cases = [
      Expect<Test<FooBar, "equals",  "Foo" | "Bar">>,
      Expect<Test<FooBar42, "equals",  "Foo" | "Bar" | 42>>,
      Expect<Test<Foo, "equals",  "Foo">>,
    ];
  });

});
