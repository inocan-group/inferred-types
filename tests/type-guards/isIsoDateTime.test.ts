import { isIsoDateTime } from "runtime/type-guards";
import { describe, expect, it } from "vitest";


describe("isIsoDateTime() type guard", () => {
    it("should validate basic ISO datetime formats", () => {
        // Basic formats
        expect(isIsoDateTime("2024-01-01T00:00")).toBe(true);
        expect(isIsoDateTime("2024-01-01T00:00:00")).toBe(true);
        expect(isIsoDateTime("2024-01-01T00:00:00Z")).toBe(true);
    });

    it("should validate timezone variations", () => {
        // UTC/Zulu time
        expect(isIsoDateTime("2024-01-01T00:00:00Z")).toBe(true);

        // Explicit timezone offsets
        expect(isIsoDateTime("2024-01-01T00:00:00+00:00")).toBe(true);
        expect(isIsoDateTime("2024-01-01T00:00:00-00:00")).toBe(true);
        expect(isIsoDateTime("2024-01-01T00:00:00+14:00")).toBe(true);
        expect(isIsoDateTime("2024-01-01T00:00:00-14:00")).toBe(true);
    });

    it("should validate millisecond precision", () => {
        expect(isIsoDateTime("2024-01-01T00:00:00.000Z")).toBe(true);
        expect(isIsoDateTime("2024-01-01T00:00:00.000+00:00")).toBe(true);
        expect(isIsoDateTime("2024-01-01T00:00:00.001Z")).toBe(true);
        expect(isIsoDateTime("2024-01-01T00:00:00.999Z")).toBe(true);
    });

    it("should validate date edge cases", () => {
        // Leap year
        expect(isIsoDateTime("2024-02-29T00:00:00Z")).toBe(true);
        expect(isIsoDateTime("2023-02-29T00:00:00Z")).toBe(false);

        // Month boundaries
        expect(isIsoDateTime("2024-01-31T00:00:00Z")).toBe(true);
        expect(isIsoDateTime("2024-04-31T00:00:00Z")).toBe(false);
        expect(isIsoDateTime("2024-04-30T00:00:00Z")).toBe(true);
    });

    it("should reject invalid formats", () => {
        // Invalid dates
        expect(isIsoDateTime("2024-13-01T00:00:00Z")).toBe(false);
        expect(isIsoDateTime("2024-00-01T00:00:00Z")).toBe(false);
        expect(isIsoDateTime("2024-01-00T00:00:00Z")).toBe(false);
        expect(isIsoDateTime("2024-01-32T00:00:00Z")).toBe(false);

        // Invalid times
        expect(isIsoDateTime("2024-01-01T24:00:00Z")).toBe(false);
        expect(isIsoDateTime("2024-01-01T00:60:00Z")).toBe(false);
        expect(isIsoDateTime("2024-01-01T00:00:60Z")).toBe(false);

        // Invalid formats
        expect(isIsoDateTime("2024-01-01")).toBe(false);
        expect(isIsoDateTime("2024-01-01Z")).toBe(false);
        expect(isIsoDateTime("2024-01-01T0000Z")).toBe(false);
        expect(isIsoDateTime("2024-01-01T00:00:00ZZ")).toBe(false);
        expect(isIsoDateTime("2024-01-01T00:00:00+0000")).toBe(false);
        expect(isIsoDateTime("2024-01-01T00:00:00+00:0")).toBe(false);
    });

    it("should reject non-string inputs", () => {
        expect(isIsoDateTime(null)).toBe(false);
        expect(isIsoDateTime(undefined)).toBe(false);
        expect(isIsoDateTime(123)).toBe(false);
        expect(isIsoDateTime({})).toBe(false);
        expect(isIsoDateTime([])).toBe(false);
        expect(isIsoDateTime(new Date())).toBe(false);
    });

    it("should handle millisecond edge cases", () => {
        expect(isIsoDateTime("2024-01-01T00:00:00.0Z")).toBe(true);
        expect(isIsoDateTime("2024-01-01T00:00:00.01Z")).toBe(true);
        expect(isIsoDateTime("2024-01-01T00:00:00.1234Z")).toBe(false);
        expect(isIsoDateTime("2024-01-01T00:00:00.Z")).toBe(false);
    });

    it("should validate timezone offset edge cases", () => {
        // Valid timezone offsets
        expect(isIsoDateTime("2024-01-01T00:00:00+14:00")).toBe(true);
        expect(isIsoDateTime("2024-01-01T00:00:00-14:00")).toBe(true);
        expect(isIsoDateTime("2024-01-01T00:00:00+00:30")).toBe(true);

        // Invalid timezone offsets
        expect(isIsoDateTime("2024-01-01T00:00:00+15:00")).toBe(false);
        expect(isIsoDateTime("2024-01-01T00:00:00+00:60")).toBe(false);
        expect(isIsoDateTime("2024-01-01T00:00:00+0000")).toBe(false);
        expect(isIsoDateTime("2024-01-01T00:00:00+00:")).toBe(false);
    });
});
