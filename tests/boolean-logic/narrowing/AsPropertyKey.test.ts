import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { AsPropertyKey } from "inferred-types/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("AsPropertyKey<T,[C]>", () => {

    it("without container", () => {
        type Foo = AsPropertyKey<"foo">;
        type One = AsPropertyKey<1>;
        type Err = AsPropertyKey<true>;
        type cases = [
            Expect<Equal<Foo, "foo">>,
            Expect<Equal<One, 1>>,
            Expect<Equal<Err, never>>
        ];
        const cases: cases = [
            true, true,
            true
        ];
    });


});
