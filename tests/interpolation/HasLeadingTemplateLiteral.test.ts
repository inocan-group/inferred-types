import { describe, it } from "vitest";
import type { Expect, StartsWithTemplateLiteral, Test } from "inferred-types/types";

describe("HasLeadingTemplateLiteral<T>", () => {

    it("Happy path", () => {
        type T1 = StartsWithTemplateLiteral<`${string} hi`>;
        type T2 = StartsWithTemplateLiteral<`${number} hi`>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
        ];
    });

    it("negative tests", () => {
        type F1 = StartsWithTemplateLiteral<`hi ${string}`>;
        type F2 = StartsWithTemplateLiteral<`hi ${number}`>;
        type F3 = StartsWithTemplateLiteral<`hi ${boolean}`>;

        type cases = [
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,
        ];
    });

});
