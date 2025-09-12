import { describe, it } from "vitest";
import type { ContainsAll, Expect, Test } from "inferred-types/types";

describe("ContainsAll<TList,THasAll>", () => {

  it("happy path", () => {
    type Arr = ["foo", "bar", "baz"];
    type T1 = ContainsAll<Arr, ["foo", "bar"]>;

    type F1 = ContainsAll<Arr, ["foo","bar","baz","bax"]>;

    type cases = [
      Expect<Test<T1, "equals",  true>>,
      Expect<Test<F1, "equals",  false>>,
    ];
  });

  it("happy path for a string input", () => {

    type T1 = ContainsAll<"FooBar", ["Foo", "Bar"]>;
    type F1 = ContainsAll<"FooBar", ["Foo", "Bax"]>;

    type cases = [
        Expect<Test<T1, "equals",  true>>,
        Expect<Test<F1, "equals",  false>>,
    ];
  });

});

