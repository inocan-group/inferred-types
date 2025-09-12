import { describe, it } from "vitest";
import type { Expect, Test, TrimCharEnd } from "inferred-types/types";

describe("TrimCharEnd<T,U>", () => {

    it("happy path - single character removal", () => {
        type RemoveTrailingSlash = TrimCharEnd<"hello/", "/">;
        type RemoveTrailingDot = TrimCharEnd<"file.txt.", ".">;
        type RemoveTrailingSpace = TrimCharEnd<"hello ", " ">;
        type RemoveTrailingA = TrimCharEnd<"banana", "a">;
        
        type cases = [
            Expect<Test<RemoveTrailingSlash, "equals", "hello">>,
            Expect<Test<RemoveTrailingDot, "equals", "file.txt">>,
            Expect<Test<RemoveTrailingSpace, "equals", "hello">>,
            Expect<Test<RemoveTrailingA, "equals", "banan">>,
        ];
    });

    it("multiple consecutive characters", () => {
        type RemoveMultipleSlashes = TrimCharEnd<"path///", "/">;
        type RemoveMultipleDots = TrimCharEnd<"file....", ".">;
        type RemoveMultipleSpaces = TrimCharEnd<"hello    ", " ">;
        type RemoveMultipleA = TrimCharEnd<"banaaaaaa", "a">;
        
        type cases = [
            Expect<Test<RemoveMultipleSlashes, "equals", "path">>,
            Expect<Test<RemoveMultipleDots, "equals", "file">>,
            Expect<Test<RemoveMultipleSpaces, "equals", "hello">>,
            Expect<Test<RemoveMultipleA, "equals", "ban">>,
        ];
    });

    it("no matching character at end", () => {
        type NoSlash = TrimCharEnd<"hello", "/">;
        type NoDot = TrimCharEnd<"file", ".">;
        type NoSpace = TrimCharEnd<"hello", " ">;
        type NoA = TrimCharEnd<"hello", "a">;
        
        type cases = [
            Expect<Test<NoSlash, "equals", "hello">>,
            Expect<Test<NoDot, "equals", "file">>,
            Expect<Test<NoSpace, "equals", "hello">>,
            Expect<Test<NoA, "equals", "hello">>,
        ];
    });

    it("character exists but not at end", () => {
        type SlashInMiddle = TrimCharEnd<"path/to/file", "/">;
        type DotInMiddle = TrimCharEnd<"file.txt", ".">;
        type SpaceInMiddle = TrimCharEnd<"hello world", " ">;
        
        type cases = [
            Expect<Test<SlashInMiddle, "equals", "path/to/file">>,
            Expect<Test<DotInMiddle, "equals", "file.txt">>,
            Expect<Test<SpaceInMiddle, "equals", "hello world">>,
        ];
    });

    it("edge cases", () => {
        type EmptyString = TrimCharEnd<"", "/">;
        type SingleChar = TrimCharEnd<"/", "/">;
        type AllSameChar = TrimCharEnd<"////", "/">;
        type DifferentChar = TrimCharEnd<"aaaa", "b">;
        
        type cases = [
            Expect<Test<EmptyString, "equals", "">>,
            Expect<Test<SingleChar, "equals", "">>,
            Expect<Test<AllSameChar, "equals", "">>,
            Expect<Test<DifferentChar, "equals", "aaaa">>,
        ];
    });

    it("special characters", () => {
        type RemoveNewline = TrimCharEnd<"hello\n", "\n">;
        type RemoveTab = TrimCharEnd<"hello\t", "\t">;
        type RemoveCarriageReturn = TrimCharEnd<"hello\r", "\r">;
        type RemoveBackslash = TrimCharEnd<"path\\", "\\">;
        
        type cases = [
            Expect<Test<RemoveNewline, "equals", "hello">>,
            Expect<Test<RemoveTab, "equals", "hello">>,
            Expect<Test<RemoveCarriageReturn, "equals", "hello">>,
            Expect<Test<RemoveBackslash, "equals", "path">>,
        ];
    });

    it("multi-character strings (removes all trailing occurrences)", () => {
        type MultiCharAtEnd = TrimCharEnd<"hello worldd", "d">;
        type ComplexString = TrimCharEnd<"foo/bar/baz///", "/">;
        
        type cases = [
            Expect<Test<MultiCharAtEnd, "equals", "hello worl">>,
            Expect<Test<ComplexString, "equals", "foo/bar/baz">>,
        ];
    });

    it("wide string handling", () => {
        type WideString = TrimCharEnd<string, "/">;
        type WideChar = TrimCharEnd<"hello/", string>;
        type BothWide = TrimCharEnd<string, string>;
        
        type cases = [
            Expect<Test<WideString, "equals", string>>,
            Expect<Test<WideChar, "equals", string>>,
            Expect<Test<BothWide, "equals", string>>,
        ];
    });

    it("literal string unions", () => {
        type UnionInput = TrimCharEnd<"foo/" | "bar/" | "baz", "/">;
        type MixedUnion = TrimCharEnd<"hello/" | "world", "/">;
        
        type cases = [
            Expect<Test<UnionInput, "equals", "foo" | "bar" | "baz">>,
            Expect<Test<MixedUnion, "equals", "hello" | "world">>,
        ];
    });

    it("numeric strings", () => {
        type RemoveZero = TrimCharEnd<"1000", "0">;
        type RemoveOne = TrimCharEnd<"1111", "1">;
        type NoMatch = TrimCharEnd<"123", "4">;
        
        type cases = [
            Expect<Test<RemoveZero, "equals", "1">>,
            Expect<Test<RemoveOne, "equals", "">>,
            Expect<Test<NoMatch, "equals", "123">>,
        ];
    });

});