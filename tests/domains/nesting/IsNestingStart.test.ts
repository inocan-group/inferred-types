import { describe, it } from "vitest";
import {
    DefaultNesting,
    Expect,
    IsNestingStart,
    Test,
} from "inferred-types/types";

describe("IsNestingStart<TChar,TNesting>", () => {

    it("happy path", () => {
        type T1 = IsNestingStart<"{", DefaultNesting>;
        type T2 = IsNestingStart<"(", DefaultNesting>;
        type T3 = IsNestingStart<"<", DefaultNesting>;

        type F1 = IsNestingStart<"}", DefaultNesting>;
        type F2 = IsNestingStart<"g", DefaultNesting>;
        type F3 = IsNestingStart<">", DefaultNesting>;


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
