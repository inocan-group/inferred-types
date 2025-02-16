import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { IsUnionArray } from "inferred-types/types"

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("IsUnionArray<T>", () => {

    it("happy path", () => {
        type T1 = IsUnionArray<(1 | 2 | 3)[]>;

        type F1 = IsUnionArray<[1, 2, 3]>;
        type F2 = IsUnionArray<string[]>;

        // @ts-ignore
        type cases = [
            Expect<Equal<T1, true>>,
            Expect<Equal<F1, false>>,
            Expect<Equal<F2, false>>,
        ];
    });

});
