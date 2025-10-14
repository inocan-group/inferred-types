import { describe, expect, it } from "vitest";
import type {
  // Type utilities from types module
  Expect,
  Test,
  AsString,
  IsString,
  Container,
  Dictionary,
  // Constants from constants module
  Constant,
} from "inferred-types";
import {
  // Runtime functions from runtime module
  asString,
  isString,
  ensureLeading,
  ensureTrailing,
  // Constants
  LOWER_ALPHA_CHARS,
  UPPER_ALPHA_CHARS
} from "inferred-types";

describe("Main Export from 'inferred-types'", () => {

  it("Type utilities are importable from main entry point", () => {
    // Test that type utilities work correctly
    type Str = AsString<123>;
    type IsStr = IsString<"hello">;

    type cases = [
      Expect<Test<Str, "equals", "123">>,
      Expect<Test<IsStr, "equals", true>>
    ];

    expect(true).toBe(true);
  });

  it("Runtime functions are importable from main entry point", () => {
    // Test that runtime functions work correctly
    expect(asString(123)).toBe("123");
    expect(isString("hello")).toBe(true);
    expect(isString(123)).toBe(false);

    expect(ensureLeading("foo", "/")).toBe("/foo");
    expect(ensureLeading("/foo", "/")).toBe("/foo");

    expect(ensureTrailing("foo", "/")).toBe("foo/");
    expect(ensureTrailing("foo/", "/")).toBe("foo/");
  });

  it("Constants are importable from main entry point", () => {
    // Test that constants are available
    expect(LOWER_ALPHA_CHARS).toBeDefined();
    expect(LOWER_ALPHA_CHARS.length).toBe(26);
    expect(LOWER_ALPHA_CHARS[0]).toBe("a");

    expect(UPPER_ALPHA_CHARS).toBeDefined();
    expect(UPPER_ALPHA_CHARS.length).toBe(26);
    expect(UPPER_ALPHA_CHARS[0]).toBe("A");
  });

  it("All three modules (types, runtime, constants) are accessible", () => {
    // This test verifies that symbols from all three modules
    // are importable from the main 'inferred-types' entry point

    // Type from types module
    type TestDict = Dictionary<string>;
    type TestContainer = Container;

    // Runtime function from runtime module
    const result = asString(42);

    // Constant from constants module
    const alphaChars = LOWER_ALPHA_CHARS;

    type cases = [
      Expect<Test<TestDict, "extends", Record<string, string>>>,
      Expect<Test<TestContainer, "extends", readonly unknown[] | Record<PropertyKey, unknown>>>
    ];

    expect(result).toBe("42");
    expect(alphaChars).toHaveLength(26);
  });

});
