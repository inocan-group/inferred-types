import { Equal, Expect } from "@type-challenges/utils";
import {  FromKv } from "inferred-types/types";
import { EmptyObject } from "transpiled/types";
import { describe, it } from "vitest";



describe("FromKv<T>", () => {
    it("happy path", () => {
        type Foobar = FromKv<[
            { key: "foo", value: 1 },
            { key: "bar", value: "hi" }
        ]>
        type Empty = FromKv<[]>;


        // @ts-ignore
        type cases = [
            Expect<Test<Foobar, "equals",  { foo: 1; bar: "hi" }>>,
            Expect<Equal<
                Empty,
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
            Expect<Test<FooBar, { foo?: 1, bar: 2, "equals",  baz: "baz" }>>,
            Expect<Test<FooBar, { foo?: 1, bar: 2, "equals",  baz: "baz" }>>,
            Expect<Test<MoreComplex, { foo?: 1, bar: 2, baz?: "baz", "equals",  bax: string | number }>>,
        ];
    });
});
