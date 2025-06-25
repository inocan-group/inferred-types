import { describe, it, expect } from "vitest";
import { parseInputToken } from "inferred-types/runtime";

describe("Runtime Parser - Literal Types", () => {
  describe("String literals", () => {
    it("should parse String(value) token", () => {
      const result = parseInputToken("String(hello)");
      expect(result.kind).toBe("literal");
      expect(result.token).toBe("String(hello)");
      expect(result.extends("hello")).toBe(true);
      expect(result.extends("world")).toBe(false);
      expect(result.extends(42)).toBe(false);
    });

    it("should parse String with empty value", () => {
      const result = parseInputToken("String()");
      expect(result.kind).toBe("literal");
      expect(result.extends("")).toBe(true);
      expect(result.extends("test")).toBe(false);
    });

    it("should parse String with spaces in value", () => {
      const result = parseInputToken("String(hello world)");
      expect(result.kind).toBe("literal");
      expect(result.extends("hello world")).toBe(true);
      expect(result.extends("hello")).toBe(false);
    });
  });

  describe("Number literals", () => {
    it("should parse Number(value) token", () => {
      const result = parseInputToken("Number(42)");
      expect(result.kind).toBe("literal");
      expect(result.token).toBe("Number(42)");
      expect(result.extends(42)).toBe(true);
      expect(result.extends(43)).toBe(false);
      expect(result.extends("42")).toBe(false);
    });

    it("should parse Number with decimal value", () => {
      const result = parseInputToken("Number(3.14)");
      expect(result.kind).toBe("literal");
      expect(result.extends(3.14)).toBe(true);
      expect(result.extends(3)).toBe(false);
    });

    it("should parse Number with negative value", () => {
      const result = parseInputToken("Number(-5)");
      expect(result.kind).toBe("literal");
      expect(result.extends(-5)).toBe(true);
      expect(result.extends(5)).toBe(false);
    });

    it("should parse Number with zero", () => {
      const result = parseInputToken("Number(0)");
      expect(result.kind).toBe("literal");
      expect(result.extends(0)).toBe(true);
      expect(result.extends(1)).toBe(false);
    });
  });

  describe("Boolean literals", () => {
    it("should parse Boolean(true) token", () => {
      const result = parseInputToken("Boolean(true)");
      expect(result.kind).toBe("literal");
      expect(result.token).toBe("Boolean(true)");
      expect(result.extends(true)).toBe(true);
      expect(result.extends(false)).toBe(false);
      expect(result.extends("true")).toBe(false);
    });

    it("should parse Boolean(false) token", () => {
      const result = parseInputToken("Boolean(false)");
      expect(result.kind).toBe("literal");
      expect(result.extends(false)).toBe(true);
      expect(result.extends(true)).toBe(false);
      expect(result.extends("false")).toBe(false);
    });
  });

  describe("type properties", () => {
    it("should correctly identify narrow literals", () => {
      const stringLiteral = parseInputToken("String(test)") as any;
      expect(stringLiteral.isNarrow).toBe(true);
      expect(stringLiteral.value).toBe("test");
      expect(stringLiteral.literalType).toBe("string");
    });

    it("should correctly identify number literal properties", () => {
      const numberLiteral = parseInputToken("Number(42)") as any;
      expect(numberLiteral.isNarrow).toBe(true);
      expect(numberLiteral.value).toBe(42);
      expect(numberLiteral.literalType).toBe("number");
    });

    it("should correctly identify boolean literal properties", () => {
      const booleanLiteral = parseInputToken("Boolean(true)") as any;
      expect(booleanLiteral.isNarrow).toBe(true);
      expect(booleanLiteral.value).toBe(true);
      expect(booleanLiteral.literalType).toBe("boolean");
    });
  });

  describe("type equality", () => {
    it("should correctly identify equal string literals", () => {
      const type1 = parseInputToken("String(hello)");
      const type2 = parseInputToken("String(hello)");
      expect(type1.equals(type2)).toBe(true);
    });

    it("should correctly identify different string literals", () => {
      const type1 = parseInputToken("String(hello)");
      const type2 = parseInputToken("String(world)");
      expect(type1.equals(type2)).toBe(false);
    });

    it("should correctly identify equal number literals", () => {
      const type1 = parseInputToken("Number(42)");
      const type2 = parseInputToken("Number(42)");
      expect(type1.equals(type2)).toBe(true);
    });

    it("should correctly identify different number literals", () => {
      const type1 = parseInputToken("Number(42)");
      const type2 = parseInputToken("Number(43)");
      expect(type1.equals(type2)).toBe(false);
    });
  });

  describe("edge cases", () => {
    it("should handle whitespace around literal tokens", () => {
      const result = parseInputToken("  String(test)  ");
      expect(result.kind).toBe("literal");
      expect(result.extends("test")).toBe(true);
    });

    it("should reject invalid number literals", () => {
      expect(() => parseInputToken("Number(abc)")).toThrow();
    });

    it("should reject invalid boolean literals", () => {
      expect(() => parseInputToken("Boolean(maybe)")).toThrow();
    });
  });
});
