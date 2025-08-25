import { describe, it } from "vitest";
import { Expect, KebabKeys, Test } from "inferred-types/types";



describe("KebabKeys<T>", () => {

  it("happy path", () => {
    type In = { foo_bar: 42; BarBaz: 55; Opt?: "maybe" };
    type T = KebabKeys<In>;

    type cases = [
      Expect<Test<
        T,
        "equals",
        { "foo-bar": 42; "bar-baz": 55; opt?: "maybe" | undefined }
    >>
    ];
  });

});
