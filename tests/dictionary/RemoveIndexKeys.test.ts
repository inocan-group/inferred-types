
import { RemoveIndexKeys } from "inferred-types";
import {  Expect,  Narrowable, Test } from "inferred-types/types";
import { describe, it } from "vitest";



describe("RemoveIndexKeys<T>", () => {

    it("wide indexes", () => {
        type Literal = RemoveIndexKeys<{ foo: 1; bar: 2 }>;
        type LiteralWithAnyIdx = RemoveIndexKeys<{ foo: 1; bar: 2;[key: string]: any }>;
        type LiteralWithUnknownIdx = RemoveIndexKeys<{ foo: 1; bar: 2;[key: string]: unknown }>;
        type LiteralWithStringIdx = RemoveIndexKeys<{ foo: "bar";[key: string]: string }>;
        type LiteralWithNarrowableIdx = RemoveIndexKeys<{ foo: "bar";[key: string]: Narrowable }>;

        type cases = [
            Expect<Test<Literal, "equals",  { foo: 1; bar: 2 }>>,
            Expect<Test<LiteralWithAnyIdx, "equals",  { foo: 1; bar: 2 }>>,
            Expect<Test<LiteralWithUnknownIdx, "equals",  { foo: 1; bar: 2 }>>,
            Expect<Test<LiteralWithStringIdx, "equals",  { foo: "bar" }>>,
            Expect<Test<LiteralWithNarrowableIdx, "equals",  { foo: "bar" }>>,

        ];
    });


    it.skip("literal indexes", () => {
        type T1 = RemoveIndexKeys<{ foo: 1; bar: 2; [key: `_${string}`]: number}>;

        type cases = [
            // Expect<Equals<T1, { foo: 1; bar: 2 }>>
        ];
    });


});

