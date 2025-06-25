import { describe, it, expect } from "vitest";
import { parseInputToken } from "inferred-types/runtime";

describe("Runtime Parser - Container Types", () => {
  describe("Array types", () => {
    it("should parse Array<string> token", () => {
      const result = parseInputToken("Array<string>");
      expect(result.kind).toBe("container");
      expect((result as any).containerType).toBe("array");
      expect(result.extends(["hello", "world"])).toBe(true);
      expect(result.extends([1, 2, 3])).toBe(false);
      expect(result.extends("not an array")).toBe(false);
    });

    it("should parse Array<number> token", () => {
      const result = parseInputToken("Array<number>");
      expect(result.kind).toBe("container");
      expect(result.extends([1, 2, 3])).toBe(true);
      expect(result.extends(["1", "2", "3"])).toBe(false);
    });

    it("should parse nested Array<Array<string>> token", () => {
      const result = parseInputToken("Array<Array<string>>");
      expect(result.kind).toBe("container");
      expect(result.extends([["hello"], ["world"]])).toBe(true);
      expect(result.extends([["hello"], [1]])).toBe(false);
    });

    it("should handle empty arrays correctly", () => {
      const result = parseInputToken("Array<string>");
      expect(result.extends([])).toBe(true);
    });
  });

  describe("Set types", () => {
    it("should parse Set<string> token", () => {
      const result = parseInputToken("Set<string>");
      expect(result.kind).toBe("container");
      expect((result as any).containerType).toBe("set");
      expect(result.extends(new Set(["hello", "world"]))).toBe(true);
      expect(result.extends(new Set([1, 2, 3]))).toBe(false);
      expect(result.extends(["hello", "world"])).toBe(false);
    });

    it("should parse Set<number> token", () => {
      const result = parseInputToken("Set<number>");
      expect(result.kind).toBe("container");
      expect(result.extends(new Set([1, 2, 3]))).toBe(true);
      expect(result.extends(new Set(["1", "2", "3"]))).toBe(false);
    });

    it("should handle empty sets correctly", () => {
      const result = parseInputToken("Set<string>");
      expect(result.extends(new Set())).toBe(true);
    });
  });

  describe("Map types", () => {
    it("should parse Map<string, number> token", () => {
      const result = parseInputToken("Map<string, number>");
      expect(result.kind).toBe("container");
      expect((result as any).containerType).toBe("map");

      const validMap = new Map([["key1", 1], ["key2", 2]]);
      const invalidKeyMap = new Map([[1, 1], [2, 2]]);
      const invalidValueMap = new Map([["key1", "value1"], ["key2", "value2"]]);

      expect(result.extends(validMap)).toBe(true);
      expect(result.extends(invalidKeyMap)).toBe(false);
      expect(result.extends(invalidValueMap)).toBe(false);
    });

    it("should handle empty maps correctly", () => {
      const result = parseInputToken("Map<string, number>");
      expect(result.extends(new Map())).toBe(true);
    });
  });

  describe("WeakMap types", () => {
    it("should parse WeakMap<object, string> token", () => {
      const result = parseInputToken("WeakMap<object, string>");
      expect(result.kind).toBe("container");
      expect((result as any).containerType).toBe("weakmap");
      expect(result.extends(new WeakMap())).toBe(true);
    });
  });

  describe("Record types", () => {
    it("should parse Record<string, number> token", () => {
      const result = parseInputToken("Record<string, number>");
      expect(result.kind).toBe("container");
      expect((result as any).containerType).toBe("record");

      expect(result.extends({ key1: 1, key2: 2 })).toBe(true);
      expect(result.extends({ key1: "value1", key2: "value2" })).toBe(false);
      expect(result.extends([])).toBe(false);
    });

    it("should handle empty records correctly", () => {
      const result = parseInputToken("Record<string, number>");
      expect(result.extends({})).toBe(true);
    });
  });

  describe("type equality", () => {
    it("should correctly identify equal array types", () => {
      const type1 = parseInputToken("Array<string>");
      const type2 = parseInputToken("Array<string>");
      expect(type1.equals(type2)).toBe(true);
    });

    it("should correctly identify different array types", () => {
      const type1 = parseInputToken("Array<string>");
      const type2 = parseInputToken("Array<number>");
      expect(type1.equals(type2)).toBe(false);
    });

    it("should correctly identify different container types", () => {
      const arrayType = parseInputToken("Array<string>");
      const setType = parseInputToken("Set<string>");
      expect(arrayType.equals(setType)).toBe(false);
    });
  });

  describe("toString functionality", () => {
    it("should return correct token for array types", () => {
      const result = parseInputToken("Array<string>");
      expect(result.toString()).toBe("Array<string>");
    });

    it("should return correct token for map types", () => {
      const result = parseInputToken("Map<string, number>");
      expect(result.toString()).toBe("Map<string, number>");
    });
  });
});
