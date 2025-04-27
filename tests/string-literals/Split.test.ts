import {  ExpectTrue } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import {
    Expect,
    Split,
    UpperAlphaChar,
    IsEqual,
    UnionToTuple,
    Test,
} from "inferred-types/types";
import { split } from "inferred-types/runtime";
import { Extends } from "transpiled/types";



describe("Split<T,SEP>", () => {

    it("happy path", () => {
        type FooBarBaz = Split<"foo, bar, baz", ", ">;
        type FooBarBazTup = Split<"foo, bar, baz", [", ", "; "]>;
        type FooBarBazBefore = Split<"foo, bar, baz", ", ", "before">;
        type FooBarBazAfter = Split<"foo, bar, baz", ", ", "after">;
        type FooBarBazInline = Split<"foo, bar, baz", ", ", "inline">;

        type FooBarBazUnion = Split<"foo, bar, baz", ", " | "; ">;

        type Empty = Split<"", "">;
        type EmptyToo = Split<"", ",">;

        // @ts-ignore
        type cases = [
            Expect<Test<FooBarBaz, "equals", ["foo", "bar", "baz"]>>,
            Expect<Test<FooBarBazTup, "equals", ["foo", "bar", "baz"]>>,
            Expect<Test<FooBarBazAfter, "equals", ["foo, ", "bar, ", "baz"]>>,
            Expect<Test<FooBarBazBefore, "equals", ["foo", ", bar", ", baz"]>>,
            Expect<Test<FooBarBazInline, "equals", ["foo", ", ", "bar", ", ", "baz"]>>,

            Expect<Extends<FooBarBazUnion, ["foo","bar","baz"]>>,

            Expect<Test<Empty, "equals", []>>,
            Expect<Test<EmptyToo, "equals",  []>>,
        ];

    });


    it("Split with before strategy", () => {
        type FooBarBazBefore = Split<"foo, bar, baz", ", ", "before">;
        type FooBarBefore = Split<"foo, bar", ", ", "before">;
        type Tricky = Split<"foo,,bar", ",", "before">;

        type cases = [
            /** type tests */
        ];
    });


    it("Split<T, SEP> with string literals", () => {
        const str = "hello world, nice to meet you" as const;
        type Space = Split<typeof str, " ">;
        type Comma = Split<typeof str, ", ">;

        // @ts-ignore
        type cases = [
            Expect<Test<Space, "equals", ["hello", "world,", "nice", "to", "meet",  "you"]>>,
            Expect<Test<Comma, "equals", ["hello world", "nice to meet you"]>>,
        ];
    });

    it("Split<T, SEP> where string and separator are same", () => {
        type Str = "hello";
        type S1 = Split<Str, Str>;
        const str = "hello world" as const;
        type S2 = Split<typeof str, typeof str>;

        type S3 = Split<Str,Str,"inline">

        // @ts-ignore
        type cases = [
            Expect<Test<S1, "equals",  []>>,
            Expect<Test<S2, "equals",  []>>,
            Expect<Test<S3, "equals",  ["hello"]>>
        ];
    });

    it("Split with separator as wide type", () => {
        type S = Split<string, ",">;

        type cases = [Expect<Test<S, "equals",  string[]>>];
        const cases: cases = [true];
    });

    it("Split with a tuple separator", () => {
        type FooBar = Split<"FooBar", ["F", "B"], "omit">;
        type FooBarInline = Split<"FooBar", ["F", "B"], "inline">;
        type FooBarBefore = Split<"FooBar", ["F", "B"], "before">;
        type FooBarAfter = Split<"FooBar", ["F", "B"], "after">;

        // @ts-ignore
        type cases = [
            Expect<Test<FooBar, "equals", ["oo",  "ar"]>>,
            Expect<Test<FooBarBefore, "equals", ["F", "ooB", "ar"]>>,
            Expect<Test<FooBarAfter, "equals", ["Foo", "Bar"]>>,
        ];
    });


    it("Split with a union separator converted to tuple", () => {
        type FooBar = Split<"FooBar", UnionToTuple<UpperAlphaChar>, "omit">;
        type FooBarBefore = Split<"FooBar", UnionToTuple<UpperAlphaChar>, "before">;
        type FooBarAfter = Split<"FooBar", UnionToTuple<UpperAlphaChar>, "after">;

        // @ts-ignore
        type cases = [
            Expect<Test<FooBar, "equals", ["oo",  "ar"]>>,
            Expect<Test<FooBarBefore, "equals", ["F", "ooB", "ar"]>>,
            Expect<Test<FooBarAfter, "equals", ["Foo", "Bar"]>>,
        ];
    });


    it("Split called with a union separator", () => {
        type U = Split<"FooBar", "F" | "B">;

        type cases = [
            /** type tests */
        ];
    });

    it("split with a numeric template value", () => {
        type StartsWith = Split<`${number}Age: ${number}, FavNumber: ${number}, Color: red`, `${number}`>;
        type Numeric = Split<`Age: ${number}, FavNumber: ${number}, Color: red`, `${number}`>;

        type cases = [
            Expect<Test<StartsWith, "equals", [
                "", "Age: ", ", FavNumber: ", ", "equals",  Color: red"
            ]>>,
            Expect<Test<Numeric, "equals", [
                "Age: ", ", FavNumber: ", ", Color: red"
            ]>>
        ];
    });

    it("split with a boolean template value", () => {
        type Logical = Split<
            `Employed: ${boolean}, Insurance: ${boolean}, Age: ${number}`, `${boolean}`
        >;

        type cases = [
            Expect<Test<Logical, "equals", [
                "Employed: ", ", Insurance: ", `,   Age: ${number}`
            ]>>
        ];
    });


});

describe("split()", () => {

    it("omit variant", () => {
        const fooBar = split("foo, bar", ", ");
        const fooBarBaz = split("foo, bar; baz", ", ", "; ")

        expect(fooBar).toEqual(["foo", "bar"])
        expect(fooBarBaz).toEqual(["foo", "bar", "baz"])

        type cases = [
            Expect<Test<typeof fooBar, "equals", ["foo",  "bar"]>>,
            Expect<Test<typeof fooBarBaz, "equals", ["foo", "bar", "baz"]>>,
        ];
    });

    it("before variant", () => {
        const fooBar = split.before("foo, bar", ", ");
        const fooBarBaz = split.before("foo, bar; baz", ", ", "; ")

        expect(fooBar).toEqual(["foo, ", "bar"])
        expect(fooBarBaz).toEqual(["foo, ", "bar; ", "baz"])

        type cases = [
            Expect<Test<typeof fooBar, "equals", ["foo, ", "bar"]>>,
            Expect<Test<typeof fooBarBaz, "equals", ["foo, ", "bar; ", "baz"]>>,
        ];
    });

    it("after variant", () => {
        const fooBar = split.after("foo, bar", ", ");
        const fooBarBaz = split.after("foo, bar; baz", ", ", "; ")

        expect(fooBar).toEqual(["foo", ", bar"])
        expect(fooBarBaz).toEqual(["foo", ", bar", "; baz"])

        type cases = [
            Expect<Test<typeof fooBar, "equals", [
                "foo", "bar"
            ]>>,
            Expect<Test<typeof fooBarBaz, "equals", [
                "foo", ", bar",  "; baz"
            ]>>,
        ];
    });

    it("inline variant", () => {
        const fooBar = split.inline("foo, bar", ", ");
        const fooBarBaz = split.inline("foo, bar; baz", ", ", "; ")

        expect(fooBar).toEqual(["foo", ", ", "bar"])
        expect(fooBarBaz).toEqual(["foo", ", ", "bar", "; ", "baz"])

        type cases = [
            Expect<Test<typeof fooBar, "equals", [
                "foo", ", ",  "bar"
            ]>>,
            Expect<Test<typeof fooBarBaz, "equals", [
                "foo", ", ", "bar", "; ",  "baz"
            ]>>,
        ];
    });


    it("inline variant with spaces", () => {
        const spaced = split.inline("hello world monkey", " ");
        expect(spaced).toEqual(["hello", " ", "world", " ", "monkey"])

        type cases = [
            Expect<Test<typeof spaced, "equals", [
                "hello", " ", "world", " ",  "monkey"
            ]>>
        ];
    });

    it("inline variant with longer sequence", () => {
        const four = split.inline("1, 2, 3, 4", ", ");
        expect(four).toEqual(["1", ", ", "2", ", ", "3", ", ", "4"]);

        type cases = [
            Expect<Test<typeof four, "equals", [
                "1", ", ", "2", ", ", "3", ", ",  "4"
            ]>>
        ];
    });





})
