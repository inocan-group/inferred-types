import { describe, it, expect } from "vitest";
import { isIp4Address } from "inferred-types/runtime";

describe("IPv4 Address Validation", () => {
  describe("Valid Addresses", () => {
    const validCases = [
      "192.168.0.1",  // Private IP
      "10.0.0.1",     // Private IP
      "172.16.0.1",   // Private IP
      "8.8.8.8",      // Public DNS
      "1.1.1.1",      // Public DNS
      "127.0.0.1",    // Loopback
      "255.255.255.255", // Broadcast
      "0.0.0.0",      // Default route
    ];

    validCases.forEach((address) => {
      it(`should validate ${address}`, () => {
        expect(isIp4Address(address)).toBe(true);
      });
    });
  });

  describe("Invalid Addresses", () => {
    const invalidCases = [
      "256.256.256.256", // Values out of range
      "192.168.0.256",   // Fourth octet out of range
      "192.168.-1.1",    // Negative value
      "192.168.0.01",    // Leading zero
      "192.168.0.",      // Missing last octet
      "192.168..1",      // Empty octet
      "192.168.1.1.1",   // Extra octet
      "192.168.abc.1",   // Non-numeric value
      "192.168.0.1 ",    // Trailing space
      " 192.168.0.1",    // Leading space
      "",
      "  ",
    ];

    invalidCases.forEach((address) => {
      it(`should reject ${address}`, () => {
        expect(isIp4Address(address)).toBe(false);
      });
    });
  });

  describe("Special Cases", () => {
    const specialCases = [
      { address: "::ffff:192.168.0.1", expected: false },
      { address: " 192.168.0.1 ", expected: false },
      { address: "\t192.168.0.1", expected: false },
      { address: "192.168.0.1.", expected: false },
      { address: "192.168.0.1#", expected: false },
      { address: "192168001", expected: false },
      { address: "192.168.000.001", expected: false },
      { address: "255.255.255.256", expected: false },
      { address: "192.168..1", expected: false },
      { address: "192.168.0.\0", expected: false },
      { address: "1e3.1.1.1", expected: false },
      { address: "192.168.1.1....", expected: false },
      { address: "001.002.003.004", expected: false },
      { address: "192.168.0.１", expected: false },
      { address: "１９２.１６８.０.１", expected: false },
      { address: null, expected: false },
      { address: undefined, expected: false },
      { address: [], expected: false },
      { address: {}, expected: false },
    ];

    specialCases.forEach(({ address, expected }) => {
      it(`should ${expected ? "validate" : "reject"} "${address}"`, () => {
        expect(isIp4Address(address)).toBe(expected);
      });
    });
  });
});
