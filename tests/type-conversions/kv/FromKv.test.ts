import { Expect, FromKv, Test, EmptyObject } from "inferred-types/types";
import { describe, it } from "vitest";


describe("FromKv<T>", () => {
    it("happy path", () => {
        type Foobar = FromKv<[
            { key: "foo", value: 1 },
            { key: "bar", value: "hi" }
        ]>
        type Empty = FromKv<[]>;

        type cases = [
            Expect<Test<Foobar, "equals",  { foo: 1; bar: "hi" }>>,
            Expect<Test<
                Empty,
                "equals",
                EmptyObject
            >>
        ];
    });

    it("with optional props", () => {
        type FooBar = FromKv<[
            { key: "foo", value: 1, required: false },
            { key: "bar", value: 2 },
            { key: "baz", value: "baz" }
        ]>;
        type FooBar2 = FromKv<[
            { key: "foo", value: 1, required: false },
            { key: "bar", value: 2, required: true },
            { key: "baz", value: "baz", required: true }
        ]>;

        type MoreComplex = FromKv<[
            { key: "foo", value: 1, required: false },
            { key: "bar", value: 2 },
            { key: "baz", value: "baz", required: false },
            { key: "bax", value: string | number }
        ]>;

        type cases = [
            Expect<Test<FooBar, "equals", { foo?: 1, bar: 2,  baz: "baz" }>>,
            Expect<Test<FooBar, "equals", { foo?: 1, bar: 2,  baz: "baz" }>>,
            Expect<Test<
                MoreComplex, "equals",
                { foo?: 1, bar: 2, baz?: "baz",  bax: string | number }
            >>,
        ];
    });
});
