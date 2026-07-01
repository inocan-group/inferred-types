import { describe, expect, it } from "vitest";
import type { Expect, PhoneNumberWithCountryCode, Test, UsPhoneNumber } from "inferred-types/types";
import { hasCountryCode, isUsPhoneNumber } from "inferred-types/runtime";

describe("hasCountryCode(val)", () => {
    it("returns true when the string starts with a valid country code", () => {
        const us = "+1 555 555 5555";

        const result = hasCountryCode(us);
        expect(result).toBe(true);
        expect(hasCountryCode("+44 20 1234 5678")).toBe(true);
        // leading whitespace is tolerated
        expect(hasCountryCode("   +1 555 555 5555")).toBe(true);

        if (hasCountryCode(us)) {
            type T = typeof us;

            type cases = [
                Expect<Test<T, "extends", PhoneNumberWithCountryCode>>
            ];
        }
    });

    it("returns false when there is no leading country code", () => {
        expect(hasCountryCode("555 1234")).toBe(false);
        // a "+" without the space separator does not match
        expect(hasCountryCode("+15555555555")).toBe(false);
    });

    it("returns false for non-string values", () => {
        expect(hasCountryCode(42)).toBe(false);
        expect(hasCountryCode(null)).toBe(false);
        expect(hasCountryCode(undefined)).toBe(false);
    });
});

describe("isUsPhoneNumber(val)", () => {
    it("returns true for a phone number with a US country code", () => {
        const us = "+1 555 555 5555";

        const result = isUsPhoneNumber(us);
        expect(result).toBe(true);

        if (isUsPhoneNumber(us)) {
            type T = typeof us;

            type cases = [
                Expect<Test<T, "extends", UsPhoneNumber>>
            ];
        }
    });

    it("returns false for non-US country codes", () => {
        expect(isUsPhoneNumber("+44 20 1234 5678")).toBe(false);
    });

    it("returns false for numbers without the '+1 ' prefix", () => {
        expect(isUsPhoneNumber("555 555 5555")).toBe(false);
    });

    it("returns false for non-string values", () => {
        expect(isUsPhoneNumber(42)).toBe(false);
        expect(isUsPhoneNumber(null)).toBe(false);
        expect(isUsPhoneNumber(undefined)).toBe(false);
    });
});
