import { Equal, Expect, ExpectTrue } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import {
    Split,
    UpperAlphaChar,
    IsEqual,
    UnionToTuple,
} from "inferred-types/types";
import { split } from "inferred-types/runtime";
import { Extends } from "transpiled/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

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
            Expect<Equal<FooBarBaz, ["foo", "bar", "baz"]>>,
            Expect<Equal<FooBarBazTup, ["foo", "bar", "baz"]>>,
            Expect<Equal<FooBarBazBefore, ["foo, ", "bar, ", "baz"]>>,
            Expect<Equal<FooBarBazAfter, ["foo", ", bar", ", baz"]>>,
            Expect<Equal<FooBarBazInline, ["foo", ", ", "bar", ", ", "baz"]>>,

            Expect<Extends<FooBarBazUnion, Error>>,

            ExpectTrue<Equal<Empty, []>>,
            Expect<Equal<EmptyToo, []>>,
        ];

    });

    it("Split<T, SEP> with string literals", () => {
        const str = "hello world, nice to meet you" as const;
        type Space = Split<typeof str, " ">;
        type Comma = Split<typeof str, ", ">;

        // @ts-ignore
        type cases = [
            Expect<Equal<Space, ["hello", "world,", "nice", "to", "meet", "you"]>>,
            Expect<Equal<Comma, ["hello world", "nice to meet you"]>>,
        ];
    });

    it("Split<T, SEP> where string and separator are same", () => {
        type Str = "hello";
        type S1 = Split<Str, Str>;
        const str = "hello world" as const;
        type S2 = Split<typeof str, typeof str>;

        // @ts-ignore
        type cases = [
            Expect<Equal<S1, [""]>>,
            Expect<Equal<S2, [""]>>
        ];
    });

    it("Split with separator as wide type", () => {
        type S = Split<string, ",">;

        type cases = [Expect<Equal<S, string[]>>];
        const cases: cases = [true];
    });

    it("Split with a tuple separator", () => {
        type FooBar = Split<"FooBar", ["F", "B"], "omit">;
        type FooBarInline = Split<"FooBar", ["F", "B"], "inline">;
        type FooBarBefore = Split<"FooBar", ["F", "B"], "before">;
        type FooBarAfter = Split<"FooBar", ["F", "B"], "after">;

        // @ts-ignore
        type cases = [
            Expect<Equal<FooBar, ["oo", "ar"]>>,
            Expect<Equal<FooBarBefore, ["F", "ooB", "ar"]>>,
            Expect<IsEqual<FooBarAfter, ["Foo", "Bar"]>>,
        ];
    });


    it("Split with a union separator converted to tuple", () => {
        type FooBar = Split<"FooBar", UnionToTuple<UpperAlphaChar>, "omit">;
        type FooBarBefore = Split<"FooBar", UnionToTuple<UpperAlphaChar>, "before">;
        type FooBarAfter = Split<"FooBar", UnionToTuple<UpperAlphaChar>, "after">;

        // @ts-ignore
        type cases = [
            Expect<Equal<FooBar, ["oo", "ar"]>>,
            Expect<Equal<FooBarBefore, ["F", "ooB", "ar"]>>,
            Expect<IsEqual<FooBarAfter, ["Foo", "Bar"]>>,
        ];
    });


    it("Split called with a union separator", () => {
        type U = Split<"FooBar", "F" | "B">;

        type cases = [
            /** type tests */
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
            Expect<Equal<typeof fooBar, ["foo", "bar"]>>,
            Expect<Equal<typeof fooBarBaz, ["foo", "bar", "baz"]>>,
        ];
    });

    it("before variant", () => {
        const fooBar = split.before("foo, bar", ", ");
        const fooBarBaz = split.before("foo, bar; baz", ", ", "; ")

        expect(fooBar).toEqual(["foo, ", "bar"])
        expect(fooBarBaz).toEqual(["foo, ", "bar; ", "baz"])

        type cases = [
            Expect<Equal<typeof fooBar, ["foo, ", "bar"]>>,
            Expect<Equal<typeof fooBarBaz, ["foo, ", "bar; ", "baz"]>>,
        ];
    });

    it("after variant", () => {
        const fooBar = split.after("foo, bar", ", ");
        const fooBarBaz = split.after("foo, bar; baz", ", ", "; ")

        expect(fooBar).toEqual(["foo", ", bar"])
        expect(fooBarBaz).toEqual(["foo", ", bar", "; baz"])

        type cases = [
            Expect<Equal<typeof fooBar, ["foo", ", bar"]>>,
            Expect<Equal<typeof fooBarBaz, ["foo", ", bar", "; baz"]>>,
        ];
    });

    it("inline variant", () => {
        const fooBar = split.inline("foo, bar", ", ");
        const fooBarBaz = split.inline("foo, bar; baz", ", ", "; ")
        type X = Split<"foo, bar; baz", [", ", "; "], "inline">

        expect(fooBar).toEqual(["foo", ", ", "bar"])
        expect(fooBarBaz).toEqual(["foo", ", ", "bar", "; ", "baz"])

        type cases = [
            Expect<Equal<typeof fooBar, ["foo", ", ", "bar"]>>,
            Expect<Equal<typeof fooBarBaz, ["foo", ", ", "bar", "; ", "baz"]>>,
        ];
    });

})
