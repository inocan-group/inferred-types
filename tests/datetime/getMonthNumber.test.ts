import { describe, expect, it } from "vitest";
import {
    Expect,
    GetMonthNumber,
    MonthNumber,
    Test,
} from "inferred-types/types";
import moment from "moment";
import { getMonthNumber, parseIsoDate } from "runtime/datetime";

describe("GetMonthNumber<T>", () => {

    it("ISO Year", () => {
        type E = GetMonthNumber<"2024">; // has no month info

        type cases = [
            Expect<Test<E, "isError", "month-number/missing">>,
        ];
    });

    it("ISO Date", () => {
        type Feb = GetMonthNumber<"2022-02-15">;
        type Oct = GetMonthNumber<"2022-10-15">;
        type Dec = GetMonthNumber<"2022-12-01">;

        type cases = [
            Expect<Test<Feb, "equals", 2>>,
            Expect<Test<Oct, "equals", 10>>,
            Expect<Test<Dec, "equals", 12>>,
        ];
    });

    it("ISO DateTime", () => {
        type Feb = GetMonthNumber<"2022-02-15T12:00">;
        type Oct = GetMonthNumber<"2022-10-15T12:45Z">;
        type Dec = GetMonthNumber<"2022-12-01T23:59.999+01:30">;

        type cases = [
            Expect<Test<Feb, "equals", 2>>,
            Expect<Test<Oct, "equals", 10>>,
            Expect<Test<Dec, "equals", 12>>,
        ];
    });


    it("Month Name", () => {
        type Feb = GetMonthNumber<"February">;
        type Oct = GetMonthNumber<"October">;
        type Dec = GetMonthNumber<"December">;

        type cases = [
            Expect<Test<Feb, "equals", 2>>,
            Expect<Test<Oct, "equals", 10>>,
            Expect<Test<Dec, "equals", 12>>,
        ];
    });

    it("Month Abbreviation", () => {
        type Feb = GetMonthNumber<"Feb">;
        type Oct = GetMonthNumber<"Oct">;
        type Dec = GetMonthNumber<"Dec">;

        type cases = [
            Expect<Test<Feb, "equals", 2>>,
            Expect<Test<Oct, "equals", 10>>,
            Expect<Test<Dec, "equals", 12>>,
        ];
    });


    it("epoch in milliseconds, union type at design time", () => {
        const date = new Date("2022-12-01");
        const epoch = date.getUTCMilliseconds();
        type Dec = GetMonthNumber<typeof epoch>;

        type cases = [
            Expect<Test<Dec, "equals", MonthNumber>>
        ];
    });

    it("JS Date object, union type at design time", () => {
        const date = new Date("2022-12-01");
        type Dec = GetMonthNumber<typeof date>;

        type cases = [
            Expect<Test<Dec, "equals", MonthNumber>>
        ];
    });

    it("MomentJS Date object, union type at design time", () => {
        const date = moment("2022-12-01");
        type Dec = GetMonthNumber<typeof date>;

        type cases = [
            Expect<Test<Dec, "equals", MonthNumber>>
        ];
    });

    it("wide numeric", () => {
        type Num = GetMonthNumber<number>;

        type cases = [
            Expect<Test<Num, "equals", MonthNumber>>
        ];
    });


});


describe("getMonthNumber(date)", () => {


    it("ISO Year", () => {
        const year = getMonthNumber("2023");
        expect(year instanceof Error).toBe(true);

        type cases = [
            Expect<Test<typeof year, "isError", "month-number/missing">>
        ];
    });


    it("ISO Date", () => {
        const e = parseIsoDate("2022-02-33");
        const p = parseIsoDate("2022-02-15");
        const feb = getMonthNumber("2022-02-15");
        const oct = getMonthNumber("2022-10-15");
        const dec = getMonthNumber("2022-12-01");

        expect(feb).toBe(2);
        expect(oct).toBe(10);
        expect(dec).toBe(12);

        type cases = [
            Expect<Test<typeof feb, "equals", 2>>,
            Expect<Test<typeof oct, "equals", 10>>,
            Expect<Test<typeof dec, "equals", 12>>,
        ];
    });



});
