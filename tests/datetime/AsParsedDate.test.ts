import { describe, it } from "vitest";
import {
    Expect,
    ParseDate,
    AsParsedDate,
    Test,
} from "inferred-types/types";

describe("AsParsedDate<T>", () => {

    it("ISO Year", () => {
        type Parsed = ParseDate<"2022">;
        type Meta = AsParsedDate<Parsed>;

        type cases = [
            Expect<Test<
                Meta, "equals",
                {
                    dateType: "year",
                    hasTime: false,
                    year: "2022",
                    month: null,
                    date: null,
                    hour: null,
                    minute: null,
                    second: null,
                    ms: null,
                    timezone: null
                }
            >>
        ];
    });

    it("ISO Year Independent Date", () => {
        type Parsed = ParseDate<"--10-04">;
        type Meta = AsParsedDate<Parsed>;

        type cases = [
            Expect<Test<
                Meta, "equals",
                {
                    dateType: "year-independent",
                    hasTime: false,
                    year: null,
                    month: "10",
                    date: "04",
                    hour: null,
                    minute: null,
                    second: null,
                    ms: null,
                    timezone: null
                }
            >>
        ];
    });
        it("ISO Year Month", () => {
        type Parsed = ParseDate<"-2024-10">;
        type Meta = AsParsedDate<Parsed>;

        type cases = [
            Expect<Test<
                Meta, "equals",
                {
                    dateType: "year-month",
                    hasTime: false,
                    year: "2024",
                    month: "10",
                    date: null,
                    hour: null,
                    minute: null,
                    second: null,
                    ms: null,
                    timezone: null
                }
            >>
        ];
    });

    it("ISO Date", () => {
        type Parsed = ParseDate<"2022-10-04">;
        type Meta = AsParsedDate<Parsed>;

        type cases = [
            Expect<Test<
                Meta, "equals",
                {
                    dateType: "date",
                    hasTime: false,
                    year: "2022",
                    month: "10",
                    date: "04",
                    hour: null,
                    minute: null,
                    second: null,
                    ms: null,
                    timezone: null
                }
            >>
        ];
    });

    it("ISO DateTime", () => {
        type Parsed = ParseDate<"2022-10-04T12:34Z">;
        type Meta = AsParsedDate<Parsed>;

        type cases = [
            Expect<Test<
                Meta, "equals",
                {
                    dateType: "datetime",
                    hasTime: true,
                    year: "2022",
                    month: "10",
                    date: "04",
                    hour: "12",
                    minute: "34",
                    second: null,
                    ms: null,
                    timezone: "Z"
                }
            >>
        ];
    });

    it("ISO DateTime at midnight in UTC -> a Date posing as a DateTime", () => {
        type Parsed = ParseDate<"2022-10-04T00:00Z">;
        type Meta = AsParsedDate<Parsed>;

        type cases = [
            Expect<Test<
                Meta, "equals",
                {
                    dateType: "datetime",
                    hasTime: false, // indicates the time component is 0
                    year: "2022",
                    month: "10",
                    date: "04",
                    hour: "00",
                    minute: "00",
                    second: null,
                    ms: null,
                    timezone: "Z"
                }
            >>
        ];
    });

});
