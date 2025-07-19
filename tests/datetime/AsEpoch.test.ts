import { describe, it } from "vitest";
import { Expect, Test, AsEpoch, ParseDate } from "inferred-types/types";

describe("AsEpoch<T>", () => {
    it("should return epoch components for a valid date", () => {
        type ParsedDate = ParseDate<"2024-12-24">;
        type EpochComponents = AsEpoch<ParsedDate>;

        // Check the structure
        type cases = [
            // The result should be an object with the expected properties
            Expect<Test<EpochComponents, "hasSameKeys", {
                year: number,
                yearMultiplier: number,
                daysBeforeMonth: number,
                date: number,
                dayMultiplier: number
            }>>,
        ];

        // Check specific values if they resolve to literals
        type Year = EpochComponents extends { year: infer Y } ? Y : never;
        type YearMultiplier = EpochComponents extends { yearMultiplier: infer YM } ? YM : never;
        type DaysBeforeMonth = EpochComponents extends { daysBeforeMonth: infer D } ? D : never;
        type Date = EpochComponents extends { date: infer D } ? D : never;
        type DayMultiplier = EpochComponents extends { dayMultiplier: infer DM } ? DM : never;

        type valueChecks = [
            Expect<Test<Year, "equals", 2024>>,
            Expect<Test<YearMultiplier, "equals", 31536000>>,
            Expect<Test<DaysBeforeMonth, "equals", 334>>, // December in non-leap year
            Expect<Test<Date, "equals", 24>>,
            Expect<Test<DayMultiplier, "equals", 86400>>,
        ];
    });

    it("should handle leap years correctly", () => {
        type ParsedLeapDate = ParseDate<"2024-03-01">; // 2024 is a leap year
        type LeapEpochComponents = AsEpoch<ParsedLeapDate>;

        type DaysBeforeMarch = LeapEpochComponents extends { daysBeforeMonth: infer D } ? D : never;

        type cases = [
            // March in a leap year should have 60 days before it (31 + 29)
            Expect<Test<DaysBeforeMarch, "equals", 60>>,
        ];
    });

    it("should return error for invalid input", () => {
        type InvalidInput = AsEpoch<"not a parsed date">;

        type cases = [
            Expect<Test<InvalidInput, "isError", true>>,
        ];
    });
});
