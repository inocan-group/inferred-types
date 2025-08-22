import { Equal, Expect } from "@type-challenges/utils";
import { UPPER_ALPHA_CHARS } from "inferred-types/constants";
import {  NestedSplit, Test, DefaultNesting } from "inferred-types/types";
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

    it("multi-character split: basic splitting", () => {
        type T1 = NestedSplit<"foo and bar and baz", "and">;
        type T2 = NestedSplit<"hello => world => test", "=>">;

        type cases = [
            Expect<Test<T1, "equals", ["foo ", " bar ", " baz"]>>,
            Expect<Test<T2, "equals", ["hello ", " world ", " test"]>>
        ];
    });

    it("multi-character split: with nesting", () => {
        type T1 = NestedSplit<"foo(bar and baz) and result", "and", { "(": ")" }>;
        type T2 = NestedSplit<"if {condition && other} then action", "&&", { "{": "}" }>;

        type cases = [
            Expect<Test<T1, "equals", ["foo(bar and baz) ", " result"]>>,
            Expect<Test<T2, "equals", ["if {condition && other} then action"]>>
        ];
    });

    it("multi-character split: different policies", () => {
        type OmitTest = NestedSplit<"foo and bar and baz", "and", DefaultNesting, "omit">;
        type InlineTest = NestedSplit<"foo and bar and baz", "and", DefaultNesting, "inline">;
        type BeforeTest = NestedSplit<"foo and bar and baz", "and", DefaultNesting, "before">;
        type AfterTest = NestedSplit<"foo and bar and baz", "and", DefaultNesting, "after">;

        type cases = [
            Expect<Test<OmitTest, "equals", ["foo ", " bar ", " baz"]>>,
            Expect<Test<InlineTest, "equals", ["foo ", "and", " bar ", "and", " baz"]>>,
            Expect<Test<BeforeTest, "equals", ["foo ", "and bar ", "and baz"]>>,
            Expect<Test<AfterTest, "equals", ["foo and", " bar and", " baz"]>>
        ];
    });

    it("multi-character split: complex nesting with multiple levels", () => {
        type T1 = NestedSplit<"func(param or default) or other(nested or not) or final", "or", { "(": ")" }>;
        type T2 = NestedSplit<"array[index || fallback] || other[key || default]", "||", { "[": "]" }>;

        type cases = [
            Expect<Test<T1, "equals", ["func(param or default) ", " other(nested or not) ", " final"]>>,
            Expect<Test<T2, "equals", ["array[index || fallback] ", " other[key || default]"]>>
        ];
    });

    it("multi-character split: no split found", () => {
        type T1 = NestedSplit<"hello world test", "and">;
        type T2 = NestedSplit<"function(param) { return value; }", "or", { "{": "}", "(": ")" }>;

        type cases = [
            Expect<Test<T1, "equals", ["hello world test"]>>,
            Expect<Test<T2, "equals", ["function(param) { return value; }"]>>
        ];
    });

    it("multi-character split: mixed with bracket nesting", () => {
        type T1 = NestedSplit<"WeakMap<{id: number, data: Array<string>}> then string", "then", { "{": "}", "<": ">" }>;
        type T2 = NestedSplit<"Array<number> or Set<string> or Map<key, value>", "or", { "<": ">" }>;

        type cases = [
            Expect<Test<T1, "equals", ["WeakMap<{id: number, data: Array<string>}> ", " string"]>>,
            Expect<Test<T2, "equals", ["Array<number> ", " Set<string> ", " Map<key, value>"]>>
        ];
    });

    it("multi-character split: empty segments", () => {
        type T1 = NestedSplit<"and bar and", "and">;
        type T2 = NestedSplit<"startandendand", "and">;

        type cases = [
            Expect<Test<T1, "equals", ["", " bar ", ""]>>,
            Expect<Test<T2, "equals", ["start", "end", ""]>>
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

    it("multi-character split: basic splitting", () => {
        const r1 = nestedSplit("foo and bar and baz", "and");
        const r2 = nestedSplit("hello => world => test", "=>");

        expect(r1).toEqual(["foo ", " bar ", " baz"]);
        expect(r2).toEqual(["hello ", " world ", " test"]);

        type cases = [
            Expect<Test<typeof r1, "equals", ["foo ", " bar ", " baz"]>>,
            Expect<Test<typeof r2, "equals", ["hello ", " world ", " test"]>>
        ];
    });

    it("multi-character split: with nesting", () => {
        const r1 = nestedSplit("foo(bar and baz) and result", "and", { "(": ")" });
        const r2 = nestedSplit("if {condition && other} then action", "&&", { "{": "}" });

        expect(r1).toEqual(["foo(bar and baz) ", " result"]);
        expect(r2).toEqual(["if {condition && other} then action"]);

        type cases = [
            Expect<Test<typeof r1, "equals", ["foo(bar and baz) ", " result"]>>,
            Expect<Test<typeof r2, "equals", ["if {condition && other} then action"]>>
        ];
    });

    it("multi-character split: different policies", () => {
        const omitTest = nestedSplit("foo and bar and baz", "and", { "{": "}" }, "omit");
        const inlineTest = nestedSplit("foo and bar and baz", "and", { "{": "}" }, "inline");
        const beforeTest = nestedSplit("foo and bar and baz", "and", { "{": "}" }, "before");
        const afterTest = nestedSplit("foo and bar and baz", "and", { "{": "}" }, "after");

        expect(omitTest).toEqual(["foo ", " bar ", " baz"]);
        expect(inlineTest).toEqual(["foo ", "and", " bar ", "and", " baz"]);
        expect(beforeTest).toEqual(["foo ", "and bar ", "and baz"]);
        expect(afterTest).toEqual(["foo and", " bar and", " baz"]);

        type cases = [
            Expect<Test<typeof omitTest, "equals", ["foo ", " bar ", " baz"]>>,
            Expect<Test<typeof inlineTest, "equals", ["foo ", "and", " bar ", "and", " baz"]>>,
            Expect<Test<typeof beforeTest, "equals", ["foo ", "and bar ", "and baz"]>>,
            Expect<Test<typeof afterTest, "equals", ["foo and", " bar and", " baz"]>>
        ];
    });

    it("multi-character split: complex nesting with multiple levels", () => {
        const r1 = nestedSplit("func(param or default) or other(nested or not) or final", "or", { "(": ")" });
        const r2 = nestedSplit("array[index || fallback] || other[key || default]", "||", { "[": "]" });

        expect(r1).toEqual(["func(param or default) ", " other(nested or not) ", " final"]);
        expect(r2).toEqual(["array[index || fallback] ", " other[key || default]"]);

        type cases = [
            Expect<Test<typeof r1, "equals", ["func(param or default) ", " other(nested or not) ", " final"]>>,
            Expect<Test<typeof r2, "equals", ["array[index || fallback] ", " other[key || default]"]>>
        ];
    });

    it("multi-character split: no split found", () => {
        const r1 = nestedSplit("hello world test", "and");
        const r2 = nestedSplit("function(param) { return value; }", "or", { "{": "}", "(": ")" });

        expect(r1).toEqual(["hello world test"]);
        expect(r2).toEqual(["function(param) { return value; }"]);

        type cases = [
            Expect<Test<typeof r1, "equals", ["hello world test"]>>,
            Expect<Test<typeof r2, "equals", ["function(param) { return value; }"]>>
        ];
    });

    it("multi-character split: mixed with bracket nesting", () => {
        const r1 = nestedSplit("WeakMap<{id: number, data: Array<string>}> then string", "then", { "{": "}", "<": ">" });
        const r2 = nestedSplit("Array<number> or Set<string> or Map<key, value>", "or", { "<": ">" });

        expect(r1).toEqual(["WeakMap<{id: number, data: Array<string>}> ", " string"]);
        expect(r2).toEqual(["Array<number> ", " Set<string> ", " Map<key, value>"]);

        type cases = [
            Expect<Test<typeof r1, "equals", ["WeakMap<{id: number, data: Array<string>}> ", " string"]>>,
            Expect<Test<typeof r2, "equals", ["Array<number> ", " Set<string> ", " Map<key, value>"]>>
        ];
    });

    it("multi-character split: empty segments", () => {
        const r1 = nestedSplit("and bar and", "and");
        const r2 = nestedSplit("startandendand", "and");

        expect(r1).toEqual(["", " bar ", ""]);
        expect(r2).toEqual(["start", "end", ""]);

        type cases = [
            Expect<Test<typeof r1, "equals", ["", " bar ", ""]>>,
            Expect<Test<typeof r2, "equals", ["start", "end", ""]>>
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
