import { Equal, Expect } from "@type-challenges/utils";
import { EmptyObject, Test } from "inferred-types/types";
import { ObjectToString } from "inferred-types/types";
import { describe, it } from "vitest";

describe("ToJsonObject<T>", () => {

    it("object with numeric values", () => {
        type FooBar = ObjectToString<{ foo: 1; bar: 2 }>;

        type cases = [
            Expect<Test<
                FooBar, "equals",
                `{ "foo": 1, "bar": 2 }`
            >>
        ];
    });

    it("object with string values", () => {
        type FooBar = ObjectToString<{ foo: "1"; bar: "2" }>;

        type cases = [
            Expect<Test<
                FooBar, "equals",
                `{ "foo": "1", "bar": "2" }`
            >>
        ];
    });

    it("object with mixed scalar", () => {
        type FooBar = ObjectToString<{ foo: undefined; bar: false; baz: null }>;

        type cases = [
            Expect<Test<FooBar, `{ "foo": undefined, "bar": false, "equals",  "baz": null }`>>
        ];
    });

    it("object with nested object property", () => {
        type FooBar = ObjectToString<{ foo: { bar: 1, baz: 2 }, bax: 1 }>;

        type cases = [
            Expect<Test<
                FooBar, "equals",
                `{ "foo": { "bar": 1, "baz": 2 }, "bax": 1 }`
            >>
        ];
    });

    it("object with an array property", () => {
        type FooBar = ObjectToString<{ foo: [1, 2], bar: ["hey", "ho"] }>;

        type cases = [
            Expect<Test<FooBar, "equals",
                `{ "foo": [ 1, 2 ], "bar": [ "hey", "ho" ] }`
            >>
        ];
    });

    it("an empty object", () => {
        type FooBar = ObjectToString<EmptyObject>;

        type cases = [
            Expect<Test<FooBar, "equals", `{  }`>>
        ];
    });


});


