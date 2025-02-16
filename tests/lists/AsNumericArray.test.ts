import { Equal, Expect } from "@type-challenges/utils";
import { AsNumericArray } from "inferred-types/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("AsNumericArray<T>", () => {

    it("happy path", () => {
        type NoChange = AsNumericArray<[1, 2, 3]>;
        type Mixed = AsNumericArray<[1, 2, `3`]>;
        type StrLit = AsNumericArray<[`1`, `2`, `3`]>;

        type IgnoreInvalid = AsNumericArray<[1, 2, null, false, 3]>;

        // @ts-ignore
        type cases = [
            Expect<Equal<NoChange, [1, 2, 3]>>,
            Expect<Equal<Mixed, [1, 2, 3]>>,
            Expect<Equal<StrLit, [1, 2, 3]>>,

            Expect<Equal<IgnoreInvalid, [1, 2, 3]>>
        ];
    });

});
