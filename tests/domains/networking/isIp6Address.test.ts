import { describe, it, expect } from "vitest";
import { isIp6Address } from "inferred-types/runtime"; // Update with actual path

describe("IPv6 Address Validation", () => {
  describe("Valid Addresses", () => {
    const validCases = [
      // Full with leading zeros
      "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
      "fe80:0000:0000:0000:0202:b3ff:fe1e:8329",
      // Valid compressed formats
      "::0200",
      "2001:0db8:1234::ff00:0042:8329",
      "0000:0000:0000:0000:0000:0000:0000:0000",
      // Valid edge compression
      "::1:2:3:4:5:6:7",
      "1:2:3:4:5:6::7"
    ];

    validCases.forEach((address) => {
      it(`should validate ${address}`, () => {
        expect(isIp6Address(address)).toBe(true);
      });
    });
  });

  describe("Invalid Addresses", () => {
    const invalidCases = [
      // Triple colon
      "2001:db8:::1",
      // Leading/trailing colons
      ":2001:db8::1",
      "2001:db8::1:",
      // Invalid characters
      "g001:db8::1",
      "2001:db8::z",
      // Too many groups
      "1:2:3:4:5:6:7:8:9",
      // Invalid group format
      "2001:0db8:85a3:00000:0000:8a2e:0370:7334",
      // Embedded IPv4
      "::ffff:192.0.2.128",
      // Subnet masks
      "2001:db8::/64",
      // Zone indexes
      "fe80::1%eth0",
      // Empty strings
      "",
      "  ",
    ];

    invalidCases.forEach((address) => {
      it(`should reject ${address}`, () => {
        expect(isIp6Address(address)).toBe(false);
      });
    });
  });

  describe("Special Cases", () => {
    it("should reject IPv4-mapped addresses", () => {
      expect(isIp6Address("::ffff:192.168.1.1")).toBe(false);
    });

    it("should reject addresses with leading/trailing colons", () => {
      expect(isIp6Address(":2001:db8::1")).toBe(false);
      expect(isIp6Address("2001:db8::1:")).toBe(false);
    });

    it("should reject truly over-compressed formats", () => {
      // Invalid: Multiple compressions
      expect(isIp6Address("2001::db8::1")).toBe(false);

      // Valid: These are technically correct compressions
      expect(isIp6Address("::1:2:3:4:5:6:7")).toBe(true);
      expect(isIp6Address("1:2:3:4:5:6::7")).toBe(true);
    });
  });
});
