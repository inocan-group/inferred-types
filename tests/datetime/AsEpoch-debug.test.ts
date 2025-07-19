import { describe, it } from "vitest";
import { ParseDate, AsEpoch, FourDigitYear, TwoDigitMonth, TwoDigitDate, AsNumber } from "inferred-types/types";

describe("AsEpoch Debug", () => {
    it("debug ParseDate output", () => {
        type P = ParseDate<"2024-12-24">;

        // Check the structure
        type P_Structure = P;
        type P_0 = P[0];
        type P_1 = P[1];
        type P_2 = P[2];
        type P_3 = P[3];

        // Check if it's a ParsedDate
        type IsParsedDate = P extends [
            FourDigitYear<"branded"> | null,
            TwoDigitMonth<"branded"> | null,
            TwoDigitDate<"branded"> | null,
            unknown
        ] ? true : false;

        // Check pattern matching
        type PatternMatch = P extends [
            infer Year extends FourDigitYear<"branded">,
            infer Month extends TwoDigitMonth<"branded">,
            infer Date extends TwoDigitDate<"branded">,
            ...unknown[]
        ] ? { matched: true, year: Year, month: Month, date: Date } : { matched: false };

        // Check numeric extraction
        type ExtractYear = P[0] extends `${infer Y extends number}` ? Y : "failed";
        type ExtractMonth = P[1] extends `${infer M extends number}` ? M : "failed";
        type ExtractDate = P[2] extends `${infer D extends number}` ? D : "failed";

        // Check AsNumber on branded types
        type TestBranded = "2024" & { kind: "FourDigitYear" };
        type TestAsNumber = AsNumber<TestBranded>;
        type TestExtract = TestBranded extends `${infer N extends number}` ? N : "failed";

        // Direct test with known branded values
        type DirectBranded = AsEpoch<[
            "2024" & { kind: "FourDigitYear" },
            "12" & { kind: "TwoDigitMonth" },
            "24" & { kind: "TwoDigitDate" },
            null
        ]>;

        // Test the final result
        type Result = AsEpoch<P>;

        // Log all for inspection
        type Debug = {
            parsed: P_Structure,
            isParsedDate: IsParsedDate,
            patternMatch: PatternMatch,
            extractedNumbers: {
                year: ExtractYear,
                month: ExtractMonth,
                date: ExtractDate
            },
            brandedTest: {
                branded: TestBranded,
                asNumber: TestAsNumber,
                extract: TestExtract
            },
            directBranded: DirectBranded,
            result: Result
        };
    });
});
