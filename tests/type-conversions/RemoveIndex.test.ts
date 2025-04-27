
import { Equal, Expect } from "@type-challenges/utils";
import { Narrowable, RemoveIndex } from "inferred-types/types";
import { describe, it } from "vitest";



describe("RemoveIndex<T>", () => {

    it("happy path", () => {
        type Literal = RemoveIndex<{ foo: 1; bar: 2 }>;
        type LiteralWithAnyIdx = RemoveIndex<{ foo: 1; bar: 2;[key: string]: any }>;
        type LiteralWithUnknownIdx = RemoveIndex<{ foo: 1; bar: 2;[key: string]: unknown }>;
        type LiteralWithStringIdx = RemoveIndex<{ foo: "bar";[key: string]: string }>;
        type LiteralWithNarrowableIdx = RemoveIndex<{ foo: "bar";[key: string]: Narrowable }>;

        type cases = [
            Expect<Test<Literal, "equals",  { foo: 1; bar: 2 }>>,
            Expect<Test<LiteralWithAnyIdx, "equals",  { foo: 1; bar: 2 }>>,
            Expect<Test<LiteralWithUnknownIdx, "equals",  { foo: 1; bar: 2 }>>,
            Expect<Test<LiteralWithStringIdx, "equals",  { foo: "bar" }>>,
            Expect<Test<LiteralWithNarrowableIdx, "equals",  { foo: "bar" }>>,

        ];
        const cases: cases = [true, true, true, true, true,];
    });

});
