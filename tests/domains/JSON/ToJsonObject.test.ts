import { Equal, Expect } from "@type-challenges/utils";
import { EmptyObject } from "inferred-types/types";
import { ToJsonObject } from "inferred-types/types";
import { describe, it } from "vitest";

describe("ToJsonObject<T>", () => {

    it("object with numeric values", () => {
        type FooBar = ToJsonObject<{ foo: 1; bar: 2 }>;

        type cases = [
            Expect<Equal<FooBar, `{ "foo": 1, "bar": 2 }`>>
        ];
    });

    it("object with string values", () => {
        type FooBar = ToJsonObject<{ foo: "1"; bar: "2" }>;

        type cases = [
            Expect<Equal<FooBar, `{ "foo": "1", "bar": "2" }`>>
        ];
    });

    it("object with mixed scalar", () => {
        type FooBar = ToJsonObject<{ foo: undefined; bar: false; baz: null }>;

        type cases = [
            Expect<Equal<FooBar, `{ "foo": undefined, "bar": false, "baz": null }`>>
        ];
    });

    it("object with nested object property", () => {
        type FooBar = ToJsonObject<{ foo: { bar: 1, baz: 2 }, bax: 1 }>;

        type cases = [
            Expect<Equal<FooBar, `{ "foo": { "bar": 1, "baz": 2 }, "bax": 1 }`>>
        ];
    });

    it("object with an array property", () => {
        type FooBar = ToJsonObject<{ foo: [1, 2], bar: ["hey", "ho"] }>;

        type cases = [
            Expect<Equal<FooBar, `{ "foo": [ 1, 2 ], "bar": [ "hey", "ho" ] }`>>
        ];
    });

    it("an empty object", () => {
        type FooBar = ToJsonObject<EmptyObject>;

        type cases = [
            Expect<Equal<FooBar, `{  }`>>
        ];
    });


});


