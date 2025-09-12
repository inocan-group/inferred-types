import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import type { Dictionary, KeyOf, ObjectKey, PublicKeyOf, Test } from "inferred-types/types";

import { keysOf } from "inferred-types/runtime";

describe("KeyOf<T> and PublicKeyOf<T>", () => {

    it("Happy Path", () => {
        type FooBarBaz = { _kind: "foo-bar-baz", foo: number; bar: string; baz: boolean };

        type KObj = KeyOf<FooBarBaz>;
        type KPubObj = PublicKeyOf<FooBarBaz>;

        type cases = [
            Expect<Test<KObj, "equals",  "_kind" | "foo" | "bar" | "baz">>,
            Expect<Test<KPubObj, "equals",  "foo" | "bar" | "baz">>,
        ];

    });

});

describe("keysOf(obj)", () => {

    it("happy path", () => {
        const t1 = keysOf({foo: 1, bar: 2});

        expect(t1).toEqual(["foo","bar"]);

        type cases = [
            Expect<Test<typeof t1, "equals", ["foo","bar"]>>
        ];
    });

    it("empty object", () => {
        const t1 = keysOf({});

        expect(t1).toEqual([]);

        type cases = [
            Expect<Test<typeof t1, "equals", []>>
        ];
    });

    it("deeply nested", () => {
        const t1 = keysOf({foo: { bar: { baz: 1 } } });

        expect(t1).toEqual(["foo"]);

        type cases = [
            Expect<Test<typeof t1, "equals", ["foo"]>>
        ];
    });

    it("wide object", () => {
        const t1 = keysOf({foo: 1, bar: 2} as Dictionary);

        expect(t1).toEqual(["foo","bar"]);

        type cases = [
            Expect<Test<typeof t1, "equals", ObjectKey[]>>
        ];
    });

})
