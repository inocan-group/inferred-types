import { describe, it } from "vitest";
import {
    Expect,
    IsIsoMonthDate,
    Test,
} from "inferred-types/types";

describe("IsIsoMonthDate<T>", () => {

    it("Explicit Form", () => {
        type T1 = IsIsoMonthDate<"--01-01">;
        type T2 = IsIsoMonthDate<"--12-31">;

        type F1 = IsIsoMonthDate<"--01-32">;
        type F2 = IsIsoMonthDate<"--01-1">;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,

            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
        ];
    });

    it("Implicit Form", () => {
        type T1 = IsIsoMonthDate<"--0101">;
        type T2 = IsIsoMonthDate<"--1231">;

        type F1 = IsIsoMonthDate<"--0132">;
        type F2 = IsIsoMonthDate<"--011">;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,

            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
        ];
    });

});
