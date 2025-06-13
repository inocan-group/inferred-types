import { Equal, Expect } from "@type-challenges/utils";
import { NestedSplit, Test } from "inferred-types/types";
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



});
