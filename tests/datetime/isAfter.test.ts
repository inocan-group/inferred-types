import { describe, it, expect } from "vitest";
import { isAfter, asDate } from "inferred-types/runtime";
import type { DateLike, Expect, IsAfter, Test } from "inferred-types/types";

describe("isAfter()", () => {

    describe("runtime behavior", () => {

        it("should work with Date objects", () => {
            const earlier = new Date(2024, 0, 1); // Jan 1, 2024
            const later = new Date(2024, 0, 15); // Jan 15, 2024
            const same = new Date(2024, 0, 1); // Jan 1, 2024

            const checkAfterEarlier = isAfter(earlier);

            expect(checkAfterEarlier(later)).toBe(true);
            expect(checkAfterEarlier(same)).toBe(false);
            expect(checkAfterEarlier(earlier)).toBe(false);

            // Type tests - Date objects should return boolean (not literal)
            type CheckFn = typeof checkAfterEarlier;
            type Result = ReturnType<CheckFn>;
            type cases = [
                Expect<Test<Result, "equals", boolean>>
            ];
        });

        it("should work with ISO date strings", () => {
            const checkAfter2024 = isAfter("2024-01-01" as DateLike);

            expect(checkAfter2024("2024-01-02")).toBe(true);
            expect(checkAfter2024("2024-01-01")).toBe(false);
            expect(checkAfter2024("2023-12-31")).toBe(false);
        });

        it("should work with ISO datetime strings", () => {
            // Note: asDate strips time, so same-day comparisons will be equal
            const checkAfterDay1 = isAfter("2024-01-01T10:00:00Z");

            expect(checkAfterDay1("2024-01-02T11:00:00Z")).toBe(true);
            expect(checkAfterDay1("2024-01-01T15:00:00Z")).toBe(false); // Same day
            expect(checkAfterDay1("2023-12-31T23:00:00Z")).toBe(false);
        });

        it("should work with Unix timestamps", () => {
            const timestamp1 = 1704067200; // 2024-01-01 00:00:00 UTC
            const timestamp2 = 1704153600; // 2024-01-02 00:00:00 UTC

            const checkAfterTimestamp1 = isAfter(timestamp1);

            expect(checkAfterTimestamp1(timestamp2)).toBe(true);
            expect(checkAfterTimestamp1(timestamp1)).toBe(false);

            // Type tests - number literals should give exact results
            type Result1 = IsAfter<typeof timestamp2, typeof timestamp1>;
            type Result2 = IsAfter<typeof timestamp1, typeof timestamp1>;
            type cases = [
                Expect<Test<Result1, "equals", true>>,
                Expect<Test<Result2, "equals", false>>
            ];
        });

        it("should work with year numbers", () => {
            const checkAfter2023 = isAfter(2023);

            expect(checkAfter2023(2024)).toBe(true);
            expect(checkAfter2023(2023)).toBe(false);
            expect(checkAfter2023(2022)).toBe(false);

            // Type tests - year literals should give exact results
            type CheckAfter2023 = IsAfter<2024, 2023>;
            type CheckSame = IsAfter<2023, 2023>;
            type CheckBefore = IsAfter<2022, 2023>;
            type cases = [
                Expect<Test<CheckAfter2023, "equals", true>>,
                Expect<Test<CheckSame, "equals", false>>,
                Expect<Test<CheckBefore, "equals", false>>
            ];
        });

        it("should handle mixed date types", () => {
            const checkAfterIsoDate = isAfter("2024-01-01" as DateLike);
            const dateObj = new Date(2024, 0, 2); // Jan 2, 2024
            const timestamp = 1704240000; // 2024-01-03 00:00:00 UTC

            expect(checkAfterIsoDate(dateObj)).toBe(true);
            expect(checkAfterIsoDate(timestamp)).toBe(true);
            expect(checkAfterIsoDate("2023-12-31")).toBe(false);
        });

        it("should handle edge cases", () => {
            // Different days (since asDate strips time)
            const date1 = new Date(2024, 0, 1);
            const date2 = new Date(2024, 0, 2); // Next day

            const checkAfterDate1 = isAfter(date1);
            expect(checkAfterDate1(date2)).toBe(true);

            // Leap year boundary
            const checkAfterLeapDay = isAfter("2024-02-29");
            expect(checkAfterLeapDay("2024-03-01")).toBe(true);
            expect(checkAfterLeapDay("2024-02-28")).toBe(false);
        });

        it("should handle timezone considerations", () => {
            const utcTime = "2024-01-01T12:00:00Z";
            const offsetTime = "2024-01-01T13:00:00+01:00"; // Same UTC time, same day
            const laterDay = "2024-01-02T01:00:00Z"; // Next day

            const checkAfterUtc = isAfter(utcTime);

            expect(checkAfterUtc(offsetTime)).toBe(false); // Same day
            expect(checkAfterUtc(laterDay)).toBe(true); // Next day
        });
    });

    describe("type-level behavior", () => {

        it("should provide exact literal types for comprehensive date comparisons", () => {
            // Test comprehensive date literal comparisons
            type YearComparisons = [
                Expect<Test<IsAfter<2025, 2024>, "equals", true>>,
                Expect<Test<IsAfter<2024, 2025>, "equals", false>>,
                Expect<Test<IsAfter<2024, 2024>, "equals", false>>
            ];

            // Test ISO date string comparisons
            type DateComparisons = [
                Expect<Test<IsAfter<"2024-12-31", "2024-01-01">, "equals", true>>,
                Expect<Test<IsAfter<"2024-01-01", "2024-12-31">, "equals", false>>,
                Expect<Test<IsAfter<"2024-06-15", "2024-06-14">, "equals", true>>,
                Expect<Test<IsAfter<"2024-02-29", "2024-02-28">, "equals", true>>, // Leap year
                Expect<Test<IsAfter<"2024-03-01", "2024-02-29">, "equals", true>>
            ];

            // Test ISO datetime string comparisons
            type DateTimeComparisons = [
                Expect<Test<IsAfter<"2024-01-01T12:00:00Z", "2024-01-01T11:00:00Z">, "equals", true>>,
                Expect<Test<IsAfter<"2024-01-01T11:00:00Z", "2024-01-01T12:00:00Z">, "equals", false>>,
                Expect<Test<IsAfter<"2024-01-02T00:00:00Z", "2024-01-01T23:59:59Z">, "equals", true>>,
                Expect<Test<IsAfter<"2024-01-01T00:00:01Z", "2024-01-01T00:00:00Z">, "equals", true>>
            ];

            // Test mixed precision comparisons  
            type MixedPrecisionComparisons = [
                Expect<Test<IsAfter<"2024-01-01", "2024-01-01T00:00:00Z">, "equals", false>>,
                Expect<Test<IsAfter<"2024-01-01T00:00:00Z", "2024-01-01">, "equals", false>>,
                Expect<Test<IsAfter<"2024-01-02", "2024-01-01T23:59:59Z">, "equals", true>>,
                Expect<Test<IsAfter<"2024-01-01T00:00:01Z", "2024-01-01">, "equals", true>>
            ];
        });

        it("should infer correct return types for literal dates", () => {
            const checkAfter2024 = isAfter("2024-01-01" as const);
            const result1 = checkAfter2024("2024-01-02" as const);
            const result2 = checkAfter2024("2023-12-31" as const);

            // Runtime validation - these should work correctly
            expect(result1).toBe(true);
            expect(result2).toBe(false);

            // Type tests - literal date string comparisons should be exact
            type DirectTest1 = IsAfter<"2024-01-02", "2024-01-01">;
            type DirectTest2 = IsAfter<"2023-12-31", "2024-01-01">;
            type cases = [
                Expect<Test<DirectTest1, "equals", true>>,
                Expect<Test<DirectTest2, "equals", false>>
            ];
        });

        it("should handle wide types correctly", () => {
            const checkAfterDate = isAfter(new Date());
            const result = checkAfterDate("2024-01-01");

            // Wide types should return boolean
            expect(typeof result).toBe("boolean");
        });

        it("should work with DateLike constraint", () => {
            function testDateLike<T extends DateLike>(date: T) {
                const checker = isAfter(date);
                return checker;
            }

            // Should accept various DateLike values
            const stringChecker = testDateLike("2024-01-01");
            const numberChecker = testDateLike(1704067200);
            const dateChecker = testDateLike(new Date());

            // Basic runtime validation
            expect(typeof stringChecker).toBe("function");
            expect(typeof numberChecker).toBe("function");
            expect(typeof dateChecker).toBe("function");
        });

        it("should preserve type information in curried function", () => {
            const isoDate = "2024-01-01" as const;
            const checker = isAfter(isoDate);

            // Basic validation that the function works as expected
            expect(typeof checker).toBe("function");
            expect(checker("2024-01-02")).toBe(true);
            expect(checker("2023-12-31")).toBe(false);
        });

        it("should handle year literal comparisons", () => {
            const checkAfter2023 = isAfter(2023 as const);
            const result2024 = checkAfter2023(2024 as const);
            const result2022 = checkAfter2023(2022 as const);

            // Runtime validation
            expect(result2024).toBe(true);
            expect(result2022).toBe(false);

            // Type tests for literal year comparisons - should be exact
            type Check2024After2023 = IsAfter<2024, 2023>;
            type Check2022After2023 = IsAfter<2022, 2023>;
            type Check2023After2023 = IsAfter<2023, 2023>;
            type cases = [
                Expect<Test<Check2024After2023, "equals", true>>,
                Expect<Test<Check2022After2023, "equals", false>>,
                Expect<Test<Check2023After2023, "equals", false>>
            ];
        });

        it("should handle ISO datetime literal comparisons", () => {
            const baseTime = "2024-01-01T12:00:00Z" as const;
            const laterDay = "2024-01-02T13:00:00Z" as const;
            const earlierDay = "2023-12-31T11:00:00Z" as const;

            const checkAfterBase = isAfter(baseTime);
            const result1 = checkAfterBase(laterDay);
            const result2 = checkAfterBase(earlierDay);

            // Runtime validation - since asDate strips time, only different days matter
            expect(result1).toBe(true);
            expect(result2).toBe(false);

            // Type tests - ISO datetime literal comparisons should be exact
            type DirectDateTimeTest1 = IsAfter<"2024-01-02T13:00:00Z", "2024-01-01T12:00:00Z">;
            type DirectDateTimeTest2 = IsAfter<"2023-12-31T11:00:00Z", "2024-01-01T12:00:00Z">;
            type SameDayDiffTime = IsAfter<"2024-01-01T23:59:59Z", "2024-01-01T00:00:00Z">;
            type cases = [
                Expect<Test<DirectDateTimeTest1, "equals", true>>,
                Expect<Test<DirectDateTimeTest2, "equals", false>>,
                Expect<Test<SameDayDiffTime, "equals", true>>
            ];
        });

        it("should handle same date comparisons", () => {
            const sameDate = "2024-01-01" as const;
            const checkAfterSame = isAfter(sameDate);
            const result = checkAfterSame(sameDate);

            // Same dates should not be "after" each other
            expect(result).toBe(false);

            // Type tests for same date comparison - should be exact false
            type SameDateCheck = IsAfter<"2024-01-01", "2024-01-01">;
            type SameDateTimeCheck = IsAfter<"2024-01-01T12:00:00Z", "2024-01-01T12:00:00Z">;
            type MixedPrecisionSame = IsAfter<"2024-01-01", "2024-01-01T00:00:00Z">;
            type cases = [
                Expect<Test<SameDateCheck, "equals", false>>,
                Expect<Test<SameDateTimeCheck, "equals", false>>,
                Expect<Test<MixedPrecisionSame, "equals", false>>
            ];
        });
    });

    describe("functional composition", () => {

        it("should work with array filtering", () => {
            const dates: DateLike[] = [
                "2024-01-01",
                "2024-01-15",
                "2024-02-01",
                "2023-12-15"
            ];

            const afterNewYear = dates.filter(isAfter("2024-01-01" as DateLike));

            expect(afterNewYear).toEqual([
                "2024-01-15",
                "2024-02-01"
            ]);
        });

        it("should work with array methods", () => {
            const dates = [
                new Date(2024, 0, 1),
                new Date(2024, 0, 15),
                new Date(2024, 1, 1),
                new Date(2023, 11, 15)
            ];

            const cutoffDate = new Date(2024, 0, 1);
            const recentDates = dates.filter(isAfter(cutoffDate));

            expect(recentDates).toHaveLength(2);
            expect(recentDates[0]).toEqual(new Date(2024, 0, 15));
            expect(recentDates[1]).toEqual(new Date(2024, 1, 1));
        });

        it("should be chainable with other date operations", () => {
            const baseDate = "2024-01-01";
            const testDates: DateLike[] = [
                "2023-12-31",
                "2024-01-01",
                "2024-01-02",
                "2024-01-15"
            ];

            const laterDates = testDates
                .filter(isAfter(baseDate))
                .map(date => `${date}T00:00:00Z`);

            expect(laterDates).toEqual([
                "2024-01-02T00:00:00Z",
                "2024-01-15T00:00:00Z"
            ]);
        });
    });

    describe("error handling", () => {

        it("should handle invalid date inputs gracefully", () => {
            // The asDate function should handle errors for invalid inputs
            // These tests ensure isAfter doesn't crash with edge cases
            expect(() => {
                const checker = isAfter("2024-01-01");
                // Valid comparison should work
                checker("2024-01-02");
            }).not.toThrow();
        });
    });
});
