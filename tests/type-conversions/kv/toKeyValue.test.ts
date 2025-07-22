import { describe, expect, it } from "vitest";

import {
    Expect,
    Extends,
    GetEach,
    KeyValue,
    Last,
    Test
} from "inferred-types/types";
import { toKeyValue, tuple, defineObj } from "inferred-types/runtime";


describe("toKeyValue(obj)", () => {

    it("happy path", () => {
        const fooBar = toKeyValue({ foo: 1, bar: "hi" });

        expect(fooBar).toEqual([
            { key: "foo", value: 1, required: true },
            { key: "bar", value: "hi", required: true }
        ])

        type cases = [
            Expect<Test<
                typeof fooBar,
                "equals",
                [
                    { key: "foo", value: 1, required: true },
                    { key: "bar", value: "hi", required: true }
                ]
            >>
        ];
    });

    it("forcing a key to start position", () => {
        const fooBar = toKeyValue({ foo: 1, bar: "hi", id: 123 }, { start: "id" });
        const kv = toKeyValue({ foo: 1, bar: "hi", id: 123 });

        expect(fooBar, JSON.stringify(fooBar)).toEqual([
            { key: "id", value: 123, required: true },
            { key: "foo", value: 1, required: true },
            { key: "bar", value: "hi", required: true },
        ])

        type cases = [
            Expect<Test<
                typeof fooBar,
                "equals",
                [
                    { key: "id", value: 123, required: true },
                    { key: "foo", value: 1, required: true },
                    { key: "bar", value: "hi", required: true }
                ]
            >>
        ];
    });


    it("forcing a key to end position", () => {
        const fooBar = toKeyValue({ foo: 1, bar: "hi", id: 123 }, { end: "bar" });
        type L = Last<GetEach<typeof fooBar, "key">>;

        expect(fooBar, `End key should be "bar": ${Object.keys(fooBar)}`).toEqual([
            { key: "foo", value: 1, required: true },
            { key: "id", value: 123, required: true },
            { key: "bar", value: "hi", required: true },
        ])

        type cases = [
            Expect<Test<L, "equals", "bar">>,
            Expect<Test<
                typeof fooBar,
                "hasSameValues",
                [
                    { key: "foo", value: 1, required: true },
                    { key: "id", value: 123, required: true },
                    { key: "bar", value: "hi", required: true }
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

        const kv = tuple(
            { key: "type", value: "[[kind/types/AI.md|AI]]", required: true },
            { key: "kind", value: "[[AI Model]]", required: true },
            { key: "category", value: "[[LLM]]", required: true },
            { key: "subcategory", value: "[[Lightweight Model]]", required: true },
            { key: "company", value: "[[Anthropic]]", required: true },
            { key: "aliases", value: ["Haiku"], required: true },
            { key: "desc", value: "The fast and lightweight sibling in the Claude family (Anthropic)", required: true },
        );

        expect(fromObj).toEqual(kv);

        type cases = [
            Expect<Extends<typeof fromObj, KeyValue[]>>,
            Expect<Test<typeof fromObj, "hasSameKeys", typeof kv>>,
            Expect<Test<typeof fromObj, "hasSameValues", typeof kv>>,
        ];

    });

});


