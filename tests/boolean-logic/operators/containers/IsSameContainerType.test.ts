import { describe, it } from "vitest";
import type { Expect, IsSameContainerType, Test } from "inferred-types/types";

describe("IsSameContainerType<A,B>", () => {

    it("positive tests", () => {
        type T1 = IsSameContainerType<{foo: 1}, { bar: 2}>;
        type T2 = IsSameContainerType<[], [1,2,3]>;
        type T3 = IsSameContainerType<string[], number[]>;
        type T4 = IsSameContainerType<{foo: 1}, Record<string,string>>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
            Expect<Test<T4, "equals", true>>,
        ];
    });

    it("negative tests", () => {
        type F1 = IsSameContainerType<[1,2,3], { foo: 1}>;
        type F2 = IsSameContainerType<string[], { foo: 1}>;

        type cases = [
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
        ];
    });

});
