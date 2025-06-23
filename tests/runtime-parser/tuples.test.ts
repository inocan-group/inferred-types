import { describe, it, expect } from "vitest";
import { parseInputToken } from "../../modules/runtime/src/runtime-types/parser";

describe("Runtime Parser - Tuple Types", () => {
  describe("basic tuples", () => {
    it("should parse [string, number] token", () => {
      const result = parseInputToken("[string, number]");
      expect(result.kind).toBe("container");
      expect((result as any).containerType).toBe("tuple");
      expect(result.extends(["hello", 42])).toBe(true);
      expect(result.extends(["hello", "world"])).toBe(false);
      expect(result.extends([42, "hello"])).toBe(false);
      expect(result.extends(["hello"])).toBe(false); // wrong length
    });

    it("should parse [string, number, boolean] token", () => {
      const result = parseInputToken("[string, number, boolean]");
      expect(result.kind).toBe("container");
      expect(result.extends(["hello", 42, true])).toBe(true);
      expect(result.extends(["hello", 42, false])).toBe(true);
      expect(result.extends(["hello", 42, "not boolean"])).toBe(false);
      expect(result.extends(["hello", 42])).toBe(false); // wrong length
    });

    it("should parse empty tuple []", () => {
      const result = parseInputToken("[]");
      expect(result.kind).toBe("container");
      expect((result as any).containerType).toBe("tuple");
      expect(result.extends([])).toBe(true);
      expect(result.extends([1])).toBe(false);
    });
  });

  describe("literal tuples", () => {
    it("should parse [String(hello), Number(42)] token", () => {
      const result = parseInputToken("[String(hello), Number(42)]");
      expect(result.kind).toBe("container");
      expect(result.extends(["hello", 42])).toBe(true);
      expect(result.extends(["world", 42])).toBe(false);
      expect(result.extends(["hello", 43])).toBe(false);
    });
  });

  describe("nested tuples", () => {
    it("should parse nested tuple [[string, number], boolean] token", () => {
      const result = parseInputToken("[[string, number], boolean]");
      expect(result.kind).toBe("container");
      expect(result.extends([["hello", 42], true])).toBe(true);
      expect(result.extends([["hello", "world"], true])).toBe(false);
      expect(result.extends(["hello", 42, true])).toBe(false); // flat vs nested
    });
  });

  describe("mixed container tuples", () => {
    it("should parse [Array<string>, Set<number>] token", () => {
      const result = parseInputToken("[Array<string>, Set<number>]");
      expect(result.kind).toBe("container");
      expect(result.extends([["hello", "world"], new Set([1, 2, 3])])).toBe(true);
      expect(result.extends([[1, 2, 3], new Set([1, 2, 3])])).toBe(false);
      expect(result.extends([["hello", "world"], new Set(["1", "2", "3"])])).toBe(false);
    });
  });

  describe("type equality", () => {
    it("should correctly identify equal tuple types", () => {
      const type1 = parseInputToken("[string, number]");
      const type2 = parseInputToken("[string, number]");
      expect(type1.equals(type2)).toBe(true);
    });

    it("should correctly identify different tuple types by element types", () => {
      const type1 = parseInputToken("[string, number]");
      const type2 = parseInputToken("[string, boolean]");
      expect(type1.equals(type2)).toBe(false);
    });

    it("should correctly identify different tuple types by length", () => {
      const type1 = parseInputToken("[string, number]");
      const type2 = parseInputToken("[string, number, boolean]");
      expect(type1.equals(type2)).toBe(false);
    });

    it("should correctly identify different tuple types by order", () => {
      const type1 = parseInputToken("[string, number]");
      const type2 = parseInputToken("[number, string]");
      expect(type1.equals(type2)).toBe(false);
    });
  });

  describe("toString functionality", () => {
    it("should return correct token for simple tuples", () => {
      const result = parseInputToken("[string, number]");
      expect(result.toString()).toBe("[string, number]");
    });

    it("should return correct token for empty tuples", () => {
      const result = parseInputToken("[]");
      expect(result.toString()).toBe("[]");
    });

    it("should return correct token for nested tuples", () => {
      const result = parseInputToken("[[string, number], boolean]");
      expect(result.toString()).toBe("[[string, number], boolean]");
    });
  });

  describe("edge cases", () => {
    it("should handle whitespace in tuple definitions", () => {
      const result = parseInputToken("[ string , number ]");
      expect(result.kind).toBe("container");
      expect(result.extends(["hello", 42])).toBe(true);
    });

    it("should differentiate tuples from arrays", () => {
      const tupleType = parseInputToken("[string, number]");
      const arrayType = parseInputToken("Array<string>");
      expect(tupleType.equals(arrayType)).toBe(false);
    });
  });
});