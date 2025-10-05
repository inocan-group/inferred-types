import { describe, expect, it } from "vitest";
import type {
    Expect,
    HasSameValues,
    Left,
    LeftRight,
    Right,
    Test,
    UniqueKeys,
    UniqueKeysUnion
} from "inferred-types/types";

import { uniqueKeys } from "inferred-types/runtime";

describe("UniqueKeys<L,R>", () => {

    it("happy path for UniqueKeysUnion<L,R>", () => {
        type Obj = UniqueKeysUnion<{ foo: 1; bar: 2 }, { bar: 5; baz: 42 }>;
        type LeftEmpty = UniqueKeysUnion<{}, { bar: 5; baz: 42 }>;
        type RightEmpty = UniqueKeysUnion<{ bar: 5; baz: 42 }, NonNullable<unknown>>;
        type Tup = UniqueKeysUnion<[1, 2, 3], [3, 4, 5, 6]>;

        type cases = [
            Expect<Test<Obj, "equals", LeftRight<"foo", "baz">>>,
            Expect<Test<LeftEmpty, "equals", LeftRight<never, "bar" | "baz">>>,
            Expect<Test<RightEmpty, "equals", LeftRight<"bar" | "baz", never>>>,
            Expect<Test<Tup, "equals", LeftRight<never, "3">>>,
        ];
    });

    it("happy path for UniqueKey<L,R>", () => {
        type Obj = UniqueKeys<{ foo: 1; bar: 2 }, { bar: 5; baz: 42 }>;
        type LeftEmpty = UniqueKeys<{}, { bar: 5; baz: 42 }>; // order not assured
        type RightEmpty = UniqueKeys<{ bar: 5; baz: 42 }, NonNullable<unknown>>;
        type Tup = UniqueKeys<[1, 2, 3], [3, 4, 5, 6]>;

        type cases = [
            Expect<Test<Obj, "equals", LeftRight<["foo"], ["baz"]>>>,

            Expect<Test<Left<LeftEmpty>, "equals", []>>,
            Expect<HasSameValues<Right<LeftEmpty>, ["bar", "baz"]>>,

            Expect<Test<Right<RightEmpty>, "equals", []>>,
            Expect<HasSameValues<Left<RightEmpty>, ["bar", "baz"]>>,

            Expect<Test<Tup, "equals", LeftRight<[], [3]>>>,
        ];
    });

});

describe("uniqueKeys(left, right)", () => {

    it("object", () => {
        const obj = uniqueKeys(
            { foo: 1, bar: 2 },
            { bar: 5, baz: 42 }
        );
        expect(obj).toEqual(["LeftRight", ["foo"], ["baz"]]);
    });

});

