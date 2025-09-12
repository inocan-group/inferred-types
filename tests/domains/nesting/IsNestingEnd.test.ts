import { describe, it } from "vitest";
import type { DefaultNesting, Expect, IsNestingEnd, Test } from "inferred-types/types";

describe("IsNestingEnd<TChar,TNesting>", () => {

    it("happy path", () => {
        type T1 = IsNestingEnd<"}", DefaultNesting>;
        type T2 = IsNestingEnd<")", DefaultNesting>;
        type T3 = IsNestingEnd<">", DefaultNesting>;

        type F1 = IsNestingEnd<"{", DefaultNesting>;
        type F2 = IsNestingEnd<"g", DefaultNesting>;
        type F3 = IsNestingEnd<"<", DefaultNesting>;

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
