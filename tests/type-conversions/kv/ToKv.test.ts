import { Equal, Expect } from "@type-challenges/utils";
import {  ToKv } from "inferred-types/types";
import { describe, it } from "vitest";


describe("ToKv<T>", () => {

    it("happy path", () => {
        type Foobar = ToKv<{ foo: 1; bar: "hi" }>;
        type FoobarNoSort = ToKv<{ foo: 1; bar: "hi" }, false>;
        type Manual = ToKv<{ foo: 1; bar: "hi" }, ["bar", "foo"]>;


        // @ts-ignore
        type cases = [
            Expect<Equal<Foobar, [
                { key: "foo"; value: 1 },
                { key: "bar"; value: "hi" }
            ]>>,
            Expect<Equal<FoobarNoSort, (
                { key: "foo"; value: 1 } |
                { key: "bar"; value: "hi" }
            )[]>>,
            Expect<Equal<Manual, [
                { key: "bar"; value: "hi" },
                { key: "foo"; value: 1 },
            ]>>,

        ];
    });

});
