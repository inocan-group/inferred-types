import { describe, it } from "vitest";
import type { Expect, PadEnd, Test } from "inferred-types/types";

describe("PadEnd<TContent,TChar,TLen>", () => {
    
    it("happy path - pads string with zeros", () => {
        type T1 = PadEnd<"5", "0", 3>;
        type T2 = PadEnd<"42", "0", 5>;
        type T3 = PadEnd<"123", "0", 6>;
        
        type cases = [
            Expect<Test<T1, "equals", "500">>,
            Expect<Test<T2, "equals", "42000">>,
            Expect<Test<T3, "equals", "123000">>,
        ];
    });

    it("happy path - pads with different characters", () => {
        type T1 = PadEnd<"abc", " ", 5>;
        type T2 = PadEnd<"hello", "-", 10>;
        type T3 = PadEnd<"x", "*", 4>;
        
        type cases = [
            Expect<Test<T1, "equals", "abc  ">>,
            Expect<Test<T2, "equals", "hello-----">>,
            Expect<Test<T3, "equals", "x***">>,
        ];
    });

    it("works with numeric content", () => {
        type T1 = PadEnd<5, "0", 3>;
        type T2 = PadEnd<42, "0", 5>;
        type T3 = PadEnd<999, " ", 6>;
        
        type cases = [
            Expect<Test<T1, "equals", "500">>,
            Expect<Test<T2, "equals", "42000">>,
            Expect<Test<T3, "equals", "999   ">>,
        ];
    });

    it("returns content unchanged when already at or exceeds target length", () => {
        type T1 = PadEnd<"hello", "0", 5>; // exactly target length
        type T2 = PadEnd<"hello world", "0", 5>; // exceeds target length
        type T3 = PadEnd<"12345", "-", 3>; // exceeds target length
        
        type cases = [
            Expect<Test<T1, "equals", "hello">>,
            Expect<Test<T2, "equals", "hello world">>,
            Expect<Test<T3, "equals", "12345">>,
        ];
    });

    it("error when TChar is not a single character", () => {
        type T1 = PadEnd<"abc", "00", 5>;
        type T2 = PadEnd<"test", "", 10>;
        type T3 = PadEnd<"x", "abc", 5>;
        
        type cases = [
            Expect<Test<T1, "isError", "invalid-char/pad-end">>,
            Expect<Test<T2, "isError", "invalid-char/pad-end">>,
            Expect<Test<T3, "isError", "invalid-char/pad-end">>,
        ];
    });

    it("edge cases", () => {
        type T1 = PadEnd<"", "0", 3>; // empty string
        type T2 = PadEnd<0, "0", 3>; // zero
        type T3 = PadEnd<"", "x", 0>; // zero target length
        
        type cases = [
            Expect<Test<T1, "equals", "000">>,
            Expect<Test<T2, "equals", "000">>,
            Expect<Test<T3, "equals", "">>,
        ];
    });

    it("single character padding", () => {
        type T1 = PadEnd<"a", "0", 2>;
        type T2 = PadEnd<"b", "-", 3>;
        type T3 = PadEnd<"9", "0", 4>;
        
        type cases = [
            Expect<Test<T1, "equals", "a0">>,
            Expect<Test<T2, "equals", "b--">>,
            Expect<Test<T3, "equals", "9000">>,
        ];
    });

    it("mixed character types in content", () => {
        type T1 = PadEnd<"1.5", "0", 6>;
        type T2 = PadEnd<"-42", " ", 6>;
        type T3 = PadEnd<"$", ".", 5>;
        
        type cases = [
            Expect<Test<T1, "equals", "1.5000">>,
            Expect<Test<T2, "equals", "-42   ">>,
            Expect<Test<T3, "equals", "$....">>,
        ];
    });
});