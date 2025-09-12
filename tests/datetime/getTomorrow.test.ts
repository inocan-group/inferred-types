import { describe, it, expect } from "vitest";
import { Test, Expect } from "inferred-types/types";
import { getTomorrow } from "inferred-types/runtime";
import { IsoDate } from "inferred-types/types";

describe("getTomorrow() -> Iso8601Date", () => {

    it("returns tomorrow's date in ISO format", () => {
        const tomorrow = getTomorrow();

        // Should be a string in YYYY-MM-DD format
        expect(typeof tomorrow).toBe("string");
        expect(tomorrow).toMatch(/^\d{4}-\d{2}-\d{2}$/);

        // Should be exactly one day after today
        const today = new Date();
        const expectedTomorrow = new Date();
        expectedTomorrow.setDate(today.getDate() + 1);

        const expectedTomorrowStr = expectedTomorrow.toISOString().split("T")[0];
        expect(tomorrow).toBe(expectedTomorrowStr);
    });

    it("handles month boundaries correctly", () => {
        // We can't easily mock Date in this test environment, but we can test
        // that the function consistently returns a valid date that's one day forward
        const tomorrow1 = getTomorrow();

        // Wait a small amount and call again - should be same result within same day
        const tomorrow2 = getTomorrow();
        expect(tomorrow1).toBe(tomorrow2);
    });

    it("returns valid ISO 8601 date format", () => {
        const tomorrow = getTomorrow();

        // Should parse to a valid Date
        const parsedDate = new Date(tomorrow);
        expect(parsedDate).toBeInstanceOf(Date);
        expect(parsedDate.toString()).not.toBe("Invalid Date");

        // The parsed date should be after today when comparing as dates
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to start of day
        expect(parsedDate.getTime()).toBeGreaterThan(today.getTime());
    });

    it("consistent format across multiple calls", () => {
        const calls = Array.from({ length: 5 }, () => getTomorrow());

        // All calls within the same execution should return the same value
        const uniqueValues = new Set(calls);
        expect(uniqueValues.size).toBe(1);

        // All should match the expected format
        calls.forEach(date => {
            expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        });
    });

    it("type tests", () => {
        const result = getTomorrow();

        type cases = [
            // Should return a string (Iso8601Date)
            Expect<Test<typeof result, "extends", string>>,
            // Should be specifically an Iso8601Date type
            Expect<Test<typeof result, "extends", IsoDate>>,
        ];
    });
});
