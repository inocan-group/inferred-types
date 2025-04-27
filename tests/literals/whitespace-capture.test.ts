import { describe, it, expect } from "vitest";
import { Expect, LeftWhitespace, RightWhitespace, Test } from "inferred-types/types";

describe("LeftWhitespace<T> utility", () => {
    it("no whitespace results in empty string literal", () => {
        type T1 = LeftWhitespace<"foobar">;
        type T2 = LeftWhitespace<"foobar \n">;

        type cases = [
            Expect<Test<T1, "equals", "">>,
            Expect<Test<T2, "equals", "">> //
        ];
    });

    it("left whitespace is captured from string literal, right whitespace ignored", () => {
        type T1 = LeftWhitespace<" foobar">;
        type T2 = LeftWhitespace<"\n\t foobar \n">;

        type cases = [
            Expect<Test<T1, "equals", " ">>,
            Expect<Test<T2, "equals",  "\n\t ">>
        ];
    });

    it("a 'string' type passed in returns a string", () => {
        type T1 = LeftWhitespace<string>;

        type cases = [Expect<Test<T1, "equals",  string>>];
        const c: cases = [true];
        expect(c).toBe(c);
    });
});

describe("RightWhitespace<T> utility", () => {
    it("no whitespace results in empty string literal", () => {
        type T1 = RightWhitespace<"foobar">;
        type T2 = RightWhitespace<"\n\tfoobar">;

        type cases = [
            Expect<Test<T1, "equals", "">>, //
            Expect<Test<T2, "equals",  "">>
        ];
        const c: cases = [true, true];
        expect(c).toBe(c);
    });

    it("right whitespace is captured from string literal, left whitespace ignored", () => {
        type T1 = RightWhitespace<"foobar ">;
        type T2 = RightWhitespace<"\n\t foobar \n">;

        type cases = [
            Expect<Test<T1, "equals", " ">>,
            Expect<Test<T2, "equals",  " \n">>
        ];
    });

    it("a 'string' type passed in returns a string", () => {
        type T1 = RightWhitespace<string>;

        type cases = [
            Expect<Test<T1, "equals",  string>>, //
        ];
    });
});
