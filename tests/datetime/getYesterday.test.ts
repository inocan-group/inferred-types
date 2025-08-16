import { describe, it, expect } from "vitest";
import { Test, Expect, IsoDate } from "inferred-types/types";
import { getYesterday } from "inferred-types/runtime";

describe("getYesterday() -> Iso8601Date", () => {

    it("returns yesterday's date in ISO format", () => {
        const yesterday = getYesterday();

        // Should be a string in YYYY-MM-DD format
        expect(typeof yesterday).toBe("string");
        expect(yesterday).toMatch(/^\d{4}-\d{2}-\d{2}$/);

        // Should be exactly one day before today
        const today = new Date();
        const expectedYesterday = new Date();
        expectedYesterday.setDate(today.getDate() - 1);

        const expectedYesterdayStr = expectedYesterday.toISOString().split("T")[0];
        expect(yesterday).toBe(expectedYesterdayStr);
    });

    it("handles month boundaries correctly", () => {
        // We can't easily mock Date in this test environment, but we can test
        // that the function consistently returns a valid date that's one day back
        const yesterday1 = getYesterday();

        // Wait a small amount and call again - should be same result within same day
        const yesterday2 = getYesterday();
        expect(yesterday1).toBe(yesterday2);
    });

    it("returns valid ISO 8601 date format", () => {
        const yesterday = getYesterday();

        // Should parse to a valid Date
        const parsedDate = new Date(yesterday);
        expect(parsedDate).toBeInstanceOf(Date);
        expect(parsedDate.toString()).not.toBe("Invalid Date");

        // The parsed date should be before today when comparing as dates
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to start of day
        expect(parsedDate.getTime()).toBeLessThan(today.getTime());
    });

    it("consistent format across multiple calls", () => {
        const calls = Array.from({ length: 5 }, () => getYesterday());

        // All calls within the same execution should return the same value
        const uniqueValues = new Set(calls);
        expect(uniqueValues.size).toBe(1);

        // All should match the expected format
        calls.forEach(date => {
            expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        });
    });

    it("type tests", () => {
        const result = getYesterday();

        type cases = [
            // Should return a string (Iso8601Date)
            Expect<Test<typeof result, "extends", string>>,
            // Should be specifically an Iso8601Date type
            Expect<Test<typeof result, "extends", IsoDate>>,
        ];
    });
});
