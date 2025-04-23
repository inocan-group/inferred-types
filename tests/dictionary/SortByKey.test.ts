import { Equal, Expect } from "@type-challenges/utils";
import { Mutable, SortByKey } from "inferred-types/types";
import { describe, expect, it } from "vitest";
import {  sortByKey, getEach,  tuple } from "inferred-types/runtime";

describe("SortByKey<KV, Key, Config>", () => {

    it("happy path", () => {
        type KV = [
            {key: "foo", value: 1 },
            {key: "bar", value: "hi" },
            {key: "baz", value: 2 },
            {key: "color", value: "red" },
        ]
        type Sorted = SortByKey<KV, "key", {
            start: ["baz", "color"],
            end: "foo"
        }>;

        type cases = [
            Expect<Equal<
                Sorted,
                [
                    {key: "baz", value: 2 },
                    {key: "color", value: "red" },
                    {key: "bar", value: "hi" },
                    {key: "foo", value: 1 }
                ]
            >>
        ];
    });


    it("multiple items pinned to start, one item pinned to end and all items moved", () => {
        type Before = [
            { key: "company", value: "[[Anthropic]]" },
            { key: "kind", value: "[[AI Model]]" },
            { key: "category", value: "[[LLM]]" },
            { key: "aliases", value: ["Haiku"] },
            { key: "desc", value: "The fast and lightweight sibling in the Claude family (Anthropic)" },
            { key: "subcategory", value: "[[Lightweight Model]]" },
            { key: "type", value: "[[kind/types/AI.md|AI]]" },
        ];
        type After = [
            { key: "type", value: "[[kind/types/AI.md|AI]]" },
            { key: "kind", value: "[[AI Model]]" },
            { key: "category", value: "[[LLM]]" },
            { key: "subcategory", value: "[[Lightweight Model]]" },
            { key: "company", value: "[[Anthropic]]" },
            { key: "aliases", value: ["Haiku"] },
            { key: "desc", value: "The fast and lightweight sibling in the Claude family (Anthropic)" },
        ];

        type Test = SortByKey<Before, "key", {
            start: ["type", "kind", "category", "subcategory"],
            end: "desc"
        }>

        type cases = [
            Expect<Equal<Test, After>>
        ];
    });

});

describe("sortByKey(kv, key, config)", () => {


    it("happy path", () => {
        const kv = tuple(
            { key: "foo", value: 1 },
            { key: "bar", value: "hi" },
            { key: "baz", value: 2 },
            { key: "color", value: "red" }
        );

        const sorted = sortByKey(kv, "key", {
            start: ["baz","color"],
            end: "foo"
        });

        expect(sorted, `After pinning start and end KV pairs, the order is: ${JSON.stringify(getEach(sorted, "key"))}`).toEqual(
            [
                {key: "baz", value: 2 },
                {key: "color", value: "red" },
                {key: "bar", value: "hi" },
                {key: "foo", value: 1 }
            ]
        )

        type cases = [
            Expect<Equal<
                typeof sorted,
                [
                    {key: "baz", value: 2 },
                    {key: "color", value: "red" },
                    {key: "bar", value: "hi" },
                    {key: "foo", value: 1 }
                ]
            >>
        ];
    });

    it("multiple keys pinned to start, singular pinned to end", () => {
        const before = [
            { key: "company", value: "[[Anthropic]]" },
            { key: "kind", value: "[[AI Model]]" },
            { key: "category", value: "[[LLM]]" },
            { key: "aliases", value: ["Haiku"] },
            { key: "desc", value: "The fast and lightweight sibling in the Claude family (Anthropic)" },
            { key: "subcategory", value: "[[Lightweight Model]]" },
            { key: "type", value: "[[kind/types/AI.md|AI]]" },
        ] as const;
        const after = [
            { key: "type", value: "[[kind/types/AI.md|AI]]" },
            { key: "kind", value: "[[AI Model]]" },
            { key: "category", value: "[[LLM]]" },
            { key: "subcategory", value: "[[Lightweight Model]]" },
            { key: "company", value: "[[Anthropic]]" },
            { key: "aliases", value: ["Haiku"] },
            { key: "desc", value: "The fast and lightweight sibling in the Claude family (Anthropic)" },
        ] as const

        const test = sortByKey(before, "key", {
            start: ["type", "kind", "category", "subcategory"],
            end: "desc"
        });

        type Test = Mutable<typeof test>;
        type T2 = Mutable<SortByKey<typeof before, "key", {
            start: ["type", "kind", "category", "subcategory"],
            end: "desc"
        }>>;
        type After = Mutable<typeof after>;

        expect(test).toEqual(after);

        // TODO: the literal type on the runtime side is being interfered
        // with because the `start` and `end` parameters are ending up as
        // an array of a union type instead of a tuple
        type cases = [
            // Expect<Equal<Test, After>>,
            Expect<Equal<T2, After>>,
        ];
    });


});
