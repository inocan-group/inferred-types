import { describe, it, expect } from "vitest";
import { isIp6Subnet } from "inferred-types/runtime"; // Update with actual path

describe("IPv6 Subnet Validation", () => {
  describe("Valid Subnets", () => {
    const validCases = [
      // Common masks
      { input: "2001:db8::/32", mask: 32 },
      { input: "2001:db8:beef::/48", mask: 48 },
      { input: "2001:db8:beef:dead::/64", mask: 64 },

      // Edge masks
      { input: "::/0", mask: 0 },
      { input: "::1/128", mask: 128 },

      // Compressed formats
      { input: "2001:0db8::ff00:0042:8329/56", mask: 56 },
      { input: "a:b:c:d::/44", mask: 44 },

      // Minimal valid cases
      { input: "a::/16", mask: 16 },
      { input: "ff02::/64", mask: 64 },

      { input: "2001:db8:1:2:3:4:5:6/64", mask: 64 }
    ];

    validCases.forEach(({ input, mask }) => {
      it(`should validate ${input}`, () => {
        expect(isIp6Subnet(input)).toBe(true);
        expect(isIp6Subnet(input, mask)).toBe(true);
      });
    });
  });

  describe("Invalid Subnets", () => {
    const invalidCases = [
      // Missing compression
      "2001:db8:1:2/32",

      // Invalid masks
      "2001:db8::/129",
      "2001:db8::/-1",
      "2001:db8::/32a",

      // Multiple compressions
      "2001::db8::/32",
      "::bad::c0de::/56",

      // Invalid characters
      "g001:db8::/32",
      "2001:db8:::1/64",

      // Zone indexes
      "fe80::1%eth0/64",

      // IPv4 addresses
      "::ffff:192.168.0.1/96",

      // Invalid format
      "2001:db8::/64/32",
      "2001:db8::/",
      ""
    ];

    invalidCases.forEach((input) => {
      it(`should reject ${input}`, () => {
        expect(isIp6Subnet(input)).toBe(false);
      });
    });
  });

  describe("Mask-Specific Validation", () => {
    const testCases = [
      { input: "2001:db8::/32", mask: 32, shouldPass: true },
      { input: "2001:db8::/32", mask: 48, shouldPass: false },
      { input: "::/0", mask: 0, shouldPass: true },
      { input: "::1/128", mask: 127, shouldPass: false }
    ];

    testCases.forEach(({ input, mask, shouldPass }) => {
      it(`should ${shouldPass ? "pass" : "fail"} ${input} with mask ${mask}`, () => {
        expect(isIp6Subnet(input, mask)).toBe(shouldPass);
      });
    });
  });

  describe("Boundary Cases", () => {
    it('should validate ::/0', () => {
      expect(isIp6Subnet('::/0')).toBe(true);
    });

    it("should validate maximum mask", () => {
      expect(isIp6Subnet("::1/128", 128)).toBe(true);
    });

    it("should reject out-of-range masks", () => {
      expect(isIp6Subnet("::/-1")).toBe(false);
      expect(isIp6Subnet("::/129")).toBe(false);
    });
  });
});
