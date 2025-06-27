import { describe, expect, it } from "vitest";
import { getEach, tuple } from "inferred-types/runtime";
import type { Expect, GetEach, Test } from "inferred-types/types";

describe("GetEach<T,P>", () => {

    it("happy path", () => {
        type List = readonly [
            { id: 1; value: "foo" },
            { id: 2; value: "bar"; cost: 5 },
            { id: 3; value: "baz"; cost: 15 }
        ];

        type ID = GetEach<List, "id">;
        type Value = GetEach<List, "value">;
        type Cost = GetEach<List, "cost">;

        type cases = [
            Expect<Test<ID, "equals", readonly [1, 2, 3]>>,
            Expect<Test<Value, "equals", readonly ["foo", "bar", "baz"]>>,
            Expect<Test<Cost, "equals", readonly [5, 15]>>
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
            Expect<Test<Fav, "equals",  readonly ["blue", "green"]>>,
            Expect<Test<FavNotRO, "equals",  ["blue", "green"]>>,
            Expect<Test<Owns, "equals",  readonly ["grey"]>>,
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
            Expect<Test<Incomplete, "equals",  ["fuchsia"]>>,
            Expect<Test<Empty, "equals",  []>>,
        ];
        const cases: cases = [true, true, true];
    });

    it("into a readonly array structure", () => {
        type List = readonly [
            { id: 1; colors: ["blue", "green", "red"] },
            { id: 1; colors: ["purple", "lime", "orange", "fuchsia"] }
        ];

        type First = GetEach<List, "colors.0">;
        type Incomplete = GetEach<List, "colors.3">;
        type Empty = GetEach<List, "colors.5">;

        type cases = [
            Expect<Test<First,  "equals", readonly ["blue", "purple"]>>,
            Expect<Test<Incomplete, "equals",  readonly ["fuchsia"]>>,
            Expect<Test<Empty, "equals",  readonly []>>,
        ];
        const cases: cases = [true, true, true];
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

        type Fav = GetEach<List, "color.favorite">;
        type Owns = GetEach<List, "color.owns">;

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
            Expect<Test<typeof each, "equals", ["foo", "baz"]>>
        ];
    });


})
