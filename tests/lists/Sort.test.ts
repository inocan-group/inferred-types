import {  tuple } from "inferred-types/runtime";
import { Expect, Sort, Test } from "inferred-types/types";
import { describe, it } from "vitest";

describe("Sort<T>", () => {
    it("sorting without offset", () => {

        type StringFirst = Sort<["foo", "bar", 42, "baz", 99], { first: [string] }>
        type BazFirst = Sort<["foo", "bar", 42, "baz", 99], { first: ["baz"] }>
        type NumberToNumber = Sort<["foo", "bar", 42, "baz", 99], { first: [99], last: [42] }>;

        type cases = [
            Expect<Test<StringFirst, "equals", ["foo", "bar", "baz", 42, 99]>>,
            Expect<Test<BazFirst, "equals", ["baz", "foo", "bar", 42, 99]>>,
            Expect<Test<NumberToNumber, "equals", [99, "foo", "bar", "baz", 42]>>,
        ];
    });

    it("sorting with offset", () => {
        type O1 = { id: 1; color: "blue" }
        type O2 = { id: 2; color: "red" }
        type O3 = { id: 3; color: "orange"; price: 55 }

        type Orange = Sort<[O1, O2, O3], { first: [3], offset: "id" }>
        type OrangeToo = Sort<[O1, O2, O3], { first: ["orange"], offset: "color" }>

        type cases = [
            Expect<Test<Orange, "equals", [O3, O1, O2]>>,
            Expect<Test<OrangeToo, "equals", [O3, O1, O2]>>,
        ];
    });
});

describe.todo("sort(tuple, options)", () => {
    const items = tuple([1, 2, "foo", "bar", 3]);

    it.todo("TODO", () => {
        const barFirst = sort(
            items,
            { first: ["String(bar)"] }
        );
        const bar2First = sort(
            items,
            { first: ["String(bar)", "Number(2)"] }
        );


        type cases = [
            /** type tests */
        ];
    });


});

