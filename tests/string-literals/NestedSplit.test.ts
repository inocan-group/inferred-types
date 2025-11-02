import { Equal, Expect } from "@type-challenges/utils";
import { UPPER_ALPHA_CHARS } from "inferred-types/constants";
import type {
    AssertEqual,
    AssertError,
    DefaultNesting,
    NestedSplit,
    Test
} from "inferred-types/types";

import {  nestedSplit, nesting } from "inferred-types/runtime";
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


    it("there are no exit tokens at the root level", () => {
        type T = `><(foo,bar)>`;
        // here the real test is that we're leading with the `>` character
        // but we're at root level so it does not created an "unbalanced"
        // condition.
        // Also note that the `,` character wasn't found at the root level
        // so
        type A = NestedSplit<T, ",", "brackets">;

        type cases = [
            Expect<AssertEqual<
                A,
                ["><(foo", "bar)>"]
            >>
        ];
    });



    it("exit only that what you enter", () => {
        // this expression throws two curve balls
        // 1. the `=>` where the `>` should NOT be treated as an exit token because
        //    it is at the ROOT level which has no exit tokens
        // 2. the _greater than_ symbol near the end
        //    it too is at root level
        type T = `const example = <T extends number>(foo: T) => foo + 5 > 9;`
        // the real test is to make sure we don't generate a "unbalanced" error
        // or somehow put the `+` operator onto a non-root level where it will
        // not be split on.
        type A = NestedSplit<T, '+', "brackets">;


        type cases = [
            Expect<AssertEqual<
                A,
                ['const example = <T extends number>(foo: T) => foo ', ' 5 > 9;']
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

    it("a nested split with NO matches and one with matches but no trailing whitespace should be distinguishable", () => {
        type T1 = "foo: 1}";
        type T2 = "foo: 1";
        type N = NestedSplit<T1, "}">;
        type N2 = NestedSplit<T2, "}">;

        type cases = [
            Expect<Test<N, "equals", ["foo: 1", ""]>>,
            Expect<Test<N2, "equals", ["foo: 1"]>>,
        ];
    });

    it("shallow-quotes avoids splitting on delimiter inside quote", () => {
        type Text = `1234, 4567, "Bob, the quintessential idiot, did not care"`;
        type T1 = NestedSplit<Text, ", ", "shallow-quotes">;

        type cases = [
            Expect<Test<
                T1, "equals",
                ["1234", "4567", `"Bob, the quintessential idiot, did not care"`]
            >>
        ];
    });

    it("quotes also avoids splitting on delimiter (as splitting is only done on root level)", () => {
        type Text = `1234, 4567, "Bob, the quintessential idiot, did not care"`;
        type T1 = NestedSplit<Text, ", ", "quotes">;

        type cases = [
            Expect<Test<
                T1, "equals",
                ["1234", "4567", `"Bob, the quintessential idiot, did not care"`]
            >>
        ];
    });



    it("quotes produces an unbalanced error when it finds the single quote inside the double quotes because it is still using quote marks as entry/exit tokens", () => {
        type Text = `1234, 4567, "Bob, the quintessential idiot, didn't care"`;
        type T1 = NestedSplit<Text, ", ", "quotes">;

        type cases = [
            Expect<AssertError<T1, "unbalanced">>
        ];
    });



});

describe.skip("NestedSplit<TContent,TSplit,TNesting> (new syntax)", () => {

    it("shallow-quotes avoids splitting on delimiter inside quote AND avoids unbalanced quotes in level 1 when single quote is encountered", () => {
        type Text = `1234, 4567, "Bob, the quintessential idiot, didn't care"`;
        type T1 = NestedSplit<Text, ", ", "shallow-quotes">;

        type cases = [
            Expect<Test<
                T1, "equals",
                ["1234", "4567", `"Bob, the quintessential idiot, didn't care"`]
            >>
        ];
    });

    it("shallow-brackets treats content inside brackets as literal", () => {
        type Text = `foo, bar(a, b, c), baz`;
        type T1 = NestedSplit<Text, ", ", "shallow-brackets">;

        type cases = [
            Expect<Test<T1, "equals", ["foo", "bar(a, b, c)", "baz"]>>
        ];
    });

    it("shallow-brackets-and-quotes combined", () => {
        type Text = `x, y(a, b), z, "test, value"`;
        type T1 = NestedSplit<Text, ", ", "shallow-brackets-and-quotes">;

        type cases = [
            Expect<Test<T1, "equals", ["x", "y(a, b)", "z", `"test, value"`]>>
        ];
    });

    it("hierarchical config with explicit shallow behavior", () => {
        type Text = `data: {a, b, c}, result`;
        type T1 = NestedSplit<Text, ", ", { "{": ["}", {}] }>;

        type cases = [
            Expect<Test<T1, "equals", ["data: {a, b, c}", "result"]>>
        ];
    });

    it("hierarchical config with nested levels having different tokens", () => {
        type Text = `outer, {inner, [nested, items]}, final`;
        type T1 = NestedSplit<Text, ", ", { "{": ["}", { "[": "]" }] }>;

        type cases = [
            Expect<Test<T1, "equals", ["outer", "{inner, [nested, items]}", "final"]>>
        ];
    });

})

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

    it("default behavior: no config, 'brackets', and 'default' behave identically (runtime)", () => {
        const text = `data(nested, values), result{key, value}`;

        // No config specified (uses default)
        const noConfig = nestedSplit(text, ", ");

        // Explicit "brackets"
        const withBrackets = nestedSplit(text, ", ", "brackets");


        // All three should produce identical results
        expect(noConfig).toEqual(["data(nested, values)", "result{key, value}"]);
        expect(withBrackets).toEqual(["data(nested, values)", "result{key, value}"]);

        // Verify they're actually equal
        expect(noConfig).toEqual(withBrackets);


        type cases = [
            Expect<Test<typeof noConfig, "equals", ["data(nested, values)", "result{key, value}"]>>,
            Expect<Test<typeof withBrackets, "equals", ["data(nested, values)", "result{key, value}"]>>,
            // Type-level equality checks
            Expect<Test<typeof noConfig, "equals", typeof withBrackets>>,
        ];
    });
});

describe.skip("nestedSplit() with new syntax", () => {
    it("shallow-quotes: treats content inside quotes as literal", () => {
        const text = `1234, 4567, "Bob, the quintessential idiot, did not care"` as const;

        // Using shallow-quotes: quotes recognized at level 0, but inside quotes no nesting
        const t1 = nestedSplit(text, ", ", "shallow-quotes");

        expect(t1).toEqual(["1234", "4567", `"Bob, the quintessential idiot, did not care"`]);

        type cases = [
            Expect<Test<typeof t1, "equals", ["1234", "4567", `"Bob, the quintessential idiot, did not care"`]>>
        ];
    });

    it("shallow-brackets: treats content inside brackets as literal", () => {
        const text = `foo, bar(a, b, c), baz` as const;

        // Using shallow-brackets: brackets recognized at level 0, but inside brackets no nesting
        const t1 = nestedSplit(text, ", ", "shallow-brackets");

        expect(t1).toEqual(["foo", "bar(a, b, c)", "baz"]);

        type cases = [
            Expect<Test<typeof t1, "equals", ["foo", "bar(a, b, c)", "baz"]>>
        ];
    });

    it("shallow-brackets-and-quotes: combined shallow nesting", () => {
        const text = `x, y(a, b), z, "test, value"` as const;

        // Both brackets and quotes at level 0 only, no nesting inside
        const t1 = nestedSplit(text, ", ", "shallow-brackets-and-quotes");

        expect(t1).toEqual(["x", "y(a, b)", "z", `"test, value"`]);

        type cases = [
            Expect<Test<typeof t1, "equals", ["x", "y(a, b)", "z", `"test, value"`]>>
        ];
    });

    it("hierarchical config: explicit shallow behavior", () => {
        // Explicitly show hierarchical config where level 1 has empty config
        const text = `data: {a, b, c}, result` as const;

        const t1 = nestedSplit(text, ", ", { "{": ["}", {}] });

        expect(t1).toEqual(["data: {a, b, c}", "result"]);

        type cases = [
            Expect<Test<typeof t1, "equals", ["data: {a, b, c}", "result"]>>
        ];
    });

    it("hierarchical config: nested levels with different tokens", () => {
        // Level 0: recognize {}, inside {} recognize []
        const text = `outer, {inner, [nested, items]}, final` as const;

        const t1 = nestedSplit(text, ", ", {
            "{": ["}", { "[": "]" }]
        });

        // At level 0: split on ", "
        // Inside {}: recognize [] and split on ", "
        // Inside []: split on ", "
        expect(t1).toEqual(["outer", "{inner, [nested, items]}", "final"]);

        type cases = [
            Expect<Test<typeof t1, "equals", ["outer", "{inner, [nested, items]}", "final"]>>
        ];
    });
})

describe("via the nesting(config) HOF", () => {

    it("brackets", () => {
        const api = nesting("brackets");

        const fooBarBaz = api.split("foo, (bar,) baz", ",");

        expect(fooBarBaz).toEqual(["foo", " (bar,) baz"])

        type cases = [
            Expect<Test<typeof fooBarBaz, "equals", ["foo", " (bar,) baz"]>>
        ]
    });



    it("quotes", () => {
        const api = nesting("quotes");

        const text = `1234, 4567, "Bob, the quintessential idiot, did not care"`
        const split = api.split(text, ",");

        type cases = [
            Expect<AssertEqual<typeof split, [
                "1234",
                " 4567",
                " \"Bob, the quintessential idiot, did not care\""
            ]>>
        ];
    });

})
