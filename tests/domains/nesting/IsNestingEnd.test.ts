import { describe, it } from "vitest";
import type { DefaultNesting, Expect, IsExitToken, Test } from "inferred-types/types";

describe("IsExitToken<TChar,TNesting>", () => {

    it("happy path", () => {
        type T1 = IsExitToken<"}", DefaultNesting>;
        type T2 = IsExitToken<")", DefaultNesting>;
        type T3 = IsExitToken<">", DefaultNesting>;

        type F1 = IsExitToken<"{", DefaultNesting>;
        type F2 = IsExitToken<"g", DefaultNesting>;
        type F3 = IsExitToken<"<", DefaultNesting>;

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
