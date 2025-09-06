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



});
