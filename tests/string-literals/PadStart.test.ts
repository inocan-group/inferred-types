import { describe, it } from "vitest";
import type { Expect, PadStart, Test } from "inferred-types/types";

describe("PadStart<TContent,TChar,TLen>", () => {
    
    it("happy path - pads string with zeros", () => {
        type T1 = PadStart<"5", "0", 3>;
        type T2 = PadStart<"42", "0", 5>;
        type T3 = PadStart<"123", "0", 6>;
        
        type cases = [
            Expect<Test<T1, "equals", "005">>,
            Expect<Test<T2, "equals", "00042">>,
            Expect<Test<T3, "equals", "000123">>,
        ];
    });

    it("happy path - pads with different characters", () => {
        type T1 = PadStart<"abc", " ", 5>;
        type T2 = PadStart<"hello", "-", 10>;
        type T3 = PadStart<"x", "*", 4>;
        
        type cases = [
            Expect<Test<T1, "equals", "  abc">>,
            Expect<Test<T2, "equals", "-----hello">>,
            Expect<Test<T3, "equals", "***x">>,
        ];
    });

    it("works with numeric content", () => {
        type T1 = PadStart<5, "0", 3>;
        type T2 = PadStart<42, "0", 5>;
        type T3 = PadStart<999, " ", 6>;
        
        type cases = [
            Expect<Test<T1, "equals", "005">>,
            Expect<Test<T2, "equals", "00042">>,
            Expect<Test<T3, "equals", "   999">>,
        ];
    });

    it("returns content unchanged when already at or exceeds target length", () => {
        type T1 = PadStart<"hello", "0", 5>; // exactly target length
        type T2 = PadStart<"hello world", "0", 5>; // exceeds target length
        type T3 = PadStart<"12345", "-", 3>; // exceeds target length
        
        type cases = [
            Expect<Test<T1, "equals", "hello">>,
            Expect<Test<T2, "equals", "hello world">>,
            Expect<Test<T3, "equals", "12345">>,
        ];
    });

    it("error when TChar is not a single character", () => {
        type T1 = PadStart<"abc", "00", 5>;
        type T2 = PadStart<"test", "", 10>;
        type T3 = PadStart<"x", "abc", 5>;
        
        type cases = [
            Expect<Test<T1, "isError", "invalid-char/pad-start">>,
            Expect<Test<T2, "isError", "invalid-char/pad-start">>,
            Expect<Test<T3, "isError", "invalid-char/pad-start">>,
        ];
    });

    it("edge cases", () => {
        type T1 = PadStart<"", "0", 3>; // empty string
        type T2 = PadStart<0, "0", 3>; // zero
        type T3 = PadStart<"", "x", 0>; // zero target length
        
        type cases = [
            Expect<Test<T1, "equals", "000">>,
            Expect<Test<T2, "equals", "000">>,
            Expect<Test<T3, "equals", "">>,
        ];
    });

    it("single character padding", () => {
        type T1 = PadStart<"a", "0", 2>;
        type T2 = PadStart<"b", "-", 3>;
        type T3 = PadStart<"9", "0", 4>;
        
        type cases = [
            Expect<Test<T1, "equals", "0a">>,
            Expect<Test<T2, "equals", "--b">>,
            Expect<Test<T3, "equals", "0009">>,
        ];
    });
});