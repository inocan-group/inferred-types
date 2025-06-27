import { Expect, IsVariable, Test } from "inferred-types/types";
import { describe, it } from "vitest";



describe("IsVariable<T>", () => {

  it("happy path", () => {
    type T1 = IsVariable<"fooBar">;
    type T2 = IsVariable<"fooBar2">;
    type T3 = IsVariable<"foo_bar">;

    type F1 = IsVariable<"foo-bar">;
    type F2 = IsVariable<"foobar!">;
    type F3 = IsVariable<"foo/bar">;


    // @ts-ignore
    type cases = [
        Expect<Test<T1, "equals", true>>,
        Expect<Test<T2, "equals", true>>,
        Expect<Test<T3, "equals", true>>,

        Expect<Test<F1, "equals", false>>,
        Expect<Test<F2, "equals", false>>,
        Expect<Test<F3, "equals", false>>,
    ];
  });

});
