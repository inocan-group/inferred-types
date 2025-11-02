import { describe, it } from "vitest";
import type { Expect, Test } from "inferred-types/types";
import type {
  GetExitToken,
  GetNextLevelConfig,
  IsExitToken,
  IsNestingMatchEnd,
  IsEntryToken,
} from "inferred-types/types";

// Test configurations
type SimpleConfig = { "(": ")"; "[": "]" };
type HierarchicalKeyValue = { "(": [")", {}]; "[": ["]", { "{": "}" }] };
type EmptyConfig = {};

// Hierarchical tuple configs
type SimpleTuple = [["(", "["], [")", "]"]];
type HierarchicalTuple = [["(", "["], [")", "]"], { "{": "}" }];

/**
 * GetNextLevelConfig Tests
 *
 * This helper type should:
 * - Return the same config for simple (non-hierarchical) configs
 * - Extract the next-level config from hierarchical key-value configs
 * - Extract the third element from hierarchical tuple configs
 * - Return the same config if the character is not in the config
 */
describe("GetNextLevelConfig<TChar, TNesting>", () => {
  it("simple config returns same config", () => {
    type cases = [
      // Simple key-value config - no hierarchical info, returns same
      Expect<Test<GetNextLevelConfig<"(", SimpleConfig>, "equals", SimpleConfig>>,
      Expect<Test<GetNextLevelConfig<"[", SimpleConfig>, "equals", SimpleConfig>>,

      // Character not in config - returns same config
      Expect<Test<GetNextLevelConfig<"{", SimpleConfig>, "equals", SimpleConfig>>,
    ];
  });

  it("hierarchical key-value extracts next-level config", () => {
    type cases = [
      // Hierarchical key-value - extract empty config for "("
      Expect<Test<GetNextLevelConfig<"(", HierarchicalKeyValue>, "equals", {}>>,

      // Hierarchical key-value - extract nested config for "["
      Expect<Test<GetNextLevelConfig<"[", HierarchicalKeyValue>, "equals", { "{": "}" }>>,
    ];
  });

  it("hierarchical tuple extracts third element", () => {
    type cases = [
      // Simple tuple (2 elements) - returns same config
      Expect<Test<GetNextLevelConfig<"(", SimpleTuple>, "equals", SimpleTuple>>,

      // Hierarchical tuple (3 elements) - extracts third element
      Expect<Test<GetNextLevelConfig<"(", HierarchicalTuple>, "equals", { "{": "}" }>>,
      Expect<Test<GetNextLevelConfig<"[", HierarchicalTuple>, "equals", { "{": "}" }>>,
    ];
  });

  it("handles typeof constant configs", () => {
    type BracketConfig = typeof import("inferred-types/constants").BRACKET_NESTING;

    type cases = [
      // Simple config from constant - returns same
      Expect<Test<GetNextLevelConfig<"(", BracketConfig>, "equals", BracketConfig>>,
    ];
  });
});

/**
 * GetExitToken Tests
 *
 * This helper type should:
 * - Extract exit token from simple string value
 * - Extract first element from hierarchical tuple [exit, nextLevel]
 * - Handle typeof constant configs correctly
 */
describe("GetExitToken<TChar, TNesting>", () => {
  it("simple config extracts exit token", () => {
    type cases = [
      // Simple key-value config
      Expect<Test<GetExitToken<"(", SimpleConfig>, "equals", ")">>,
      Expect<Test<GetExitToken<"[", SimpleConfig>, "equals", "]">>,
    ];
  });

  it("hierarchical key-value extracts first element of tuple", () => {
    type cases = [
      // Hierarchical key-value - extract exit token (first element)
      Expect<Test<GetExitToken<"(", HierarchicalKeyValue>, "equals", ")">>,
      Expect<Test<GetExitToken<"[", HierarchicalKeyValue>, "equals", "]">>,
    ];
  });

  it("handles typeof constant configs", () => {
    type BracketConfig = typeof import("inferred-types/constants").BRACKET_NESTING;

    type cases = [
      // Extract matching bracket
      Expect<Test<GetExitToken<"(", BracketConfig>, "equals", ")">>,
      Expect<Test<GetExitToken<"[", BracketConfig>, "equals", "]">>,
      Expect<Test<GetExitToken<"{", BracketConfig>, "equals", "}">>,
      Expect<Test<GetExitToken<"<", BracketConfig>, "equals", ">">>,
    ];
  });

  it("handles tuple configs", () => {
    type cases = [
      // Simple tuple - exit is union of end tokens
      Expect<Test<GetExitToken<"(", SimpleTuple>, "extends", ")" | "]">>,
      Expect<Test<GetExitToken<"[", SimpleTuple>, "extends", ")" | "]">>,
    ];
  });
});

/**
 * IsEntryToken Tests
 *
 * This helper type should:
 * - Return true for valid start characters
 * - Return false for non-start characters
 * - Work with both simple and hierarchical configs
 * - Handle empty configs correctly (all return false)
 */
describe("IsEntryToken<TChar, TNesting>", () => {
  it("validates start chars in simple config", () => {
    type cases = [
      // Valid start chars
      Expect<Test<IsEntryToken<"(", SimpleConfig>, "equals", true>>,
      Expect<Test<IsEntryToken<"[", SimpleConfig>, "equals", true>>,

      // Non-start chars
      Expect<Test<IsEntryToken<")", SimpleConfig>, "equals", false>>,
      Expect<Test<IsEntryToken<"{", SimpleConfig>, "equals", false>>,
    ];
  });

  it("validates start chars in hierarchical config", () => {
    type cases = [
      // Valid start chars in hierarchical config
      Expect<Test<IsEntryToken<"(", HierarchicalKeyValue>, "equals", true>>,
      Expect<Test<IsEntryToken<"[", HierarchicalKeyValue>, "equals", true>>,

      // Non-start chars
      Expect<Test<IsEntryToken<")", HierarchicalKeyValue>, "equals", false>>,
      Expect<Test<IsEntryToken<"{", HierarchicalKeyValue>, "equals", false>>,
    ];
  });

  it("handles empty config", () => {
    type cases = [
      // Empty config has no start tokens
      Expect<Test<IsEntryToken<'"', EmptyConfig>, "equals", false>>,
      Expect<Test<IsEntryToken<"(", EmptyConfig>, "equals", false>>,
    ];
  });

  it("handles tuple configs", () => {
    type cases = [
      // Tuple config - start chars are in first element
      Expect<Test<IsEntryToken<"(", SimpleTuple>, "equals", true>>,
      Expect<Test<IsEntryToken<"[", SimpleTuple>, "equals", true>>,
      Expect<Test<IsEntryToken<"{", SimpleTuple>, "equals", false>>,
    ];
  });
});

/**
 * IsExitToken Tests
 *
 * This helper type should:
 * - Return true for valid end characters
 * - Return false for non-end characters
 * - Work with both simple and hierarchical configs
 * - Handle empty configs correctly (all return false)
 */
describe("IsExitToken<TChar, TNesting>", () => {
  it("validates end chars in simple config", () => {
    type cases = [
      // Valid end chars
      Expect<Test<IsExitToken<")", SimpleConfig>, "equals", true>>,
      Expect<Test<IsExitToken<"]", SimpleConfig>, "equals", true>>,

      // Non-end chars
      Expect<Test<IsExitToken<"(", SimpleConfig>, "equals", false>>,
      Expect<Test<IsExitToken<"{", SimpleConfig>, "equals", false>>,
    ];
  });

  it("validates end chars in hierarchical config", () => {
    type cases = [
      // Valid end chars in hierarchical config (first element of tuple)
      Expect<Test<IsExitToken<")", HierarchicalKeyValue>, "equals", true>>,
      Expect<Test<IsExitToken<"]", HierarchicalKeyValue>, "equals", true>>,

      // Non-end chars
      Expect<Test<IsExitToken<"(", HierarchicalKeyValue>, "equals", false>>,
      Expect<Test<IsExitToken<"{", HierarchicalKeyValue>, "equals", false>>,
    ];
  });

  it("handles empty config", () => {
    type cases = [
      // Empty config has no end tokens
      Expect<Test<IsExitToken<'"', EmptyConfig>, "equals", false>>,
      Expect<Test<IsExitToken<")", EmptyConfig>, "equals", false>>,
    ];
  });

  it("handles tuple configs", () => {
    type cases = [
      // Tuple config - end chars are in second element
      Expect<Test<IsExitToken<")", SimpleTuple>, "equals", true>>,
      Expect<Test<IsExitToken<"]", SimpleTuple>, "equals", true>>,
      Expect<Test<IsExitToken<"(", SimpleTuple>, "equals", false>>,
    ];
  });
});

/**
 * IsNestingMatchEnd Tests
 *
 * This helper type should:
 * - Return true when char matches the stack top's exit token
 * - Return false when char doesn't match
 * - Return false for empty stack
 * - Work with both simple and hierarchical configs
 */
describe("IsNestingMatchEnd<TChar, TStack, TNesting>", () => {
  it("validates matching exit tokens in simple config", () => {
    type cases = [
      // Char matches stack top exit
      Expect<Test<IsNestingMatchEnd<")", ["("], SimpleConfig>, "equals", true>>,
      Expect<Test<IsNestingMatchEnd<"]", ["["], SimpleConfig>, "equals", true>>,

      // Char doesn't match stack top exit
      Expect<Test<IsNestingMatchEnd<"]", ["("], SimpleConfig>, "equals", false>>,
      Expect<Test<IsNestingMatchEnd<")", ["["], SimpleConfig>, "equals", false>>,
    ];
  });

  it("validates matching exit tokens in hierarchical config", () => {
    type cases = [
      // Hierarchical config with matching exit
      Expect<Test<IsNestingMatchEnd<")", ["("], HierarchicalKeyValue>, "equals", true>>,
      Expect<Test<IsNestingMatchEnd<"]", ["["], HierarchicalKeyValue>, "equals", true>>,

      // Non-matching
      Expect<Test<IsNestingMatchEnd<"]", ["("], HierarchicalKeyValue>, "equals", false>>,
    ];
  });

  it("handles empty stack", () => {
    type cases = [
      // Empty stack - no match possible
      Expect<Test<IsNestingMatchEnd<")", [], SimpleConfig>, "equals", false>>,
      Expect<Test<IsNestingMatchEnd<"]", [], SimpleConfig>, "equals", false>>,
    ];
  });

  it("handles nested stacks", () => {
    type cases = [
      // Matches top of nested stack
      Expect<Test<IsNestingMatchEnd<"]", ["(", "["], SimpleConfig>, "equals", true>>,
      Expect<Test<IsNestingMatchEnd<")", ["(", "["], SimpleConfig>, "equals", false>>,
    ];
  });
});
