import { Equal, Expect } from "@type-challenges/utils";
import { UPPER_ALPHA_CHARS } from "inferred-types/constants";
import { AlphaChar, NestedSplit, Test, UpperAlphaChar } from "inferred-types/types";
import { nestedSplit, nesting } from "inferred-types/runtime";
import { describe, it, expect } from "vitest";

describe("NestedSplit<TContent,TSplit,TNesting,TPolicy>", () => {

    it("avoiding objects", () => {
        type Text = "WeakMap<{id: number, data: Array<string>}, string>";
        type T1 = NestedSplit<Text,",",{ "{":"}" }>;

        type cases = [
            Expect<Equal<
                T1,
                [
                    "WeakMap<{id: number, data: Array<string>}", " string>"
                ]
            >>
        ];
    });


    it("splitting on character associated with nesting exit", () => {
        type T1 = NestedSplit<
            "string | Number<4>> | string",
            ">",
            { "<": ">" }
        >;

        type cases = [
            Expect<Test<
                T1, "equals",
                ["string | Number<4>",  " | string"]>>
        ];
    });


    it("last character is split character leaves an empty string at end of tuple result", () => {
        type T1 = NestedSplit<"Foobar>", ">">;

        type cases = [
            Expect<Test<
                T1, "equals",
                ["Foobar", ""]
            >>
        ];
    });

    it("no split character found results in a tuple of length 1", () => {
        type T1 = NestedSplit<"Foobar", ">">;

        type cases = [
            Expect<Test<
                T1, "equals",
                ["Foobar"]
            >>
        ];
    });


    it("using named presets and tuple splitters", () => {
        type T1 = NestedSplit<"Foo(Bar)Baz", typeof UPPER_ALPHA_CHARS, "brackets", "before">;
        type T2 = NestedSplit<"'Foo'BarBaz", typeof UPPER_ALPHA_CHARS, {"'":"'"}, "before">;

        type cases = [
            Expect<Test<
                T1, "equals",
                ["Foo(Bar)", "Baz"]
            >>,
            Expect<Test<
                T2, "equals",
                ["'Foo'", "Bar", "Baz"]
            >>
        ];
    });


});

describe("nestedSplit()", () => {

    it("basic splitting without nesting", () => {
        const r1 = nestedSplit("foo,bar,baz", ",");
        const r2 = nestedSplit("foo>bar>baz", ">");

        expect(r1).toEqual(["foo", "bar", "baz"]);
        expect(r2).toEqual(["foo", "bar", "baz"]);

        type cases = [
            Expect<Test<typeof r1, "equals", ["foo", "bar", "baz"]>>,
            Expect<Test<typeof r2, "equals", ["foo", "bar", "baz"]>>
        ];
    });

    it("splitting with bracket nesting", () => {
        const r1 = nestedSplit("WeakMap<{id: number, data: Array<string>}, string>", ",", { "{": "}" });
        const r2 = nestedSplit("Foo(Bar)Baz", "B", { "(": ")" });

        expect(r1).toEqual(["WeakMap<{id: number, data: Array<string>}", " string>"]);
        expect(r2).toEqual(["Foo(Bar)", "az"]);

        type cases = [
            Expect<Test<typeof r1, "equals", ["WeakMap<{id: number, data: Array<string>}", " string>"]>>,
            Expect<Test<typeof r2, "equals", ["Foo(Bar)", "az"]>>
        ];
    });

    it("splitting with array of split characters", () => {
        const r1 = nestedSplit("FooBarBaz", ["B"]);
        const r2 = nestedSplit("Foo(Bar)Baz", ["B"], { "(": ")" });

        expect(r1).toEqual(["Foo", "ar", "az"]);
        expect(r2).toEqual(["Foo(Bar)", "az"]);

        type cases = [
            Expect<Test<typeof r1, "equals", ["Foo", "ar", "az"]>>,
            Expect<Test<typeof r2, "equals", ["Foo(Bar)", "az"]>>
        ];
    });

    it("different split policies", () => {
        const omit = nestedSplit("foo,bar,baz", ",", { "{": "}" }, "omit");
        const inline = nestedSplit("foo,bar,baz", ",", { "{": "}" }, "inline");
        const before = nestedSplit("foo,bar,baz", ",", { "{": "}" }, "before");
        const after = nestedSplit("foo,bar,baz", ",", { "{": "}" }, "after");

        const omit2 = nestedSplit("foo,bar{,baz}", ",", { "{": "}" }, "omit");
        const inline2 = nestedSplit("foo,bar{,baz}", ",", { "{": "}" }, "inline");
        const before2 = nestedSplit("foo,bar{,baz}", ",", { "{": "}" }, "before");
        const after2 = nestedSplit("foo,bar{,baz}", ",", { "{": "}" }, "after");

        expect(omit).toEqual(["foo", "bar", "baz"]);
        expect(omit2).toEqual(["foo", "bar{,baz}"]);
        expect(inline).toEqual(["foo", ",", "bar", ",", "baz"]);
        expect(inline2).toEqual(["foo", ",", "bar{,baz}"]);
        expect(before).toEqual(["foo", ",bar", ",baz"]);
        expect(before2).toEqual(["foo", ",bar{,baz}"]);
        expect(after).toEqual(["foo,", "bar,", "baz"]);
        expect(after2).toEqual(["foo,", "bar{,baz}"]);

        type cases = [
            Expect<Test<typeof omit, "equals", ["foo", "bar", "baz"]>>,
            Expect<Test<typeof inline, "equals", ["foo", ",", "bar", ",", "baz"]>>,
            Expect<Test<typeof before, "equals", ["foo", ",bar", ",baz"]>>,
            Expect<Test<typeof after, "equals", ["foo,", "bar,", "baz"]>>,
        ];
    });

    it("no split character found", () => {
        const r1 = nestedSplit("foobar", ",");

        expect(r1).toEqual(["foobar"]);

        type cases = [
            Expect<Test<typeof r1, "equals", ["foobar"]>>
        ];
    });

});

describe("via the nesting(config) HOF", () => {

    it("brackets", () => {
        const api = nesting("brackets");

        const fooBarBaz = api.split("foo, (bar,) baz", ",");

        expect(fooBarBaz).toEqual(["foo", " (bar,) baz"])

        type cases = [
            Expect<Test<typeof fooBarBaz, "equals", ["foo", " (bar,) baz"]>>
        ]
    });
})
