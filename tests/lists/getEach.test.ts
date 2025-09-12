import { describe, expect, it } from "vitest";
import { getEach, tuple } from "inferred-types/runtime";
import type { Err, Expect, Get, GetEach, Test } from "inferred-types/types";

describe("GetEach<T,P>", () => {

    it("prop from dictionary in readonly tuple", () => {
        type List = readonly [
            { id: 1; value: "foo" },
            { id: 2; value: "bar"; cost: 5 },
            { id: 3; value: "baz"; cost: 15 }
        ];

        type ID = GetEach<List, "id">;
        type Value = GetEach<List, "value">;
        type Cost = GetEach<List, "cost">;

        type cases = [
            Expect<Test<ID, "equals",  [1, 2, 3]>>,
            Expect<Test<Value, "equals",  ["foo", "bar", "baz"]>>,
            Expect<Test<Cost, "equals", [undefined, 5, 15]>>
        ];
    });

    it("prop from dictionary in array", () => {
        type List =  [
            { id: 1; value: "foo" },
            { id: 2; value: "bar"; cost: 5 },
            { id: 3; value: "baz"; cost: 15 }
        ];

        type ID = GetEach<List, "id">;
        type Value = GetEach<List, "value">;
        type Cost = GetEach<List, "cost">;
        type Cost2 = GetEach<List, "cost", never>;

        type cases = [
            Expect<Test<ID, "equals",  [1, 2, 3]>>,
            Expect<Test<Value, "equals",  ["foo", "bar", "baz"]>>,
            Expect<Test<Cost, "equals",  [undefined, 5, 15]>>,
            Expect<Test<Cost2, "equals",  [5, 15]>>
        ];
    });

    it("array of errors", () => {
        type E1 = Err<"context","There I was, there I was">;
        type E2 = Err<"location", "In the Jungle">;
        type T1 = GetEach<[E1,E2], "message">;
        type G1 = Get<E1, "message">; // this works!

        type cases = [
            Expect<Test<T1, "equals", [
                "There I was, there I was",
                "In the Jungle"
            ]>>
        ];
    });

    it("deep path", () => {
        type List = readonly [
            { id: 1; color: { favorite: "blue" } },
            { id: 2; color: { favorite: "green" } },
            { id: 3; color: { favorite: undefined; owns: "grey" } },
        ];
        type NotRO = [
            { id: 1; color: { favorite: "blue" } },
            { id: 2; color: { favorite: "green" } },
            { id: 3; color: { favorite: undefined; owns: "grey" } },
        ];

        type Fav = GetEach<List, "color.favorite">;
        type FavNotRO = GetEach<NotRO, "color.favorite">;
        type Owns = GetEach<List, "color.owns">;

        type cases = [
            Expect<Test<Fav, "equals",   ["blue", "green", undefined]>>,
            Expect<Test<FavNotRO, "equals",  ["blue", "green", undefined]>>,
            Expect<Test<Owns, "equals",   [undefined, undefined, "grey"]>>,
        ];
    });

    it("into an array structure", () => {
        type List = [
            { id: 1; colors: ["blue", "green", "red"] },
            { id: 1; colors: ["purple", "lime", "orange", "fuchsia"] }
        ];

        type First = GetEach<List, "colors.0">;
        type Incomplete = GetEach<List, "colors.3">;
        type Empty = GetEach<List, "colors.5">;

        type cases = [
            Expect<Test<First,"equals", ["blue", "purple"]>>,
            Expect<Test<Incomplete, "equals",  [undefined, "fuchsia"]>>,
            Expect<Test<Empty, "equals",  [undefined,undefined]>>,
        ];
    });

    it("into a readonly array structure", () => {
        type List = readonly [
            { id: 1; colors: ["blue", "green", "red"] },
            { id: 1; colors: ["purple", "lime", "orange", "fuchsia"] }
        ];

        type First = GetEach<List, "colors.0">;
        type Incomplete = GetEach<List, "colors.3", never>;
        type Empty = GetEach<List, "colors.5", never>;

        type cases = [
            Expect<Test<First,  "equals",  ["blue", "purple"]>>,
            Expect<Test<Incomplete, "equals",   ["fuchsia"]>>,
            Expect<Test<Empty, "equals",  []>>,
        ];
    });

    const arrSet = [
        { id: 1, color: ["blue", "green", "red"] as const },
        { id: 2, color: ["purple", "lime", "orange", "fuchsia"] as const },
        { id: 3 },
    ] as const;

    it("Functions with Props should work too", () => {
        type List = [
            (() => `hi`) & { id: 1; color: { favorite: "blue" } },
            (() => `hi`) & { id: 2; color: { favorite: "green" } },
            (() => `hi`) & { id: 3; color: { favorite: undefined; owns: "grey" } },
        ];

        type Fav = GetEach<List, "color.favorite", never>;
        type Owns = GetEach<List, "color.owns", never>;

        // @ts-ignore
        type cases = [
            Expect<Test<Fav, "equals", ['blue',  'green']>>,
            Expect<Test<Owns, "equals",  ['grey']>>,
        ];
    });
});

describe("getEach(list, prop)", () => {
    it("happy path", () => {
        const kv = tuple(
            { key: "foo", value: 1, name: "foo" },
            { key: "bar", value: "hi" },
            { key: "baz", value: 2, name: "baz" },
            { key: "color", value: "red" }
        );
        const each = getEach(kv, "key");
        expect(each).toEqual(["foo","bar","baz","color"]);
    });

    it("keying on a property which is only represented in some of the items", () => {
        const kv = tuple(
            { key: "foo", value: 1, name: "foo" },
            { key: "bar", value: "hi" },
            { key: "baz", value: 2, name: "baz" },
            { key: "color", value: "red" }
        );
        const each = getEach(kv, "name");
        expect(each).toEqual(["foo","baz"]);

        type cases = [
            Expect<Test<typeof each, "equals", ["foo", undefined, "baz", undefined]>>
        ];
    });

})
