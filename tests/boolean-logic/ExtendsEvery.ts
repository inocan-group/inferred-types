import { ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { describe, it } from "vitest";
import type { Expect, ExtendsEvery, Test } from "inferred-types/types";

describe("ExtendsEvery<T,U>", () => {

  it("happy path", () => {
    type T1 = ExtendsEvery<[1, 2, 3], [number]>;
    type T2 = ExtendsEvery<[1, 2, 3], [number, string]>;
    type T3 = ExtendsEvery<[number, boolean, 1, 2, 3, true], [number, boolean]>;
    type T4 = ExtendsEvery<[1, true], [1, boolean]>;

    type F1 = ExtendsEvery<[1, 2, 3], [1, 4]>;
    type F2 = ExtendsEvery<["foo", string, "bar"], ["foo", "bar"]>
    type F3 = ExtendsEvery<[1, true, false], [number, string]>;

    type cases = [
        Expect<Test<T1, "equals", true>>,
        Expect<Test<T2, "equals", true>>,
        Expect<Test<T3, "equals", true>>,
        Expect<Test<T4, "equals", true>>,

        Expect<Test<F1, "equals", false>>,
        Expect<Test<F2, "equals", false>>,
        Expect<Test<F3, "equals", false>>,
    ];
  });

});
