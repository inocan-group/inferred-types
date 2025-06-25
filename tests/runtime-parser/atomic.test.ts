import { describe, it, expect } from "vitest";
import { parseInputToken } from "inferred-types/runtime";

describe("Runtime Parser - Atomic Types", () => {
  describe("null type", () => {
    it("should parse 'null' token", () => {
      const result = parseInputToken("null");
      expect(result.kind).toBe("atomic");
      expect(result.token).toBe("null");
      expect(result.extends(null)).toBe(true);
      expect(result.extends(undefined)).toBe(false);
      expect(result.extends("test")).toBe(false);
    });
  });

  describe("undefined type", () => {
    it("should parse 'undefined' token", () => {
      const result = parseInputToken("undefined");
      expect(result.kind).toBe("atomic");
      expect(result.token).toBe("undefined");
      expect(result.extends(undefined)).toBe(true);
      expect(result.extends(null)).toBe(false);
      expect(result.extends("test")).toBe(false);
    });
  });

  describe("boolean types", () => {
    it("should parse 'boolean' token", () => {
      const result = parseInputToken("boolean");
      expect(result.kind).toBe("atomic");
      expect(result.token).toBe("boolean");
      expect(result.extends(true)).toBe(true);
      expect(result.extends(false)).toBe(true);
      expect(result.extends("true")).toBe(false);
    });

    it("should parse 'true' token", () => {
      const result = parseInputToken("true");
      expect(result.kind).toBe("atomic");
      expect(result.token).toBe("true");
      expect(result.extends(true)).toBe(true);
      expect(result.extends(false)).toBe(false);
    });

    it("should parse 'false' token", () => {
      const result = parseInputToken("false");
      expect(result.kind).toBe("atomic");
      expect(result.token).toBe("false");
      expect(result.extends(false)).toBe(true);
      expect(result.extends(true)).toBe(false);
    });
  });

  describe("string type", () => {
    it("should parse 'string' token", () => {
      const result = parseInputToken("string");
      expect(result.kind).toBe("atomic");
      expect(result.token).toBe("string");
      expect(result.extends("hello")).toBe(true);
      expect(result.extends("")).toBe(true);
      expect(result.extends(42)).toBe(false);
    });
  });

  describe("number type", () => {
    it("should parse 'number' token", () => {
      const result = parseInputToken("number");
      expect(result.kind).toBe("atomic");
      expect(result.token).toBe("number");
      expect(result.extends(42)).toBe(true);
      expect(result.extends(0)).toBe(true);
      expect(result.extends(-1.5)).toBe(true);
      expect(result.extends("42")).toBe(false);
    });
  });

  describe("object type", () => {
    it("should parse 'object' token", () => {
      const result = parseInputToken("object");
      expect(result.kind).toBe("atomic");
      expect(result.token).toBe("object");
      expect(result.extends({})).toBe(true);
      expect(result.extends({ a: 1 })).toBe(true);
      expect(result.extends([])).toBe(false); // arrays are not objects in our type system
      expect(result.extends(null)).toBe(false); // null is not an object in our type system
    });
  });

  describe("symbol type", () => {
    it("should parse 'symbol' token", () => {
      const result = parseInputToken("symbol");
      expect(result.kind).toBe("atomic");
      expect(result.token).toBe("symbol");
      expect(result.extends(Symbol("test"))).toBe(true);
      expect(result.extends(Symbol.for("test"))).toBe(true);
      expect(result.extends("symbol")).toBe(false);
    });
  });

  describe("whitespace handling", () => {
    it("should handle tokens with whitespace", () => {
      const result = parseInputToken("  string  ");
      expect(result.kind).toBe("atomic");
      expect(result.token).toBe("string");
      expect(result.extends("test")).toBe(true);
    });
  });

  describe("type equality", () => {
    it("should correctly identify equal types", () => {
      const type1 = parseInputToken("string");
      const type2 = parseInputToken("string");
      expect(type1.equals(type2)).toBe(true);
    });

    it("should correctly identify different types", () => {
      const type1 = parseInputToken("string");
      const type2 = parseInputToken("number");
      expect(type1.equals(type2)).toBe(false);
    });
  });
});
