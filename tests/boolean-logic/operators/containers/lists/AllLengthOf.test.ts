import { describe, it } from "vitest";
import type { AllLengthOf, Expect, Test } from "inferred-types/types";

describe("AllLengthOf", () => {

    it("positive tests", () => {
        type T1 = AllLengthOf<["a","b"], 1>;
        type T2 = AllLengthOf<["ab","cd"], 2>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
        ];
    });

    it("negative tests", () => {
        type F1 = AllLengthOf<["a","bb"], 1>;
        type F2 = AllLengthOf<["aa","bb"], 1>;

        type cases = [
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
        ];
    });

});
