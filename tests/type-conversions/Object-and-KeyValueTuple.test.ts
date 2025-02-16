import { Equal, Expect } from "@type-challenges/utils";
import { FromKeyValueTuple } from "inferred-types/types";
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

});
