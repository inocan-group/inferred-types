import { describe, it } from "vitest";
import type { AsDateMeta, AssertEqual, AssertExtends, DateMeta, Expect, FourDigitYear, ParseDate, ParsedDate, TwoDigitDate, TwoDigitMonth } from "inferred-types/types";

describe("AsDateMeta<T>", () => {

    it("from a parsed date", () => {
        type P = ParseDate<"2022-12-24">;
        type M = AsDateMeta<P>;

        type cases = [
            Expect<AssertExtends<M, DateMeta>>,
            Expect<AssertEqual<M["year"], FourDigitYear<"2022">>>,
            Expect<AssertEqual<M["month"], TwoDigitMonth<"12">>>,
            Expect<AssertEqual<M["date"], TwoDigitDate<"24">>>,
        ];
    });

    it("from ISO Year string", () => {
        type P = ParseDate<"2024">;
        type T = AsDateMeta<"2024">;

        type cases = [
            Expect<AssertExtends<P, ParsedDate>>,
            Expect<AssertExtends<T, DateMeta>>,
            Expect<AssertEqual<T["dateType"], "year">>,
        ];
    });

    it("from ISO YearMonth string", () => {
        type P = ParseDate<"-2024-12">;
        type T = AsDateMeta<"-2024-12">;

        type cases = [
            Expect<AssertExtends<P, ParsedDate>>,
            Expect<AssertExtends<T, DateMeta>>,
            Expect<AssertEqual<T["dateType"], "year-month">>,
        ];
    });

    it("from ISO MonthDate string", () => {
        type P = ParseDate<"--12-25">;
        type T = AsDateMeta<"--12-25">;

        type cases = [
            Expect<AssertExtends<P, ParsedDate>>,
            Expect<AssertExtends<T, DateMeta>>,
            Expect<AssertEqual<T["dateType"], "year-independent">>,
        ];
    });

    it("from ISO DateTime string", () => {
        type P = ParseDate<"2022-12-20T12:30:00Z">;
        type T = AsDateMeta<"2022-12-20T12:30:00Z">;

        type cases = [
            Expect<AssertExtends<P, ParsedDate>>,
            Expect<AssertExtends<T, DateMeta>>,
            Expect<AssertEqual<T["dateType"], "datetime">>,
        ];
    });

});
