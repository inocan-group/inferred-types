

import { shape } from "inferred-types/runtime"
import type { Expect, FromDefineObject, FromDefn, Test } from "inferred-types/types";

import { describe, it } from "vitest";

describe("FromDefineObject<T>", () => {

    type XX = FromDefn<{
        foo: "string",
        bar: "number",
        baz: "{{string}}foo"
    }>

    it("using SimpleTokens", () => {
        type Foo = FromDefineObject<{ foo: "number" }>;
        type OptFoo = FromDefineObject<{ foo: "number | undefined" }>;
        type MaybeFoo = FromDefineObject<{ foo?: "number" }>;

        type cases = [
            Expect<Test<Foo, "equals", { foo: number }>>,
            Expect<Test<OptFoo, "equals", { foo: number | undefined }>>,
            Expect<Test<MaybeFoo, "equals", { foo?: number | undefined }>>,
        ];

    });
})

describe("FromDefn<T>", () => {

    it("using SimpleTokens for definition", () => {
        type Num = FromDefn<"number">;
        type Union = FromDefn<"number(4,5,6)">;

        type cases = [
            Expect<Test<Num, "equals", number>>,
            Expect<Test<Union, "equals", 4 | 5 | 6>>,
        ];

    });

});
