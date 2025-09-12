import { describe, it } from "vitest";
import type { Expect, ParseDate, ParsedDate, Test } from "inferred-types/types";

describe("AsParsedDate<T>", () => {

    it("ISO Year", () => {
        type Parsed = ParseDate<"2022">;

        type cases = [
            Expect<Test<Parsed, "extends", ParsedDate>>,
        ]
    });

    it("ISO Year Independent Date", () => {
        type Parsed = ParseDate<"--10-04">;

        type cases = [
            Expect<Test<Parsed, "extends", ParsedDate>>,
        ]
    });
    it("ISO Year Month", () => {
        type Parsed = ParseDate<"-2024-10">;

        type cases = [
            Expect<Test<Parsed, "extends", ParsedDate>>,
        ];
    });

    it("ISO Date", () => {
        type Parsed = ParseDate<"2022-10-04">;

        type cases = [
            Expect<Test<Parsed, "extends", ParsedDate>>,
        ];
    });

    it("ISO DateTime", () => {
        type Parsed = ParseDate<"2022-10-04T12:34Z">;

        type cases = [
            Expect<Test<Parsed, "extends", ParsedDate>>,
        ];
    });

    it("ISO DateTime at midnight in UTC -> a Date posing as a DateTime", () => {
        type Parsed = ParseDate<"2022-10-04T00:00Z">;

        type cases = [
            Expect<Test<Parsed, "extends", ParsedDate>>,
        ];
    });

});
