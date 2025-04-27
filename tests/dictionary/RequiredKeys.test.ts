import { describe, it, expect } from "vitest";
import type {
    Test,
    Expect,
    RequiredKeys,
    First,
    Narrowable,
    RequiredKeysTuple,
} from "inferred-types/types";

type TestObj = { title: string; value: number; color?: string };

describe("RequiredKeys<T, V>", () => {
    it("basic usage without filtering on value", () => {
        type T = RequiredKeys<TestObj>;

        type cases = [
            Expect<Test<
                T,
                "equals",
                "title" | "value"
            >>
        ];


    });

    it("basic usage with a value filter", () => {
        type T1 = RequiredKeys<TestObj, string>;
        type T2 = RequiredKeys<TestObj, number>;

        type cases = [
            Expect<Test<T1, "equals", "title">>,
            Expect<Test<T2, "equals", "value">>
        ];
    });

    it("typed explicitly", () => {
        type O = {
            id: number;
            name: string;
            title: string;
            cost?: number;
            color?: string;
        };

        const genericArr: O[] = [
            { id: 1, name: "foo", title: "one", cost: 15 },
            { id: 2, name: "bar", title: "one" },
            { id: 3, name: "baz", title: "two", cost: 45, color: "green" },
        ];
        const fn = <T extends Record<string, Narrowable>, A extends readonly T[]>(arr: A): A => arr;

        const _v = fn(genericArr);
        type V = typeof _v;
        type T1 = RequiredKeys<First<V>>;
        type T2 = RequiredKeys<First<V>, string>;

        type cases = [
            Expect<Test<T1, "equals",  "id" | "name" | "title">>, //
            Expect<Test<T2, "equals",  "name" | "title">>
        ];
        const cases: cases = [true, true];
    });
});

describe("RequiredKeysTuple<T, V>", () => {
    it("basic usage without filtering on value", () => {
        type T = RequiredKeysTuple<TestObj>;

        type cases = [ //
            Expect<Test<T, "equals", ["title",  "value"]>>
        ];

    });


    it("typed explicitly", () => {
        type O = {
            id: number;
            name: string;
            title: string;
            cost?: number;
            color?: string;
        };

        const genericArr: O[] = [
            { id: 1, name: "foo", title: "one", cost: 15 },
            { id: 2, name: "bar", title: "one" },
            { id: 3, name: "baz", title: "two", cost: 45, color: "green" },
        ];
        const fn = <T extends Record<string, Narrowable>, A extends readonly T[]>(arr: A): A => arr;

        const _v = fn(genericArr);
        type V = typeof _v;
        type T1 = RequiredKeysTuple<First<V>>;

        type cases = [
            Expect<Test<T1, "hasSameKeys", ["id", "name", "title"]>>, //
        ];
    });
});
