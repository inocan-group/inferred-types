import { describe, it } from "vitest";
import { Expect, Test } from "inferred-types/types";
import { StripFirst } from "inferred-types/types";

describe("StripFirst<T, U>", () => {
    it("should strip the first matching element from head of string", () => {
        type cases = [
            // Basic functionality - strip first match from head
            Expect<Test<StripFirst<"foobar", ["foo", "bar", "baz"]>, "equals", "bar">>,
            Expect<Test<StripFirst<"barfoo", ["foo", "bar", "baz"]>, "equals", "foo">>,
            Expect<Test<StripFirst<"baztest", ["foo", "bar", "baz"]>, "equals", "test">>,

            // Should only strip from head, not middle or end
            Expect<Test<StripFirst<"testfoo", ["foo", "bar", "baz"]>, "equals", "testfoo">>,
            Expect<Test<StripFirst<"midfoobar", ["foo", "bar", "baz"]>, "equals", "midfoobar">>,

            // Order matters - strips first match in array order
            Expect<Test<StripFirst<"foobar", ["bar", "foo"]>, "equals", "bar">>, // bar doesn't match at head
            Expect<Test<StripFirst<"foobar", ["foo", "foobar"]>, "equals", "bar">>, // foo matches first

            // Complete string match
            Expect<Test<StripFirst<"foo", ["foo", "bar"]>, "equals", "">>,
            Expect<Test<StripFirst<"bar", ["foo", "bar"]>, "equals", "">>,
        ];
    });

    it("should handle empty array", () => {
        type cases = [
            // Empty array should return original string
            Expect<Test<StripFirst<"foobar", []>, "equals", "foobar">>,
            Expect<Test<StripFirst<"", []>, "equals", "">>,
            Expect<Test<StripFirst<"test", []>, "equals", "test">>,
        ];
    });

    it("should handle no matches", () => {
        type cases = [
            // No matches should return original string
            Expect<Test<StripFirst<"hello", ["foo", "bar", "baz"]>, "equals", "hello">>,
            Expect<Test<StripFirst<"world", ["test", "demo"]>, "equals", "world">>,
            Expect<Test<StripFirst<"foobar", ["xyz", "abc"]>, "equals", "foobar">>,
        ];
    });

    it("should handle empty string input", () => {
        type cases = [
            // Empty string with non-empty array
            Expect<Test<StripFirst<"", ["foo", "bar"]>, "equals", "">>,
            Expect<Test<StripFirst<"", [""]>, "equals", "">>,
            Expect<Test<StripFirst<"", ["test"]>, "equals", "">>,
        ];
    });

    it("should handle empty string in strip array", () => {
        type TT = StripFirst<"bar-test", ["foo", "", "bar"]>;

        type cases = [
            // Empty string as first element should match any string
            Expect<Test<StripFirst<"foobar", ["", "foo"]>, "equals", "bar">>,
            Expect<Test<StripFirst<"test", [""]>, "equals", "test">>,

            // Empty string in middle/end
            Expect<Test<StripFirst<"foobar", ["baz", "", "foo"]>, "equals", "bar">>,
            Expect<Test<TT, "equals", "-test">>,
        ];
    });

    it("should handle single character strings", () => {
        type cases = [
            // Single character stripping
            Expect<Test<StripFirst<"a", ["a", "b"]>, "equals", "">>,
            Expect<Test<StripFirst<"b", ["a", "b"]>, "equals", "">>,
            Expect<Test<StripFirst<"c", ["a", "b"]>, "equals", "c">>,

            // Single char from longer string
            Expect<Test<StripFirst<"abc", ["a"]>, "equals", "bc">>,
            Expect<Test<StripFirst<"abc", ["b"]>, "equals", "abc">>, // doesn't match at head
        ];
    });

    it("should handle overlapping prefixes", () => {
        type cases = [
            // Overlapping prefixes - should use first match
            Expect<Test<StripFirst<"foobar", ["foo", "foobar"]>, "equals", "bar">>,
            Expect<Test<StripFirst<"foobar", ["foobar", "foo"]>, "equals", "">>,

            // Partial vs complete matches
            Expect<Test<StripFirst<"testing", ["test", "testing"]>, "equals", "ing">>,
            Expect<Test<StripFirst<"testing", ["testing", "test"]>, "equals", "">>,

            // Longer prefix first
            Expect<Test<StripFirst<"abcdef", ["abcd", "abc", "ab"]>, "equals", "ef">>,
            Expect<Test<StripFirst<"abcdef", ["abc", "abcd", "ab"]>, "equals", "def">>,
        ];
    });

    it("should handle special characters", () => {
        type cases = [
            // Special characters in strings
            Expect<Test<StripFirst<"$test", ["$", "test"]>, "equals", "test">>,
            Expect<Test<StripFirst<"@hello", ["@hello", "@"]>, "equals", "">>,

            // Punctuation
            Expect<Test<StripFirst<"!important", ["!", "imp"]>, "equals", "important">>,
            Expect<Test<StripFirst<"...loading", ["...", "."]>, "equals", "loading">>,

            // Spaces
            Expect<Test<StripFirst<" test", [" ", "test"]>, "equals", "test">>,
            Expect<Test<StripFirst<"  test", [" ", "  "]>, "equals", " test">>, // matches first space
        ];
    });

    it("should handle complex real-world scenarios", () => {
        type cases = [
            // Common prefixes
            Expect<Test<StripFirst<"https://example.com", ["https://", "http://", "ftp://"]>, "equals", "example.com">>,
            Expect<Test<StripFirst<"http://test.com", ["https://", "http://", "ftp://"]>, "equals", "test.com">>,
            Expect<Test<StripFirst<"ftp://files.com", ["https://", "http://", "ftp://"]>, "equals", "files.com">>,

            // File extensions
            Expect<Test<StripFirst<"document.pdf", [".pdf", ".doc", ".txt"]>, "equals", "document.pdf">>, // doesn't match at head
            Expect<Test<StripFirst<".hidden", [".", ".hidden"]>, "equals", "hidden">>,

            // Path separators
            Expect<Test<StripFirst<"/root/path", ["/", "\\", "./"]>, "equals", "root/path">>,
            Expect<Test<StripFirst<"./relative", ["/", "\\", "./"]>, "equals", "relative">>,
        ];
    });

    it("should handle readonly array constraint", () => {
        type cases = [
            // Test that readonly arrays work correctly
            Expect<Test<StripFirst<"foobar", readonly ["foo", "bar"]>, "equals", "bar">>,
            Expect<Test<StripFirst<"barfoo", readonly ["foo", "bar"]>, "equals", "foo">>,

            // Const assertion arrays
            Expect<Test<StripFirst<"testcase", readonly ["test", "case"]>, "equals", "case">>,
        ];
    });

    it("should handle edge cases with repeated patterns", () => {
        type cases = [
            // Same string multiple times in array
            Expect<Test<StripFirst<"foobar", ["foo", "foo", "bar"]>, "equals", "bar">>,
            Expect<Test<StripFirst<"bartest", ["bar", "bar", "foo"]>, "equals", "test">>,

            // Repeated characters
            Expect<Test<StripFirst<"aaabbb", ["aa", "aaa", "a"]>, "equals", "abbb">>, // matches first "aa"
            Expect<Test<StripFirst<"aaabbb", ["aaa", "aa", "a"]>, "equals", "bbb">>, // matches "aaa"
        ];
    });
});
