import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { IntersectingKeys } from "inferred-types/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("IntersectingKeys<L,R>", () => {

    it("happy path (with objects)", () => {
        type Bar = IntersectingKeys<{ foo: 1; bar: 2 }, { bar: 2; baz: 3 }>;
        type None = IntersectingKeys<{ foo: 1; bar: 2 }, { baz: 2; bax: 3 }>;

        type cases = [
            Expect<Equal<Bar, ["bar"]>>,
            Expect<Equal<None, []>>,
        ];
        const cases: cases = [true, true];
    });

});
