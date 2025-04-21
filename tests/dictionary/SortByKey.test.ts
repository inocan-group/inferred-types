import { Equal, Expect } from "@type-challenges/utils";
import { SortByKey } from "inferred-types/types";
import { describe, it } from "vitest";
import { sortByKey } from "../../modules/runtime/src/lists/sortByKey";
import {  tuple } from "inferred-types/runtime";

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
});

describe("sortByKey(kv, key, config)", () => {
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
