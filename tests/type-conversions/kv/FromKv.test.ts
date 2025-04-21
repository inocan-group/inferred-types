import { Equal, Expect } from "@type-challenges/utils";
import { ExplicitlyEmptyObject, FromKv } from "inferred-types/types";
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
            Expect<Equal<Foobar, { foo: 1; bar: "hi" }>>,
            Expect<Equal<
                Empty,
                ExplicitlyEmptyObject
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
            Expect<Equal<FooBar, { foo?: 1, bar: 2, baz: "baz" }>>,
            Expect<Equal<FooBar, { foo?: 1, bar: 2, baz: "baz" }>>,
            Expect<Equal<MoreComplex, { foo?: 1, bar: 2, baz?: "baz", bax: string | number }>>,
        ];
    });


});
