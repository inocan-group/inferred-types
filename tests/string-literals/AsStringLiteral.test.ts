import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { AsStringLiteral } from "inferred-types/types"
import { UsStateAbbrev } from "inferred-types/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("StringLiteral<T>", () => {

    it("happy path", () => {
        type X = AsStringLiteral<"there I was {{string}}, waiting for {{ number }} knobs from {{ UsState }}">;

        // @ts-ignore
        type cases = [
            Expect<Equal<
                X,
                `there I was ${string}, waiting for ${number} knobs from ${UsStateAbbrev}`
            >>
        ];
    });

});
