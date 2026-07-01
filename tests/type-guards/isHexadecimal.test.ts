import { describe, expect, it } from "vitest";
import type { Expect, Test } from "inferred-types/types";

import { isHexadecimal } from "inferred-types/runtime";

describe("isHexadecimal(val)", () => {

    it("happy path: strings composed only of hex characters are true", () => {
        expect(isHexadecimal("0")).toBe(true);
        expect(isHexadecimal("123456789")).toBe(true);
        expect(isHexadecimal("abcdef")).toBe(true);
        expect(isHexadecimal("ABCDEF")).toBe(true);
        // mixed case + digits
        expect(isHexadecimal("1a2B3c")).toBe(true);
        expect(isHexadecimal("deadBEEF")).toBe(true);
    });

    it("false cases: any non-hex character makes it false", () => {
        expect(isHexadecimal("g")).toBe(false);
        expect(isHexadecimal("xyz")).toBe(false);
        expect(isHexadecimal("1g")).toBe(false);
        // '#' prefix is not itself hexadecimal
        expect(isHexadecimal("#fff")).toBe(false);
        // whitespace
        expect(isHexadecimal("ab cd")).toBe(false);
    });

    it("non-string values return false without throwing", () => {
        expect(isHexadecimal(42)).toBe(false);
        expect(isHexadecimal(null)).toBe(false);
        expect(isHexadecimal(undefined)).toBe(false);
        expect(isHexadecimal({})).toBe(false);
    });

    // BUG (documented): an empty string has no hex digits and should not be
    // treated as a hexadecimal number. The implementation relies on `.every()`
    // which is vacuously `true` for an empty string, so it currently returns
    // `true` incorrectly.
    it("edge case: empty string should NOT be considered hexadecimal", () => {
        expect(isHexadecimal("")).toBe(false);
    });

    it("type guard preserves the string type", () => {
        const val = "1a2b" as string;

        if (isHexadecimal(val)) {
            type T = typeof val;

            type cases = [
                Expect<Test<T, "equals", string>>,
            ];
        }
    });

});
