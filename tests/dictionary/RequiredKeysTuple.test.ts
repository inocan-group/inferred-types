import { describe, it } from "vitest";;
import { Expect, RequiredKeysTuple, Test } from "inferred-types/types";

describe("RequiredKeysTuple<T>", () => {

  it("happy path", () => {
    type T1 = RequiredKeysTuple<{foo: 1; bar: 2; baz: 3}>;
    type T2 = RequiredKeysTuple<{foo: 1; bar: 2; baz?: 3; }>;
    type None = RequiredKeysTuple<{foo?: 1; bar?: 2; baz?: 3; bax?: 4; bay?: 5}>;

    type cases = [
      Expect<Test<T1, "equals",  ["foo", "bar", "baz"]>>,
      Expect<Test<T2, "equals",  ["foo", "bar"]>>,
      Expect<Test<None, "equals",  []>>,
    ];
  });


})
