import { Equal, Expect } from "@type-challenges/utils";
import { FromKeyValueTuple, MakeKeysOptional } from "inferred-types/types";
import { EmptyObject, ToKeyValueTuple } from "inferred-types/types";
import { describe, it } from "vitest";


describe("ToKeyValueTuple<TObj>", () => {

    it("basics", () => {
        type FooBar = ToKeyValueTuple<{ foo: 1; bar: 2 }>;
        type Empty = ToKeyValueTuple<{}>;

        type cases = [
            Expect<Equal<
                FooBar,
                [
                    { key: "foo", value: 1 },
                    { key: "bar", value: 2 },
                ]
            >>,
            Expect<Equal<
                Empty,
                []
            >>
        ];
    });


});


describe("FromKeyValueTuple<T>", () => {

    it("basics", () => {
        type FooBar = FromKeyValueTuple<[
            { key: "foo", value: 1 },
            { key: "bar", value: 2 },
        ]>;
        type Empty = FromKeyValueTuple<[]>;

        type cases = [
            Expect<Equal<
                FooBar,
                { foo: 1; bar: 2 }
            >>,
            Expect<Equal<
                Empty,
                EmptyObject
            >>
        ]
    });

    it("with optional props", () => {
        type FooBar = FromKeyValueTuple<[
            { key: "foo", value: 1, required: false },
            { key: "bar", value: 2 },
            { key: "baz", value: "baz"}
        ]>;
        type FooBar2 = FromKeyValueTuple<[
            { key: "foo", value: 1, required: false },
            { key: "bar", value: 2, required: true },
            { key: "baz", value: "baz", required: true }
        ]>;

        type MoreComplex = FromKeyValueTuple<[
            { key: "foo", value: 1, required: false },
            { key: "bar", value: 2 },
            { key: "baz", value: "baz", required: false },
            { key: "bax", value: string | number}
        ]>;

        type cases = [
            Expect<Equal<FooBar, { foo?: 1, bar: 2, baz: "baz"}>>,
            Expect<Equal<FooBar, { foo?: 1, bar: 2, baz: "baz"}>>,
            Expect<Equal<MoreComplex, { foo?: 1, bar: 2, baz?: "baz", bax: string | number}>>,
        ];
    });


});
