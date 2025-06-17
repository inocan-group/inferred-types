import { describe, it, expect } from "vitest";
import { Test, Expect } from "inferred-types/types";
import { asIsoDateTime } from "../../modules/runtime/src/datetime/asIsoDateTime";
import { DateLike } from "../../modules/inferred-types/dist";

// Always use UTC dates in tests to avoid local timezone issues

describe("asIsoDateTime(dt) -> string", () => {

    it("converts Date object to ISO string", () => {
        // Use Date.UTC to ensure UTC time
        const date = new Date(Date.UTC(2024, 5, 15, 14, 30, 45, 123)); // June 15, 2024 14:30:45.123 UTC
        const result = asIsoDateTime(date);

        expect(typeof result).toBe("string");
        expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
        expect(result.endsWith("Z")).toBe(true);
    });

    it("converts ISO date string to full ISO datetime", () => {
        const isoDate = "2024-06-15";
        const result = asIsoDateTime(isoDate);

        expect(typeof result).toBe("string");
        expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
        expect(result.startsWith("2024-06-15T")).toBe(true);
        expect(result.endsWith("Z")).toBe(true);
    });

    it("converts ISO datetime string to normalized ISO string", () => {
        const isoDateTime = "2024-06-15T14:30:00Z"; // Explicitly UTC
        const result = asIsoDateTime(isoDateTime);

        expect(typeof result).toBe("string");
        expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
        expect(result.endsWith("Z")).toBe(true);
    });

    it("handles timezone conversion properly", () => {
        // Create a specific UTC date
        const utcDate = new Date("2024-06-15T14:30:00.000Z");
        const result = asIsoDateTime(utcDate);

        expect(result).toBe("2024-06-15T14:30:00.000Z");
    });

    it("time info is preserved", () => {
        const dateWithMs = new Date("2024-06-15T14:30:45.123Z");
        const result = asIsoDateTime(dateWithMs);

        expect(result).toBe("2024-06-15T14:30:45.123Z");
    });

    it("date-only inputs get midnight time", () => {
        const dateOnlyInput = "2024-06-15"; // ISO date without time
        const result = asIsoDateTime(dateOnlyInput);

        expect(result).toBe("2024-06-15T00:00:00.000Z");
    });

    it("handles different date formats", () => {
        const testCases = [
            new Date(Date.UTC(2024, 0, 1)), // January 1, 2024 UTC
            "2024-12-31",
            "2024-02-29", // Leap year
        ] as DateLike[];

        testCases.forEach(testCase => {
            const result = asIsoDateTime(testCase);
            expect(typeof result).toBe("string");
            expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
        });
    });

    it("type tests", () => {
        const date = new Date();
        const result = asIsoDateTime(date);

        type cases = [
            // Should return a string
            Expect<Test<typeof result, "extends", string>>,
            // Should be specifically a string (not a more complex type)
            Expect<Test<typeof result, "equals", string>>,
        ];
    });
});
