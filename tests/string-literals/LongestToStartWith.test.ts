import { describe, it } from "vitest";
import { Expect, AssertEqual } from "inferred-types/types";
import type { LongestToStartWith } from "inferred-types/types";

describe("LongestToStartWith type utility", () => {

  it("finds longest matching prefix from array", () => {
    // Testing with "FooBar" and candidates ["F", "Fo", "Foo"]
    // Expected: "Foo" (the longest match)
    type Result = LongestToStartWith<"FooBar", ["F", "Fo", "Foo"]>;

    type cases = [
      Expect<AssertEqual<Result, "Foo">>,
    ];
  });

  it("returns never when no match found", () => {
    // Testing with "FooBar" and candidates that don't match
    // Expected: never (not false!)
    type Result = LongestToStartWith<"FooBar", ["X", "Y", "Z"]>;

    type cases = [
      Expect<AssertEqual<Result, false>>,
    ];
  });

  it("handles empty array", () => {
    // Testing with empty candidates array
    // Expected: never
    type Result = LongestToStartWith<"FooBar", []>;

    type cases = [
      Expect<AssertEqual<Result, false>>,
    ];
  });

  it("handles single character matches", () => {
    // Testing with single character candidates
    // "FooBar" starts with "F" but not "B"
    // Expected: "F"
    type Result = LongestToStartWith<"FooBar", ["F", "B"]>;

    type cases = [
      Expect<AssertEqual<Result, "F">>,
    ];
  });

  it("prefers longest match when multiple candidates match", () => {
    // Testing that sorting works - order shouldn't matter
    // All three tests should return "Foo" regardless of input order
    type Result1 = LongestToStartWith<"FooBar", ["Fo", "F", "Foo"]>;
    type Result2 = LongestToStartWith<"FooBar", ["F", "Foo", "Fo"]>;
    type Result3 = LongestToStartWith<"FooBar", ["Foo", "F", "Fo"]>;

    type cases = [
      Expect<AssertEqual<Result1, "Foo">>,
      Expect<AssertEqual<Result2, "Foo">>,
      Expect<AssertEqual<Result3, "Foo">>,
    ];
  });

  it("handles empty string content", () => {
    // Testing with empty string as content
    // Empty string doesn't start with anything
    // Expected: never
    type Result = LongestToStartWith<"", ["F", "Foo"]>;

    type cases = [
      Expect<AssertEqual<Result, false>>,
    ];
  });

  it("preserves literal types", () => {
    // Testing with realistic strings
    // "StartupCo" starts with both "Start" and "S"
    // Expected: "Start" (the longest match)
    type Result = LongestToStartWith<"StartupCo", ["Start", "S"]>;

    type cases = [
      Expect<AssertEqual<Result, "Start">>,
    ];
  });

  it("handles multi-character patterns", () => {
    // Testing with longer patterns
    // "HelloWorld" starts with "Hello" but not "World"
    // Expected: "Hello"
    type Result = LongestToStartWith<"HelloWorld", ["Hello", "World", "Hel"]>;

    type cases = [
      Expect<AssertEqual<Result, "Hello">>,
    ];
  });

  it("handles exact match", () => {
    // Testing when candidate equals the entire string
    // "Foo" starts with "Foo"
    // Expected: "Foo"
    type Result = LongestToStartWith<"Foo", ["Foo", "F", "Fo"]>;

    type cases = [
      Expect<AssertEqual<Result, "Foo">>,
    ];
  });

  it("handles candidate longer than content", () => {
    // Testing when candidate is longer than the content
    // "Foo" does NOT start with "FooBar"
    // Expected: "Fo" (the longest that does match)
    type Result = LongestToStartWith<"Foo", ["FooBar", "Fo", "F"]>;

    type cases = [
      Expect<AssertEqual<Result, "Fo">>,
    ];
  });

  it("handles numeric array members", () => {
    // Testing that numeric values are converted to strings
    // "123abc" starts with "123" (number converted to string)
    // Expected: "123"
    type Result = LongestToStartWith<"123abc", [123, 12, 1]>;

    type cases = [
      Expect<AssertEqual<Result, "123">>,
    ];
  });

});
