
import { describe, it } from "vitest";
import type { Expect, HasEvery, Test } from "inferred-types/types";

describe("HasEvery<T,U>", () => {

  it("happy path", () => {
    type T1 = HasEvery<[1, 2, 3], [1, 2]>;
    type T2 = HasEvery<[1, 2, 3], [1, 3]>;
    type T3 = HasEvery<[number, boolean, 1, 2, 3], [1, boolean]>;

    type F1 = HasEvery<[1, 2, 3], [1, 4]>;
    type F2 = HasEvery<[1, true], [1, boolean]>;
    type F3 = HasEvery<[1, true, false], [1, boolean]>;

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
