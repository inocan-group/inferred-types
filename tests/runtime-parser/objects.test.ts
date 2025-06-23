import { describe, it, expect } from "vitest";
import { parseInputToken } from "../../modules/runtime/src/runtime-types/parser";

describe("Runtime Parser - Object Types", () => {
  describe("basic objects", () => {
    it("should parse { name: string, age: number } token", () => {
      const result = parseInputToken("{ name: string, age: number }");
      expect(result.kind).toBe("object");
      expect(result.extends({ name: "John", age: 30 })).toBe(true);
      expect(result.extends({ name: "John", age: "30" })).toBe(false);
      expect(result.extends({ name: "John" })).toBe(false); // missing required key
      expect(result.extends({ name: "John", age: 30, extra: "not allowed" })).toBe(false); // extra key
    });

    it("should parse empty object {} token", () => {
      const result = parseInputToken("{}");
      expect(result.kind).toBe("object");
      expect(result.extends({})).toBe(true);
      expect(result.extends({ extra: "not allowed" })).toBe(false);
    });
  });

  describe("optional properties", () => {
    it("should parse { name: string, age?: number } token", () => {
      const result = parseInputToken("{ name: string, age?: number }");
      expect(result.kind).toBe("object");
      expect(result.extends({ name: "John" })).toBe(true); // age is optional
      expect(result.extends({ name: "John", age: 30 })).toBe(true);
      expect(result.extends({ name: "John", age: "30" })).toBe(false); // wrong type for age
      expect(result.extends({ age: 30 })).toBe(false); // missing required name
    });

    it("should parse { id?: number, name?: string } token", () => {
      const result = parseInputToken("{ id?: number, name?: string }");
      expect(result.kind).toBe("object");
      expect(result.extends({})).toBe(true); // all properties optional
      expect(result.extends({ id: 1 })).toBe(true);
      expect(result.extends({ name: "test" })).toBe(true);
      expect(result.extends({ id: 1, name: "test" })).toBe(true);
    });
  });

  describe("nested objects", () => {
    it("should parse { user: { name: string, age: number }, active: boolean } token", () => {
      const result = parseInputToken("{ user: { name: string, age: number }, active: boolean }");
      expect(result.kind).toBe("object");
      
      const validObj = {
        user: { name: "John", age: 30 },
        active: true
      };
      
      const invalidNestedObj = {
        user: { name: "John", age: "30" }, // wrong nested type
        active: true
      };
      
      expect(result.extends(validObj)).toBe(true);
      expect(result.extends(invalidNestedObj)).toBe(false);
    });
  });

  describe("objects with container properties", () => {
    it("should parse { items: Array<string>, count: number } token", () => {
      const result = parseInputToken("{ items: Array<string>, count: number }");
      expect(result.kind).toBe("object");
      
      expect(result.extends({
        items: ["a", "b", "c"],
        count: 3
      })).toBe(true);
      
      expect(result.extends({
        items: [1, 2, 3], // wrong array type
        count: 3
      })).toBe(false);
    });

    it("should parse { tags: Set<string>, metadata: Map<string, string> } token", () => {
      const result = parseInputToken("{ tags: Set<string>, metadata: Map<string, string> }");
      expect(result.kind).toBe("object");
      
      expect(result.extends({
        tags: new Set(["tag1", "tag2"]),
        metadata: new Map([["key1", "value1"], ["key2", "value2"]])
      })).toBe(true);
      
      expect(result.extends({
        tags: new Set([1, 2]), // wrong set type
        metadata: new Map([["key1", "value1"]])
      })).toBe(false);
    });
  });

  describe("objects with literal properties", () => {
    it("should parse { id: Number(42), name: String(John) } token", () => {
      const result = parseInputToken("{ id: Number(42), name: String(John) }");
      expect(result.kind).toBe("object");
      
      expect(result.extends({ id: 42, name: "John" })).toBe(true);
      expect(result.extends({ id: 43, name: "John" })).toBe(false); // wrong literal value
      expect(result.extends({ id: 42, name: "Jane" })).toBe(false); // wrong literal value
    });
  });

  describe("type equality", () => {
    it("should correctly identify equal object types", () => {
      const type1 = parseInputToken("{ name: string, age: number }");
      const type2 = parseInputToken("{ name: string, age: number }");
      expect(type1.equals(type2)).toBe(true);
    });

    it("should correctly identify different object types by property types", () => {
      const type1 = parseInputToken("{ name: string, age: number }");
      const type2 = parseInputToken("{ name: string, age: string }");
      expect(type1.equals(type2)).toBe(false);
    });

    it("should correctly identify different object types by property names", () => {
      const type1 = parseInputToken("{ name: string, age: number }");
      const type2 = parseInputToken("{ name: string, height: number }");
      expect(type1.equals(type2)).toBe(false);
    });

    it("should correctly identify different object types by optionality", () => {
      const type1 = parseInputToken("{ name: string, age: number }");
      const type2 = parseInputToken("{ name: string, age?: number }");
      expect(type1.equals(type2)).toBe(false);
    });
  });

  describe("toString functionality", () => {
    it("should return correct token for simple objects", () => {
      const result = parseInputToken("{ name: string, age: number }");
      expect(result.toString()).toBe("{ name: string, age: number }");
    });

    it("should return correct token for objects with optional properties", () => {
      const result = parseInputToken("{ name: string, age?: number }");
      expect(result.toString()).toBe("{ name: string, age?: number }");
    });

    it("should return correct token for empty objects", () => {
      const result = parseInputToken("{}");
      expect(result.toString()).toBe("{}");
    });
  });

  describe("edge cases", () => {
    it("should handle whitespace in object definitions", () => {
      const result = parseInputToken("{ name : string , age : number }");
      expect(result.kind).toBe("object");
      expect(result.extends({ name: "John", age: 30 })).toBe(true);
    });

    it("should handle complex property names", () => {
      const result = parseInputToken("{ firstName: string, lastName: string }");
      expect(result.kind).toBe("object");
      expect(result.extends({ firstName: "John", lastName: "Doe" })).toBe(true);
    });
  });
});