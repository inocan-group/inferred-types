import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import { Extends, KeyValue } from "inferred-types/types";
import { toKeyValue, tuple, defineObj } from "inferred-types/runtime";
import { log } from "console";


describe("toKeyValue(obj)", () => {

    it("happy path", () => {
        const fooBar = toKeyValue({ foo: 1, bar: "hi" });

        expect(fooBar).toEqual([
            { key: "foo", value: 1 },
            { key: "bar", value: "hi" }
        ])

        type cases = [
            Expect<Equal<
                typeof fooBar,
                [
                    { key: "foo", value: 1 },
                    { key: "bar", value: "hi" }
                ]
            >>
        ];
    });

    it("forcing a key to start position", () => {
        const fooBar = toKeyValue({ foo: 1, bar: "hi", id: 123 }, { start: "id" });
        const kv = toKeyValue({ foo: 1, bar: "hi", id: 123 });

        expect(fooBar, JSON.stringify(fooBar)).toEqual([
            { key: "id", value: 123 },
            { key: "foo", value: 1 },
            { key: "bar", value: "hi" },
        ])

        type cases = [
            Expect<Equal<
                typeof fooBar,
                [
                    { key: "id", value: 123 },
                    { key: "foo", value: 1 },
                    { key: "bar", value: "hi" }
                ]
            >>
        ];
    });


    it("forcing a key to end position", () => {
        const fooBar = toKeyValue({ foo: 1, bar: "hi", id: 123 }, { end: "bar" });

        expect(fooBar, `End key should be "bar": ${Object.keys(fooBar)}`).toEqual([
            { key: "foo", value: 1 },
            { key: "id", value: 123 },
            { key: "bar", value: "hi" },
        ])

        type cases = [
            Expect<Equal<
                typeof fooBar,
                [
                    { key: "foo", value: 1 },
                    { key: "id", value: 123 },
                    { key: "bar", value: "hi" }
                ]
            >>
        ];
    });



    it("Forcing both start and end keys", () => {
        const obj = defineObj({
            "company": "[[Anthropic]]",
            "kind": "[[AI Model]]",
            "category": "[[LLM]]",
            "aliases": [
                "Haiku"
            ],
            "desc": "The fast and lightweight sibling in the Claude family (Anthropic)",
            "subcategory": "[[Lightweight Model]]",
            "type": "[[kind/types/AI.md|AI]]"
        })();

        const fromObj = toKeyValue(obj, {
            start: ["type", "kind", "category", "subcategory"],
            end: "desc"
        });
        log({fromObj})

        const kv = tuple(
            { key: "type", value: "[[kind/types/AI.md|AI]]" },
            { key: "kind", value: "[[AI Model]]" },
            { key: "category", value: "[[LLM]]" },
            { key: "subcategory", value: "[[Lightweight Model]]" },
            { key: "company", value: "[[Anthropic]]" },
            { key: "aliases", value: ["Haiku"] },
            { key: "desc", value: "The fast and lightweight sibling in the Claude family (Anthropic)" },
        );

        expect(fromObj).toEqual(kv);

        type cases = [
            Expect<Extends<typeof fromObj, KeyValue[]>>,
            Expect<Equal<
                typeof fromObj,
                typeof kv
            >>
        ];

    });

});


