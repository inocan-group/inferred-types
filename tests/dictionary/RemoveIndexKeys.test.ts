
import { RemoveIndexKeys } from "inferred-types";
import {  Expect,  Narrowable, Test } from "inferred-types/types";
import { describe, it } from "vitest";



describe("RemoveIndexKeys<T>", () => {

    it("wide string indexes", () => {
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

    it("wide numeric indexes", () => {
        type Literal = RemoveIndexKeys<{ foo: 1; bar: 2 }>;
        type LiteralWithAnyIdx = RemoveIndexKeys<{ foo: 1; bar: 2;[key: number]: any }>;
        type LiteralWithUnknownIdx = RemoveIndexKeys<{ foo: 1; bar: 2;[key: number]: unknown }>;
        type LiteralWithStringIdx = RemoveIndexKeys<{ foo: "bar";[key: number]: string }>;
        type LiteralWithNarrowableIdx = RemoveIndexKeys<{ foo: "bar";[key: number]: Narrowable }>;

        type cases = [
            Expect<Test<Literal, "equals",  { foo: 1; bar: 2 }>>,
            Expect<Test<LiteralWithAnyIdx, "equals",  { foo: 1; bar: 2 }>>,
            Expect<Test<LiteralWithUnknownIdx, "equals",  { foo: 1; bar: 2 }>>,
            Expect<Test<LiteralWithStringIdx, "equals",  { foo: "bar" }>>,
            Expect<Test<LiteralWithNarrowableIdx, "equals",  { foo: "bar" }>>,

        ];
    });

    it("wide symbol indexes", () => {
        type Literal = RemoveIndexKeys<{ foo: 1; bar: 2 }>;
        type LiteralWithAnyIdx = RemoveIndexKeys<{ foo: 1; bar: 2;[key: symbol]: any }>;
        type LiteralWithUnknownIdx = RemoveIndexKeys<{ foo: 1; bar: 2;[key: symbol]: unknown }>;
        type LiteralWithStringIdx = RemoveIndexKeys<{ foo: "bar";[key: symbol]: string }>;
        type LiteralWithNarrowableIdx = RemoveIndexKeys<{ foo: "bar";[key: symbol]: Narrowable }>;

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

