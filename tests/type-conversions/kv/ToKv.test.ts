import { Equal, Expect } from "@type-challenges/utils";
import { ToKv } from "inferred-types/types";

import { describe, it } from "vitest";


describe("ToKv<T>", () => {

    it("happy path", () => {
        type Foobar = ToKv<{ foo: 1; bar: "hi" }>;

        type cases = [
            Expect<Equal<Foobar, [
                { key: "foo"; value: 1 },
                { key: "bar"; value: "hi" }
            ]>>
        ];
    });

    it("with optional parameter", () => {
        type Foobar = ToKv<{ foo?: 1; bar: "hi" }>;

        type cases = [
            Expect<Equal<Foobar, [
                { key: "foo"; value: 1 | undefined; required: false },
                { key: "bar"; value: "hi" }
            ]>>
        ];
    });

});
