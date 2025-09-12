import { describe, it } from "vitest";
import type { Expect, IsNever, Test } from "inferred-types/types";

describe("IsNever", () => {
    it("should return true for never type", () => {
        type T1 = IsNever<never>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
        ];
    });

    it("should return false for non-never types", () => {
        type T1 = IsNever<string>;
        type T2 = IsNever<number>;
        type T3 = IsNever<null>;
        type T4 = IsNever<undefined>;
        type T5 = IsNever<any>;
        type T6 = IsNever<unknown>;
        type T7 = IsNever<{}>;
        type T8 = IsNever<[]>;

        type cases = [
            Expect<Test<T1, "equals", false>>,
            Expect<Test<T2, "equals", false>>,
            Expect<Test<T3, "equals", false>>,
            Expect<Test<T4, "equals", false>>,
            Expect<Test<T5, "equals", false>>,
            Expect<Test<T6, "equals", false>>,
            Expect<Test<T7, "equals", false>>,
            Expect<Test<T8, "equals", false>>,
        ];
    });
});
