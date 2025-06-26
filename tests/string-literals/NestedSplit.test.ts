import { Equal, Expect } from "@type-challenges/utils";
import { typeof UPPER_ALPHA_CHARS } from "inferred-types/constants";
import { AlphaChar, NestedSplit, Test, UpperAlphaChar } from "inferred-types/types";
import { describe, it } from "vitest";

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

});

describe("via the nested(config) HOF", () => {

})
