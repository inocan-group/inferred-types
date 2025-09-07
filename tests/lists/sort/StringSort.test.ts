import { describe, it, expect } from "vitest";
import type { Expect, StringSort, StringSortOptions, Test } from "inferred-types/types";

describe("StringSort<T, O>", () => {



    it("handles ascending order sort", () => {
        type Sorted = StringSort<["Orange", "Apple", "Peach", "Banana"], { order: "ASC" }>;

        type cases = [
            Expect<Test<Sorted, "equals", ["Apple", "Banana", "Orange", "Peach"]>>
        ]
    });

    it("handles descending order", () => {
        type Sorted = StringSort<["Orange", "Apple", "Peach", "Banana"], { order: "DESC" }>;

        type cases = [
            Expect<Test<Sorted, "equals", ["Peach","Orange","Banana","Apple"]>>
        ]
    });

    it("handles empty tuple", () => {
        type Sorted = StringSort<[]>;

        type cases = [
            Expect<Test<Sorted, "equals", []>>
        ]
    });

    it("handles single element tuple", () => {
        type Sorted = StringSort<["Apple"]>;

        type cases = [
            Expect<Test<Sorted, "equals", ["Apple"]>>
        ]
    });

    it("handles wide strings", () => {
        type Natural = StringSort<["Banana", string, "Apple"], { order: "Natural" }>;
        type Asc = StringSort<["Banana", string, "Apple"], { order: "ASC" }>;

        type cases = [
            Expect<Test<Natural, "equals", ["Banana", "Apple", string]>>,
            Expect<Test<Asc, "equals", ["Apple", "Banana", string]>>,
        ]
    });

    it("supports start property", () => {
        type Sorted1 = StringSort<["d", "c", "a", "b"], { start: "c" }>;
        type Sorted2 = StringSort<["d", "c", "a", "b"], { start: ["c", "a"] }>;

        type cases = [
            Expect<Test<Sorted1, "equals", ["c", "a", "b", "d"]>>,
            Expect<Test<Sorted2, "equals", ["c", "a", "b", "d"]>>,
        ]
    });


    it("supports end property", () => {
        type Sorted1 = StringSort<["d", "c", "a", "b"], { end: "c" }>;
        type Sorted2 = StringSort<["d", "c", "a", "b"], { end: ["c", "a"] }>;

        type cases = [
            Expect<Test<Sorted1, "equals", ["a", "b", "d", "c"]>>,
            Expect<Test<Sorted2, "equals", ["b", "d", "c", "a"]>>,
        ];
    });

    it("supports offset property for container sorting", () => {
        type DATA = [
            { id: "foo", name: "zebra" },
            { id: "baz", name: "apple" },
            { id: "bar", name: "mango" },
        ];

        type Asc = StringSort<DATA, { offset: "name", order: "ASC" }>;
        type Desc = StringSort<DATA, { offset: "name", order: "DESC" }>;
        type Natural = StringSort<DATA, { offset: "name", order: "Natural" }>;

        type cases = [
            Expect<Test<
                Asc,
                "equals",
                [
                    { id: "baz", name: "apple" },
                    { id: "bar", name: "mango" },
                    { id: "foo", name: "zebra" },
                ]
            >>,
            Expect<Test<
                Desc,
                "equals",
                [
                    { id: "foo", name: "zebra" },
                    { id: "bar", name: "mango" },
                    { id: "baz", name: "apple" },
                ]
            >>,
            Expect<Test<
                Natural,
                "equals",
                [
                    { id: "foo", name: "zebra" },
                    { id: "baz", name: "apple" },
                    { id: "bar", name: "mango" },
                ]
            >>,
        ];
    });

    it("supports offset property with nested object paths", () => {
        type DATA = [
            { user: { profile: { displayName: "John" } }, id: 1 },
            { user: { profile: { displayName: "Alice" } }, id: 2 },
            { user: { profile: { displayName: "Bob" } }, id: 3 },
        ];

        type Sorted = StringSort<DATA, { offset: "user.profile.displayName" }>;

        type cases = [
            Expect<Test<
                Sorted,
                "equals",
                [
                    { user: { profile: { displayName: "Alice" } }, id: 2 },
                    { user: { profile: { displayName: "Bob" } }, id: 3 },
                    { user: { profile: { displayName: "John" } }, id: 1 },
                ]
            >>,
        ];
    });

    it("handles wide strings with offset sorting", () => {
        type DATA = [
            { name: "banana", type: string },
            { name: "apple", type: "fruit" },
            { name: "carrot", type: "vegetable" },
        ];

        type Sorted = StringSort<DATA, { offset: "type" }>;

        type cases = [
            Expect<Test<
                Sorted,
                "equals",
                [
                    { name: "apple", type: "fruit" },
                    { name: "carrot", type: "vegetable" },
                    { name: "banana", type: string },
                ]
            >>,
        ];
    });

    it("supports Natural order preserving original positions", () => {
        type Natural1 = StringSort<["zebra", "apple", "banana"], { order: "Natural" }>;
        type Natural2 = StringSort<["z", "a", "b"], { order: "Natural" }>;

        type cases = [
            Expect<Test<Natural1, "equals", ["zebra", "apple", "banana"]>>,
            Expect<Test<Natural2, "equals", ["z", "a", "b"]>>,
        ];
    });

});
