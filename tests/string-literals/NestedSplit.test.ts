import { Equal, Expect } from "@type-challenges/utils";
import { NestedSplit } from "inferred-types/types";
import { describe, it } from "vitest";

describe("NestedSplit<TContent,TSplit,TNesting,TPolicy>", () => {

    it("avoiding objects", () => {
        type T1 = NestedSplit<
            "WeakMap<{id: number, data: Array<string>}, string>",
            ",",
            { "{":"}" }
        >;

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
            /** type tests */
        ];
    });


});
