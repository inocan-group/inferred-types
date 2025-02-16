
import { Equal, Expect } from "@type-challenges/utils";
import { Narrowable, RemoveIndex } from "inferred-types/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("RemoveIndex<T>", () => {

    it("happy path", () => {
        type Literal = RemoveIndex<{ foo: 1; bar: 2 }>;
        type LiteralWithAnyIdx = RemoveIndex<{ foo: 1; bar: 2;[key: string]: any }>;
        type LiteralWithUnknownIdx = RemoveIndex<{ foo: 1; bar: 2;[key: string]: unknown }>;
        type LiteralWithStringIdx = RemoveIndex<{ foo: "bar";[key: string]: string }>;
        type LiteralWithNarrowableIdx = RemoveIndex<{ foo: "bar";[key: string]: Narrowable }>;

        type cases = [
            Expect<Equal<Literal, { foo: 1; bar: 2 }>>,
            Expect<Equal<LiteralWithAnyIdx, { foo: 1; bar: 2 }>>,
            Expect<Equal<LiteralWithUnknownIdx, { foo: 1; bar: 2 }>>,
            Expect<Equal<LiteralWithStringIdx, { foo: "bar" }>>,
            Expect<Equal<LiteralWithNarrowableIdx, { foo: "bar" }>>,

        ];
        const cases: cases = [true, true, true, true, true,];
    });

});
