import { describe, it } from "vitest";
import type { AsDateMeta, DateMeta, Expect, FourDigitYear, ParseDate, ParsedDate, Test, TwoDigitDate, TwoDigitMonth } from "inferred-types/types";

describe("AsDateMeta<T>", () => {

    it("from a parsed date", () => {
        type P = ParseDate<"2022-12-24">;
        type M = AsDateMeta<P>;

        type cases = [
            Expect<Test<
                M, "extends",
                DateMeta
            >>,
            Expect<Test<
                M["year"], "equals",
                FourDigitYear<"2022">
            >>,
            Expect<Test<
                M["month"], "equals",
                TwoDigitMonth<"12">
            >>,
            Expect<Test<
                M["date"], "equals",
                TwoDigitDate<"24">
            >>,
        ];
    });

    it("from ISO Year string", () => {
        type P = ParseDate<"2024">;
        type T = AsDateMeta<"2024">;

        type cases = [
            Expect<Test<P, "extends", ParsedDate>>,
            Expect<Test<T, "extends", DateMeta>>,
            Expect<Test<T["dateType"], "equals", "year">>,
        ];
    });

    it("from ISO YearMonth string", () => {
        type P = ParseDate<"-2024-12">;
        type T = AsDateMeta<"-2024-12">;

        type cases = [
            Expect<Test<P, "extends", ParsedDate>>,
            Expect<Test<T, "extends", DateMeta>>,
            Expect<Test<T["dateType"], "equals", "year-month">>,
        ];
    });

    it("from ISO MonthDate string", () => {
        type P = ParseDate<"--12-25">;
        type T = AsDateMeta<"--12-25">;

        type cases = [
            Expect<Test<P, "extends", ParsedDate>>,
            Expect<Test<T, "extends", DateMeta>>,
            Expect<Test<T["dateType"], "equals", "year-independent">>,
        ];
    });

    it("from ISO DateTime string", () => {
        type P = ParseDate<"2022-12-20T12:30:00Z">;
        type T = AsDateMeta<"2022-12-20T12:30:00Z">;

        type cases = [
            Expect<Test<P, "extends", ParsedDate>>,
            Expect<Test<T, "extends", DateMeta>>,
            Expect<Test<T["dateType"], "equals", "datetime">>,
        ];
    });

});
