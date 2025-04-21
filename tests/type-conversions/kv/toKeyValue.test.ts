import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import { Extends, KeyValue } from "inferred-types/types";
import { toKeyValue, fromKeyValue } from "inferred-types/runtime";


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

        expect(fooBar, JSON.stringify(fooBar)).toEqual([
            { key: "bar", value: "hi" },
            { key: "id", value: 123 },
            { key: "foo", value: 1 },
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



    it("Obsidian example", () => {
        const fmKv = toKeyValue({
            "company": "[[Anthropic]]",
            "kind": "[[AI Model]]",
            "category": "[[LLM]]",
            "aliases": [
                "Haiku"
            ],
            "desc": "The fast and lightweight sibling in the Claude family (Anthropic)",
            "subcategory": "[[Lightweight Model]]",
            "type": "[[kind/types/AI.md|AI]]"
        }, { start: ["type", "kind", "category", "subcategory"], end: "desc" });

        const keys = fmKv.map(i => i.key);

        expect(keys, `Expect keys to be reordered; starting with "type" and ending with "desc"`).toEqual([
            "type", "kind", "category", "subcategory",
            "company", "aliases",
            "desc"
        ]);

        const fm = fromKeyValue(fmKv);

        expect(fm).toEqual({
            type: "[[kind/types/AI.md|AI]]",
            kind: "[[AI Model]]",
            category: "[[LLM]]",
            subcategory: "[[Lightweight Model]]",
            company: "[[Anthropic]]",
            aliases: ["Haiku"],
            desc: "The fast and lightweight sibling in the Claude family (Anthropic)"
        });

        type cases = [
            Expect<Extends<typeof fmKv, KeyValue[]>>,
            Expect<Equal<
                typeof fm,
                {
                    type: "[[kind/types/AI.md|AI]]";
                    kind: "[[AI Model]]";
                    category: "[[LLM]]";
                    subcategory: "[[Lightweight Model]]";
                    company: "[[Anthropic]]";
                    aliases: string[];
                    desc: "The fast and lightweight sibling in the Claude family (Anthropic)";
                }
            >>
        ];

    });

});


