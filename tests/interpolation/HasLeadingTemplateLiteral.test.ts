import { describe, it } from "vitest";
import {
    Expect,
    HasLeadingTemplateLiteral,
    Test,
} from "inferred-types/types";

describe("HasLeadingTemplateLiteral<T>", () => {

    it("Happy path", () => {
        type T1 = HasLeadingTemplateLiteral<`${string} hi`>;
        type T2 = HasLeadingTemplateLiteral<`${number} hi`>;
        type T3 = HasLeadingTemplateLiteral<`${boolean} hi`>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
        ];
    });

    it("negative tests", () => {
        type F1 = HasLeadingTemplateLiteral<`hi ${string}`>;
        type F2 = HasLeadingTemplateLiteral<`hi ${number}`>;
        type F3 = HasLeadingTemplateLiteral<`hi ${boolean}`>;

        type cases = [
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,
        ];
    });

});
