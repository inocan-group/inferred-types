import { describe, it } from "vitest";
import {
    Expect,
    IsIsoFullDate,
    Test,
} from "inferred-types/types";

describe("IsIsoFullDate<T>", () => {

    describe("explicit form", () => {
        it("happy path", () => {
            type T1 = IsIsoFullDate<"2023-06-01">;
            type T2 = IsIsoFullDate<"2021-02-28">;

            type cases = [
                Expect<Test<T1, "equals", true>>,
                Expect<Test<T2, "equals", true>>,
            ];
        });


        it("out-of-range fails", () => {
            type F1 = IsIsoFullDate<"20222-06-01">; // year
            type F2 = IsIsoFullDate<"2022-13-01">; // month
            type F3 = IsIsoFullDate<"2022-06-33">; // date

            type cases = [
                Expect<Test<F1, "equals", false>>,
                Expect<Test<F2, "equals", false>>,
                Expect<Test<F3, "equals", false>>,
            ];
        });


        it("month context -> date", () => {
            type T1 = IsIsoFullDate<"2022-05-31">;
            type F1 = IsIsoFullDate<"2022-06-31">; // June only has 30 days

            type cases = [
                Expect<Test<T1, "equals", true>>,
                Expect<Test<F1, "equals", false>>,
            ];
        });


        it("leap year context", () => {
            type T1 = IsIsoFullDate<"2024-02-29">; // 2024 is a double leap year
            type T2 = IsIsoFullDate<"2024-02-30">;
            type T3 = IsIsoFullDate<"2004-02-29">; // 2004 is a regular leap year

            type F1 = IsIsoFullDate<"1999-02-29">; // not a leap year
            type F2 = IsIsoFullDate<"2004-02-30">; // only a regular leap year, not double

            type cases = [
                Expect<Test<T1, "equals", true>>,
                Expect<Test<T2, "equals", true>>,
                Expect<Test<T3, "equals", true>>,

                Expect<Test<F1, "equals", false>>,
                Expect<Test<F2, "equals", false>>,
            ];
        });


        it("time information -> false", () => {
            type F1 = IsIsoFullDate<"2024-03-01TZ">;
            type F2 = IsIsoFullDate<"2024-03-01 12:34">;

            type cases = [
                Expect<Test<F1, "equals", false>>,
                Expect<Test<F2, "equals", false>>,
            ];
        });

    })

    describe("implicit form", () => {
        it("happy path", () => {
            type T1 = IsIsoFullDate<"20230601">;
            type T2 = IsIsoFullDate<"20210228">;

            type cases = [
                Expect<Test<T1, "equals", true>>,
                Expect<Test<T2, "equals", true>>,
            ];
        });


        it("out-of-range fails", () => {
            type F1 = IsIsoFullDate<"202220601">; // year
            type F2 = IsIsoFullDate<"20221301">; // month
            type F3 = IsIsoFullDate<"20220633">; // date

            type cases = [
                Expect<Test<F1, "equals", false>>,
                Expect<Test<F2, "equals", false>>,
                Expect<Test<F3, "equals", false>>,
            ];
        });


        it("month context -> date", () => {
            type T1 = IsIsoFullDate<"20220531">;
            type F1 = IsIsoFullDate<"20220631">; // June only has 30 days

            type cases = [
                Expect<Test<T1, "equals", true>>,
                Expect<Test<F1, "equals", false>>,
            ];
        });


        it("leap year context", () => {
            type T1 = IsIsoFullDate<"20240229">; // 2024 is a double leap year
            type T2 = IsIsoFullDate<"20240230">;
            type T3 = IsIsoFullDate<"20040229">; // 2004 is a regular leap year

            type F1 = IsIsoFullDate<"19990229">; // not a leap year
            type F2 = IsIsoFullDate<"20040230">; // only a regular leap year, not double

            type cases = [
                Expect<Test<T1, "equals", true>>,
                Expect<Test<T2, "equals", true>>,
                Expect<Test<T3, "equals", true>>,

                Expect<Test<F1, "equals", false>>,
                Expect<Test<F2, "equals", false>>,
            ];
        });


        it("time information -> false", () => {
            type F1 = IsIsoFullDate<"20240301TZ">;
            type F2 = IsIsoFullDate<"20240301 12:34">;

            type cases = [
                Expect<Test<F1, "equals", false>>,
                Expect<Test<F2, "equals", false>>,
            ];
        });

    })


});
