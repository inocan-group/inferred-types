import { Equal, Expect } from "@type-challenges/utils";
import { Last } from "inferred-types/types";
import { describe, it } from "vitest";


// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("Last<T>", () => {
    it("happy path", () => {
        type Three = Last<[1, 2, 3]>;
        type Empty = Last<[]>;

        type cases = [
            Expect<Equal<Three, 3>>,
            Expect<Equal<Empty, never>>,
        ];
        const cases: cases = [true, true];
    });
});
