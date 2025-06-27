import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { KeyOf, PublicKeyOf, Test } from "inferred-types/types";

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
