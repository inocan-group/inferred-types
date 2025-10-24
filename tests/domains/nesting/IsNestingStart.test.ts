import { describe, it } from "vitest";
import type { DefaultNesting, Expect, IsEntryToken, Test } from "inferred-types/types";

describe("IsEntryToken<TChar,TNesting>", () => {

    it("happy path", () => {
        type T1 = IsEntryToken<"{", DefaultNesting>;
        type T2 = IsEntryToken<"(", DefaultNesting>;
        type T3 = IsEntryToken<"<", DefaultNesting>;

        type F1 = IsEntryToken<"}", DefaultNesting>;
        type F2 = IsEntryToken<"g", DefaultNesting>;
        type F3 = IsEntryToken<">", DefaultNesting>;

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
