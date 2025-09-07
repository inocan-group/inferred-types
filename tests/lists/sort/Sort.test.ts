import { describe, it } from "vitest";
import {
    Expect,
    Sort,
    Test,
} from "inferred-types/types";

describe("Sort<T>", () => {

    it("basic functionality test", () => {
        // Simple string array
        type Strings = ["c", "a", "b"];
        type SortedStrings = Sort<Strings>;

        // Simple number array
        type Numbers = [3, 1, 2];
        type SortedNumbers = Sort<Numbers>;

        type cases = [
            Expect<Test<SortedStrings, "equals", ["a", "b", "c"]>>,
            Expect<Test<SortedNumbers, "equals", [1, 2, 3]>>,
        ];
    });

    it("string sort on base", () => {
        type List = [
            "foo","bar","baz","zebra"
        ];
        type Asc = Sort<List, { order: "ASC" }>;
        type Desc = Sort<List, { order: "DESC" }>;
        type Natural = Sort<List, { order: "Natural", start: "zebra" }>;

        type cases = [
            Expect<Test<Asc, "equals", ["bar","baz", "foo", "zebra"]>>,
            Expect<Test<Desc, "equals", ["zebra", "foo", "baz", "bar"]>>,
            Expect<Test<Natural, "equals", ["zebra", "foo", "bar", "baz"]>>,
        ];
    });

    it("string sort with offset", () => {
        type Users = [
            { name: "John", age: 30 },
            { name: "Alice", age: 25 },
            { name: "Bob", age: 35 }
        ];

        type ByName = Sort<Users, { offset: "name" }>;
        type ByNameDesc = Sort<Users, { offset: "name", order: "DESC" }>;

        type cases = [
            Expect<Test<
                ByName,
                "equals",
                [
                    { name: "Alice", age: 25 },
                    { name: "Bob", age: 35 },
                    { name: "John", age: 30 }
                ]
            >>,
            Expect<Test<
                ByNameDesc,
                "equals",
                [
                    { name: "John", age: 30 },
                    { name: "Bob", age: 35 },
                    { name: "Alice", age: 25 }
                ]
            >>,
        ];
    });

    it("numeric sort on base", () => {
        type Numbers = [42, 1, 99, 23];

        type Asc = Sort<Numbers, { order: "ASC" }>;
        type Desc = Sort<Numbers, { order: "DESC" }>;
        type WithPinning = Sort<Numbers, { start: 99, end: 1 }>;

        type cases = [
            Expect<Test<Asc, "equals", [1, 23, 42, 99]>>,
            Expect<Test<Desc, "equals", [99, 42, 23, 1]>>,
            Expect<Test<WithPinning, "equals", [99, 23, 42, 1]>>,
        ];
    });

    it("numeric sort with offset", () => {
        type Products = [
            { name: "Widget", price: 25 },
            { name: "Gadget", price: 12 },
            { name: "Tool", price: 45 }
        ];

        type ByPrice = Sort<Products, { offset: "price", order: "ASC" }>;
        type ByPriceDesc = Sort<Products, { offset: "price", order: "DESC" }>;

        type cases = [
            Expect<Test<
                ByPrice,
                "equals",
                [
                    { name: "Gadget", price: 12 },
                    { name: "Widget", price: 25 },
                    { name: "Tool", price: 45 }
                ]
            >>,
            Expect<Test<
                ByPriceDesc,
                "equals",
                [
                    { name: "Tool", price: 45 },
                    { name: "Widget", price: 25 },
                    { name: "Gadget", price: 12 }
                ]
            >>,
        ];
    });

    it("boolean sort on base", () => {
        type Booleans = [false, true, false, true];

        type Asc = Sort<Booleans, { order: "ASC" }>;
        type Desc = Sort<Booleans, { order: "DESC" }>;

        type cases = [
            Expect<Test<Asc, "equals", [true, true, false, false]>>,
            Expect<Test<Desc, "equals", [false, false, true, true]>>,
        ];
    });

    it("boolean sort with offset", () => {
        type Users = [
            { name: "John", active: false },
            { name: "Alice", active: true },
            { name: "Bob", active: false }
        ];

        type ByActive = Sort<Users, { offset: "active" }>;

        type cases = [
            Expect<Test<
                ByActive,
                "equals",
                [
                    { name: "Alice", active: true },
                    { name: "Bob", active: false },
                    { name: "John", active: false }
                ]
            >>,
        ];
    });

    it("mixed type arrays", () => {
        // Mixed arrays should fall back to StringSort with string conversion
        type Mixed = ["zebra", 42, true, "apple", false, 1];

        type Sorted = Sort<Mixed>;
        type WithPinning = Sort<Mixed, { start: true, end: "zebra" }>;

        type cases = [
            // Numbers and booleans should be converted to strings for comparison
            // "1", "42", "apple", "false", "true", "zebra" (alphabetical)
            Expect<Test<Sorted, "equals", [1, 42, "apple", false, true, "zebra"]>>,
            Expect<Test<WithPinning, "equals", [true, 1, 42, "apple", false, "zebra"]>>,
        ];
    });

    it("natural order preserves original positions", () => {
        type Mixed = ["zebra", 42, true, "apple"];
        type Natural = Sort<Mixed, { order: "Natural" }>;

        type cases = [
            Expect<Test<Natural, "equals", ["zebra", 42, true, "apple"]>>,
        ];
    });

});
