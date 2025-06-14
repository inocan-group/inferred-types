import { describe, it } from "vitest";
import {
    Expect,
    Test,
    StringSort
} from "inferred-types/types";

describe("StringSort<T, O>", () => {

    it("sorts in ascending order by default", () => {
        type Sorted = StringSort<["Orange", "Apple", "Peach", "Banana"]>;
        type cases = [
            Expect<Test<Sorted, "equals", ["Apple", "Banana", "Orange", "Peach"]>>,
        ];
    });

    it("sorts in descending order", () => {
        type Sorted = StringSort<["Orange", "Apple", "Peach", "Banana"], "descending">;
        type cases = [
            Expect<Test<Sorted, "equals", ["Peach", "Orange", "Banana", "Apple"]>>,
        ];
    });

    it("handles empty tuple", () => {
        type Sorted = StringSort<[]>;
        type cases = [
            Expect<Test<Sorted, "equals", []>>,
        ];
    });

    it("handles single element tuple", () => {
        type Sorted = StringSort<["Apple"]>;
        type cases = [
            Expect<Test<Sorted, "equals", ["Apple"]>>,
        ];
    });

    it("handles duplicates", () => {
        type Sorted = StringSort<["Banana", "Apple", "Banana", "Apple"]>;
        type cases = [
            Expect<Test<Sorted, "equals", ["Apple", "Apple", "Banana", "Banana"]>>,
        ];
    });

    it("places wide strings at the end", () => {
        type Sorted = StringSort<["Banana", string, "Apple", string]>;
        type cases = [
            Expect<Test<Sorted, "equals", ["Apple", "Banana", string, string]>>,
        ];
    });

    it("places wide strings at the end in descending order", () => {
        type Sorted = StringSort<[string, "Banana", string, "Apple"], "descending">;
        type cases = [
            Expect<Test<Sorted, "equals", ["Banana", "Apple", string, string]>>,
        ];
    });

    it("handles all wide strings", () => {
        type Sorted = StringSort<[string, string]>;
        type cases = [
            Expect<Test<Sorted, "equals", [string, string]>>,
        ];
    });

    it("handles already sorted input", () => {
        type Sorted = StringSort<["Apple", "Banana", "Orange"]>;
        type cases = [
            Expect<Test<Sorted, "equals", ["Apple", "Banana", "Orange"]>>,
        ];
    });

    it("handles reverse sorted input", () => {
        type Sorted = StringSort<["Peach", "Orange", "Banana", "Apple"]>;
        type cases = [
            Expect<Test<Sorted, "equals", ["Apple", "Banana", "Orange", "Peach"]>>,
        ];
    });
});
