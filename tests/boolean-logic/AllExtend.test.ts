import { Expect, AllExtend, Dictionary, Test } from "inferred-types/types";
import { describe, it } from "vitest";

describe("AllExtend<TList,TExtend> and IfAllExtend<TList,TExtend>", () => {

  it("happy path", () => {
    type StringLiterals = ["foo", "bar", "baz"];
    type StrBool = ["foo", boolean, string];

    type T1 = AllExtend<StringLiterals, string>;
    type T2 = AllExtend<StrBool, string | boolean>;

    type F1 = AllExtend<StringLiterals, number>;
    type F2 = AllExtend<StringLiterals, Dictionary>;

    type cases = [
      Expect<Test<T1, "equals",  true>>,
      Expect<Test<T2, "equals",  true>>,
      Expect<Test<F1, "equals",  false>>,
      Expect<Test<F2, "equals",  false>>,
    ];
  });

});
