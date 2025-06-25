import { describe, it, expect } from "vitest";
import { parseInputToken } from "inferred-types/runtime";

describe("Runtime Parser - Core Functionality", () => {
  describe("error handling", () => {
    it("should throw error for empty token", () => {
      expect(() => parseInputToken("")).toThrow("Empty token provided");
    });

    it("should throw error for whitespace-only token", () => {
      expect(() => parseInputToken("   ")).toThrow("Empty token provided");
    });

    it("should throw error for unrecognized token", () => {
      expect(() => parseInputToken("invalidtoken")).toThrow("Unrecognized token");
    });

    it("should provide helpful error messages", () => {
      try {
        parseInputToken("xyz");
      } catch (error) {
        expect(error).toMatchObject({
          type: "parse-error",
          subType: "invalid-token",
          message: expect.stringContaining("Unrecognized token"),
          token: "xyz"
        });
      }
    });
  });

  describe("toString functionality", () => {
    it("should return original token for atomic types", () => {
      const result = parseInputToken("string");
      expect(result.toString()).toBe("string");
    });

    it("should return original token for literal types", () => {
      const result = parseInputToken("String(hello)");
      expect(result.toString()).toBe("String(hello)");
    });
  });

  describe("type guard functionality", () => {
    it("should work as type guard for atomic types", () => {
      const stringType = parseInputToken("string");
      const value: unknown = "hello";

      if (stringType.extends(value)) {
        // TypeScript should narrow value to string here
        expect(typeof value).toBe("string");
      }
    });

    it("should work as type guard for literal types", () => {
      const literalType = parseInputToken("String(hello)");
      const value: unknown = "hello";

      if (literalType.extends(value)) {
        // TypeScript should narrow value to "hello" here
        expect(value).toBe("hello");
      }
    });
  });

  describe("performance and caching", () => {
    it("should handle multiple parsing calls efficiently", () => {
      const start = performance.now();

      for (let i = 0; i < 100; i++) {
        parseInputToken("string");
        parseInputToken("number");
        parseInputToken("String(test)");
        parseInputToken("Number(42)");
      }

      const end = performance.now();
      const duration = end - start;

      // Should complete 400 parsing operations in under 100ms
      expect(duration).toBeLessThan(100);
    });
  });
});
