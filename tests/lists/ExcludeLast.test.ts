import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { Pop } from "inferred-types/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("ExcludeLast<T>", () => {

    it("happy path", () => {
        type T1 = Pop<[1, 2, 3]>;
        type JustOne = Pop<[1]>;
        type None = Pop<[]>;

        type cases = [
            Expect<Equal<T1, [1, 2]>>,
            Expect<Equal<JustOne, []>>,
            Expect<Equal<None, never>>
        ];
        const cases: cases = [true, true, true];
    });

});
