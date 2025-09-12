

import { describe, it } from "vitest";
import type { Expect, IsIsoDate, Test } from "inferred-types/types";

describe("IsIsoDate<T>", () => {

    it("IsoYear", () => {
        type cases = [
            Expect<Test<IsIsoDate<"2023">, "equals", true>>,
            Expect<Test<IsIsoDate<"2024">, "equals", true>>,
            Expect<Test<IsIsoDate<"1999">, "equals", true>>,
            Expect<Test<IsIsoDate<"2025">, "equals", true>>,
            Expect<Test<IsIsoDate<"0001">, "equals", true>>,
            Expect<Test<IsIsoDate<"9999">, "equals", true>>,
        ];
    });

    it("Full ISO (YYYY-MM-DD)", () => {
        type cases = [
            Expect<Test<IsIsoDate<"2023-01-01">, "equals", true>>,
            Expect<Test<IsIsoDate<"2023-12-31">, "equals", true>>,
            Expect<Test<IsIsoDate<"2024-02-29">, "equals", true>>,
            Expect<Test<IsIsoDate<"2023-06-15">, "equals", true>>,
        ];
    });

    it("Full ISO Implicit (YYYYMMDD)", () => {
        type cases = [
            Expect<Test<IsIsoDate<"20230101">, "equals", true>>,
            Expect<Test<IsIsoDate<"20231231">, "equals", true>>,
            Expect<Test<IsIsoDate<"20240229">, "equals", true>>,
            Expect<Test<IsIsoDate<"20230615">, "equals", true>>,
        ];
    });

    it("YearMonth Explicit (-YYYY-MM)", () => {
        type T1 = IsIsoDate<"-2023-01">;
        type T2 = IsIsoDate<"-2023-12">;
        type T3 = IsIsoDate<"-2024-02">;
        type T4 = IsIsoDate<"-2023-06">;

        type F1 = IsIsoDate<"-2023-13">; // invalid month

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
            Expect<Test<T4, "equals", true>>,

            Expect<Test<F1, "equals", false>>,
        ];
    });

    it("YearMonth Implicit (-YYYYMM)", () => {
        type T1 = IsIsoDate<"-202301">;
        type T2 = IsIsoDate<"-202312">;
        type T3 = IsIsoDate<"-202402">;
        type T4 = IsIsoDate<"-202306">;

        type F1 = IsIsoDate<"-202313">; // invalid month

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
            Expect<Test<T4, "equals", true>>,

            Expect<Test<F1, "equals", false>>,
        ];
    });

    it("Explicit Month-Date (--MM-DD)", () => {
        type T1 = IsIsoDate<"--01-01">;
        type T2 = IsIsoDate<"--12-31">;
        type T3 = IsIsoDate<"--02-28">;

        type F1 = IsIsoDate<"--02-32">;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
            Expect<Test<F1, "equals", false>>,
        ];
    });

    it("Implicit Month-Date (--MMDD)", () => {
        type T1 = IsIsoDate<"--0101">;
        type T2 = IsIsoDate<"--1231">;
        type T3 = IsIsoDate<"--0228">;

        type F1 = IsIsoDate<"--0232">;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
            Expect<Test<F1, "equals", false>>,
        ];
    });

    it("Invalid Date Formats", () => {
        type cases = [
            // Invalid formats that should return false
            Expect<Test<IsIsoDate<"2023/01/01">, "equals", false>>,
            Expect<Test<IsIsoDate<"01/01/2023">, "equals", false>>,
            Expect<Test<IsIsoDate<"2023-1-1">, "equals", false>>, // Single digit month/day
            Expect<Test<IsIsoDate<"23-01-01">, "equals", false>>, // 2-digit year
            Expect<Test<IsIsoDate<"2023-13-01">, "equals", false>>, // Invalid month
            Expect<Test<IsIsoDate<"2023-01-32">, "equals", false>>, // Invalid day
            Expect<Test<IsIsoDate<"hello">, "equals", false>>,
            Expect<Test<IsIsoDate<"">, "equals", false>>,
            Expect<Test<IsIsoDate<"not-a-date">, "equals", false>>,
        ];
    });

    it("Invalid Length and Structure", () => {
        type cases = [
            // Wrong length or structure
            Expect<Test<IsIsoDate<"123">, "equals", false>>, // Too short
            Expect<Test<IsIsoDate<"12345">, "equals", false>>, // Too long for year
            Expect<Test<IsIsoDate<"2023-1">, "equals", false>>, // Single digit month
            Expect<Test<IsIsoDate<"2023-001">, "equals", false>>, // 3-digit month
            Expect<Test<IsIsoDate<"--1-01">, "equals", false>>, // Single digit month in --MM-DD
            Expect<Test<IsIsoDate<"--01-1">, "equals", false>>, // Single digit day in --MM-DD
        ];
    });

    it("Non-String Types", () => {
        type cases = [
            Expect<Test<IsIsoDate<number>, "equals", false>>,
            Expect<Test<IsIsoDate<2023>, "equals", false>>,
            Expect<Test<IsIsoDate<boolean>, "equals", false>>,
            Expect<Test<IsIsoDate<true>, "equals", false>>,
            Expect<Test<IsIsoDate<false>, "equals", false>>,
            Expect<Test<IsIsoDate<null>, "equals", false>>,
            Expect<Test<IsIsoDate<undefined>, "equals", false>>,
            Expect<Test<IsIsoDate<{}>, "equals", false>>,
            Expect<Test<IsIsoDate<[]>, "equals", false>>,
            Expect<Test<IsIsoDate<Date>, "equals", false>>,
        ];
    });

    it("Wide String Types", () => {
        type cases = [
            Expect<Test<IsIsoDate<string>, "equals", boolean>>,
        ];
    });

    it("Union Types", () => {
        type PureUnion = IsIsoDate<"2023" | "2024">;
        type MixedUnion = IsIsoDate<"2023" | "hello">;
        type NoneUnion = IsIsoDate<"hello" | "goodbye">;

        type cases = [
            Expect<Test<PureUnion, "equals", true>>,
            Expect<Test<MixedUnion, "equals", boolean>>,
            Expect<Test<NoneUnion, "equals", false>>,
        ];
    });

});
