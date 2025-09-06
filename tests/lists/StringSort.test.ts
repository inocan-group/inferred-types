import { describe, it, expect } from "vitest";
import type { Expect, StringSort, StringSortOptions, Test } from "inferred-types/types";

describe("StringSort<T, O>", () => {



    it("handles ascending order sort", () => {
        type Sorted = StringSort<["Orange", "Apple", "Peach", "Banana"], { order: "ASC"}>;

        type cases = [
            Expect<Test<Sorted, "equals", ["Apple","Banana","Orange","Peach"]>>
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
        type Natural = StringSort<["Banana", string, "Apple"]>;
        type Asc = StringSort<["Banana", string, "Apple"], { order: "ASC" }>;

        type cases = [
            Expect<Test<Natural, "equals", ["Banana", "Apple", string]>>,
            Expect<Test<Asc, "equals", [ "Apple", "Banana", string]>>,
        ]
    });

    it("supports first property", () => {
        type Sorted1 = StringSort<["d", "c", "a", "b"], { first: "c" }>;
        type Sorted2 = StringSort<["d", "c", "a", "b"], { first: ["c", "a"] }>;

        type cases = [
            Expect<Test<Sorted1, "equals", ["c","d","a","b"]>>,
            Expect<Test<Sorted2, "equals", ["c","a","d","b"]>>,
        ]
    });


    it("supports last property", () => {
        type Sorted1 = StringSort<["d", "c", "a", "b"], { last: "c" }>;
        type Sorted2 = StringSort<["d", "c", "a", "b"], { last: ["c", "a"] }>;

        type cases = [
            /** type tests */
        ];
    });



});
